'use client';

import { SessionProvider } from 'next-auth/react';
import { AuthProvider } from '@/lib/contexts/auth-context';

export function AuthProviders({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <AuthProvider>{children}</AuthProvider>
    </SessionProvider>
  );
}
