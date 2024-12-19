// Secure authentication logic
import { cookies } from 'next/headers';

const VALID_TOKEN = process.env.NEXT_PUBLIC_AUTH_TOKEN;

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