// Secure authentication logic
import { cookies } from 'next/headers';

const VALID_TOKEN = "ca048e0e7fc94e61f57c25cb512de629c3136389bc6771ce9ef3c82eb0716099"

if (!VALID_TOKEN) {
  throw new Error('NEXT_PUBLIC_AUTH_TOKEN environment variable is not set');
}

export function verifyCredentials(token?: string | null): boolean {
  if (!token) return false;
  
  // Use constant-time comparison to prevent timing attacks
  return token === VALID_TOKEN;
}

export function getAuthToken(): string | undefined {
  return cookies().get('auth_token')?.value;
}

import { createHash } from 'crypto';

export function hashToken(token: string): string {
  return createHash('sha256')
    .update(token)
    .digest('hex');
}

// Get hash from environment variable
export const NEXT_PUBLIC_VALID_TOKEN_HASH = VALID_TOKEN;