'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@prisma/client';
import { signIn, signOut, useSession } from 'next-auth/react';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
}

interface RegisterData {
  email: string;
  password: string;
  name: string;
  title?: string;
  department?: string;
  location?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { data: session, status } = useSession();

  useEffect(() => {
    if (session?.user) {
      setUser(session.user as User);
      setLoading(false);
    } else if (status === 'unauthenticated') {
      setLoading(false);
    }
  }, [session, status]);

  const login = async (email: string, password: string) => {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || 'Failed to login');
    }

    localStorage.setItem('token', data.token);
    setUser(data.user);
  };

  const register = async (userData: RegisterData) => {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || 'Failed to register');
    }

    localStorage.setItem('token', data.token);
    setUser(data.user);
  };

  const signInWithGoogle = async () => {
    try {
      await signIn('google', { callbackUrl: '/' });
    } catch (error) {
      console.error('Google sign in error:', error);
      throw error;
    }
  };

  const logout = async () => {
    await signOut({ callbackUrl: '/login' });
    setUser(null);
  };

  const updateProfile = async (data: Partial<User>) => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Not authenticated');

    const res = await fetch('/api/users/me', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    const updatedUser = await res.json();

    if (updatedUser.error) {
      throw new Error(updatedUser.error);
    }

    setUser(updatedUser);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        updateProfile,
        signInWithGoogle,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
