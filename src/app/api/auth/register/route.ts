import { NextRequest, NextResponse } from 'next/server';
import { findUserByEmail, createUserInDB } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json();

    if (!email || !password || !name) {
      return NextResponse.json(
        { success: false, error: 'Name, Email, and Password are required.' },
        { status: 400 }
      );
    }

    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return NextResponse.json(
        { success: false, error: 'An account with this email already exists in MySQL database.' },
        { status: 409 }
      );
    }

    // Create user in MySQL database table
    const newUser = await createUserInDB(name, email, password);

    return NextResponse.json({
      success: true,
      message: 'User registered successfully in MySQL database.',
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        title: newUser.title,
        createdAt: newUser.created_at
      }
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'MySQL registration server error.' },
      { status: 500 }
    );
  }
}
