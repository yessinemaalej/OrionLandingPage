'use client';

import { Card, CardHeader } from '@/components/ui/card';
import { Lock } from 'lucide-react';
import { LoginForm } from './login-form';

export default function LoginPage() {
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