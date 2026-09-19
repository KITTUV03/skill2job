import { NextRequest, NextResponse } from 'next/server';
import { verifySessionToken, findUserByEmail } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const cookieToken = request.cookies.get('roleradar_session')?.value;
    const authHeader = request.headers.get('Authorization');
    const headerToken = authHeader?.startsWith('Bearer ') ? authHeader.substring(7) : null;
    const token = cookieToken || headerToken;

    if (!token) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    const payload = await verifySessionToken(token);
    if (!payload) {
      return NextResponse.json({ authenticated: false, error: 'Invalid or expired session' }, { status: 401 });
    }

    const user = await findUserByEmail(payload.email);
    if (!user) {
      return NextResponse.json({
        authenticated: true,
        user: {
          id: payload.id,
          name: payload.name,
          email: payload.email,
          title: 'Candidate / Engineer',
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(payload.name)}`
        }
      });
    }

    return NextResponse.json({
      authenticated: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        title: user.title,
        avatar: user.avatar,
        createdAt: user.created_at
      }
    });
  } catch (error) {
    return NextResponse.json({ authenticated: false, error: 'Session verification failed' }, { status: 500 });
  }
}
