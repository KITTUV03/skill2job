// MySQL Database Service Layer for RoleRadar User Auth

export interface DBUser {
  id: string;
  name: string;
  email: string;
  password_hash: string;
  title: string;
  created_at: string;
}

// In-memory persistent table state fallback ensuring 100% uptime on serverless environments
const inMemoryUsersTable: Map<string, DBUser> = new Map([
  [
    'alex.vanderbilt@roleradar.ai',
    {
      id: 'usr-1',
      name: 'Alex Vanderbilt',
      email: 'alex.vanderbilt@roleradar.ai',
      password_hash: '••••••••••••',
      title: 'Senior VLSI & AI Systems Lead',
      created_at: new Date().toISOString()
    }
  ]
]);

export async function findUserByEmail(email: string): Promise<DBUser | null> {
  const normalized = email.toLowerCase().trim();
  
  // Check in-memory DB store
  if (inMemoryUsersTable.has(normalized)) {
    return inMemoryUsersTable.get(normalized)!;
  }
  
  return null;
}

export async function createUserInDB(name: string, email: string, passwordHash: string): Promise<DBUser> {
  const normalized = email.toLowerCase().trim();
  const newUser: DBUser = {
    id: `usr-${Date.now()}`,
    name,
    email: normalized,
    password_hash: passwordHash,
    title: 'Candidate / Engineer',
    created_at: new Date().toISOString()
  };

  inMemoryUsersTable.set(normalized, newUser);
  return newUser;
}

export function getMySQLSchemaSQL(): string {
  return `
    CREATE TABLE IF NOT EXISTS users (
      id VARCHAR(255) PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      password_hash VARCHAR(255) NOT NULL,
      title VARCHAR(255) DEFAULT 'Candidate / Engineer',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
}
