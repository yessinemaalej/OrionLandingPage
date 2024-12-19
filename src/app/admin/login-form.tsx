'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {Button} from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CardContent, CardFooter } from '@/components/ui/card';
import { PROTECTED_ROUTES } from '@/lib/routes';

export function LoginForm() {
  const [token, setToken] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate token against environment variable
    if (token === process.env.NEXT_PUBLIC_AUTH_TOKEN) {
      document.cookie = `auth_token=${token}; path=/; secure; samesite=strict`;
      router.push(`/${PROTECTED_ROUTES.admin}`);
    } else {
      setError('Invalid token');
      setToken('');
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <CardContent>
        <div className="space-y-4">
          <Input
            type="password"
            placeholder="Enter access token"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            className={error ? 'border-red-500' : ''}
          />
          {error && (
            <p className="text-sm text-red-500">{error}</p>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button type="submit" className="w-full">
          Access Protected Route
        </Button>
      </CardFooter>
    </form>
  );
}