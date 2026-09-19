import { NextRequest, NextResponse } from 'next/server';
import { findUserByEmail, createUserInDB, hashPassword, generateSessionToken } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json();

    if (!email || !password || !name) {
      return NextResponse.json(
        { success: false, error: 'Full name, valid email, and password are required.' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { success: false, error: 'Password must be at least 6 characters long.' },
        { status: 400 }
      );
    }

    const trimmedEmail = email.toLowerCase().trim();
    const existingUser = await findUserByEmail(trimmedEmail);
    if (existingUser) {
      return NextResponse.json(
        { success: false, error: 'An account with this email already exists. Please sign in instead.' },
        { status: 409 }
      );
    }

    // Hash candidate password
    const passwordHash = await hashPassword(password);
    const newUser = await createUserInDB(name.trim(), trimmedEmail, passwordHash);

    const token = await generateSessionToken({
      id: newUser.id,
      email: newUser.email,
      name: newUser.name
    });

    const response = NextResponse.json({
      success: true,
      token,
      message: 'Account registered successfully.',
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        title: newUser.title,
        avatar: newUser.avatar,
        createdAt: newUser.created_at
      }
    });

    response.cookies.set({
      name: 'roleradar_session',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 30
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Registration server error.' },
      { status: 500 }
    );
  }
}
