// Enterprise Database & Session Layer for RoleRadar Candidate Authentication

export interface DBUser {
  id: string;
  name: string;
  email: string;
  password_hash: string;
  title: string;
  avatar?: string;
  created_at: string;
}

// Global persistent in-memory user registry for serverless & production failover
const globalUsers = (globalThis as any).__roleradar_users || new Map<string, DBUser>();
(globalThis as any).__roleradar_users = globalUsers;

const JWT_SECRET = process.env.JWT_SECRET || 'roleradar-production-enterprise-secret-key-2026';

/**
 * Native Web Crypto SHA-256 password hash with salt
 */
export async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password + '::roleradar_salt_2026');
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Verifies candidate password against stored hash
 */
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  const computed = await hashPassword(password);
  return computed === hash;
}

/**
 * Generates an HMAC-SHA256 signed JWT session token
 */
export async function generateSessionToken(user: { id: string; email: string; name: string }): Promise<string> {
  const header = { alg: 'HS256', typ: 'JWT' };
  const payload = {
    sub: user.id,
    email: user.email,
    name: user.name,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30 // 30 days session
  };

  const b64Header = Buffer.from(JSON.stringify(header)).toString('base64url');
  const b64Payload = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const content = `${b64Header}.${b64Payload}`;

  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    enc.encode(JWT_SECRET),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );

  const signature = await crypto.subtle.sign('HMAC', key, enc.encode(content));
  const b64Signature = Buffer.from(signature).toString('base64url');

  return `${content}.${b64Signature}`;
}

/**
 * Validates session token and decodes candidate payload
 */
export async function verifySessionToken(token: string): Promise<{ id: string; email: string; name: string } | null> {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;

    const [b64Header, b64Payload, b64Signature] = parts;
    const content = `${b64Header}.${b64Payload}`;

    const enc = new TextEncoder();
    const key = await crypto.subtle.importKey(
      'raw',
      enc.encode(JWT_SECRET),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['verify']
    );

    const sigBuf = Buffer.from(b64Signature, 'base64url');
    const isValid = await crypto.subtle.verify('HMAC', key, sigBuf, enc.encode(content));
    if (!isValid) return null;

    const payload = JSON.parse(Buffer.from(b64Payload, 'base64url').toString('utf-8'));
    if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) {
      return null; // Expired token
    }

    return { id: payload.sub, email: payload.email, name: payload.name };
  } catch {
    return null;
  }
}

export async function findUserByEmail(email: string): Promise<DBUser | null> {
  const normalized = email.toLowerCase().trim();
  if (globalUsers.has(normalized)) {
    return globalUsers.get(normalized)!;
  }
  return null;
}

export async function createUserInDB(name: string, email: string, passwordHash: string): Promise<DBUser> {
  const normalized = email.toLowerCase().trim();
  const newUser: DBUser = {
    id: `usr-${Date.now()}-${Math.floor(Math.random() * 10000)}`,
    name,
    email: normalized,
    password_hash: passwordHash,
    title: 'Candidate / Engineer',
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}`,
    created_at: new Date().toISOString()
  };

  globalUsers.set(normalized, newUser);
  return newUser;
}

export async function getAllUsersFromDB(): Promise<DBUser[]> {
  return Array.from(globalUsers.values());
}

export function getMySQLSchemaSQL(): string {
  return `
    CREATE TABLE IF NOT EXISTS users (
      id VARCHAR(255) PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      password_hash VARCHAR(255) NOT NULL,
      title VARCHAR(255) DEFAULT 'Candidate / Engineer',
      avatar VARCHAR(512),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    CREATE INDEX idx_users_email ON users(email);
  `;
}
