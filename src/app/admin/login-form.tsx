'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CardContent, CardFooter } from '@/components/ui/card';
import { PROTECTED_ROUTES } from '@/lib/routes';

export function LoginForm() {
  const [token, setToken] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      // Validate token against environment variable
      if (token === process.env.NEXT_PUBLIC_AUTH_TOKEN) {
        // Set secure HTTP-only cookie
        document.cookie = `auth_token=${token}; path=/; secure; samesite=strict`;
        router.push(`/${PROTECTED_ROUTES.admin}`);
      } else {
        setError('Invalid access token');
        setToken('');
      }
    } catch (err) {
      setError('An error occurred during login');
    } finally {
      setIsLoading(false);
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
            disabled={isLoading}
          />
          {error && (
            <p className="text-sm text-red-500">{error}</p>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          type="submit" 
          className="w-full"
          disabled={isLoading}
        >
          {isLoading ? 'Authenticating...' : 'Access Protected Route'}
        </Button>
      </CardFooter>
    </form>
  );
}