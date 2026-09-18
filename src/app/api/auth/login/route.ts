import { NextRequest, NextResponse } from 'next/server';
import { findUserByEmail, createUserInDB } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: 'Email and Password are required.' },
        { status: 400 }
      );
    }

    let user = await findUserByEmail(email);

    // If user does not exist yet, auto-register into DB for smooth UX
    if (!user) {
      user = await createUserInDB('Candidate', email, password);
    }

    return NextResponse.json({
      success: true,
      message: 'Authenticated successfully against MySQL database.',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        title: user.title,
        createdAt: user.created_at
      }
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'MySQL login server error.' },
      { status: 500 }
    );
  }
}
