import { NextResponse } from 'next/server';
import { getAllUsersFromDB } from '@/lib/db';

export async function GET() {
  const users = await getAllUsersFromDB();
  const sanitized = users.map(u => ({
    id: u.id,
    name: u.name,
    email: u.email,
    title: u.title,
    avatar: u.avatar,
    authProvider: 'RoleRadar Auth / MySQL DB',
    createdAt: u.created_at,
    status: 'Active'
  }));

  return NextResponse.json({
    success: true,
    total: sanitized.length,
    users: sanitized,
    table: 'users',
    schema: 'CREATE TABLE users (id VARCHAR(255) PRIMARY KEY, name VARCHAR(255), email VARCHAR(255) UNIQUE, password_hash VARCHAR(255), created_at TIMESTAMP);'
  });
}
