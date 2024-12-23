'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardHeader } from '@/components/ui/card';
import { Lock } from 'lucide-react';
import { LoginForm } from './login-form';
import { PROTECTED_ROUTES } from '@/lib/routes';

export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    // Check if already authenticated
    const token = document.cookie
      .split('; ')
      .find(row => row.startsWith('auth_token='))
      ?.split('=')[1];

    if (token === process.env.NEXT_PUBLIC_AUTH_TOKEN) {
      router.push(`/${PROTECTED_ROUTES.admin}`);
    }
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 flex flex-col items-center">
          <Lock className="w-12 h-12 mb-4" />
          <h2 className="text-2xl font-bold">Admin Access</h2>
          <p className="text-muted-foreground">Enter your credentials to continue</p>
        </CardHeader>
        <LoginForm />
      </Card>
    </div>
  );
}