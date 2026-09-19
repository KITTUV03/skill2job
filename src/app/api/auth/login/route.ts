import { NextRequest, NextResponse } from 'next/server';
import { findUserByEmail, verifyPassword, generateSessionToken, createUserInDB, hashPassword } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: 'Email and Password are required.' },
        { status: 400 }
      );
    }

    const trimmedEmail = email.toLowerCase().trim();
    let user = await findUserByEmail(trimmedEmail);

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'No account found with this email. Please register first.' },
        { status: 401 }
      );
    }

    const isMatch = await verifyPassword(password, user.password_hash);
    if (!isMatch) {
      return NextResponse.json(
        { success: false, error: 'Invalid password. Please check your credentials.' },
        { status: 401 }
      );
    }

    const token = await generateSessionToken({
      id: user.id,
      email: user.email,
      name: user.name
    });

    const response = NextResponse.json({
      success: true,
      token,
      message: 'Authenticated successfully.',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        title: user.title,
        avatar: user.avatar,
        createdAt: user.created_at
      }
    });

    // Set secure session cookie
    response.cookies.set({
      name: 'roleradar_session',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 30 // 30 days
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Authentication server error.' },
      { status: 500 }
    );
  }
}
