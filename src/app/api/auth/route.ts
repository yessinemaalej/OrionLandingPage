import { NextRequest, NextResponse } from 'next/server';
import { createHash } from 'crypto';
import { cookies } from 'next/headers';
import { createSession } from '@/lib/session';
import { NEXT_PUBLIC_VALID_TOKEN_HASH } from '@/lib/auth';
export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json();
    
    // Hash the provided token
    const hashedToken = createHash('sha256')
      .update(token)
      .digest('hex');

    
    // Verify against stored hash
    if (hashedToken !== NEXT_PUBLIC_VALID_TOKEN_HASH) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }

    // Create session token
    const sessionToken = await createSession();

    // Set HTTP-only cookie
    cookies().set('session', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 3600 // 1 hour
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}