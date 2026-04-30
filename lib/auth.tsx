'use client';

import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from 'react';

interface UserData {
  uid: string;
  email: string;
  fullName: string;
  role: 'buyer' | 'seller';
  phone?: string;
}

interface AuthContextType {
  user: UserData | null;
  loading: boolean;
  error: string | null;
  signIn: (email: string, password: string) => Promise<UserData>;
  signUp: (email: string, password: string, fullName: string, role: 'buyer' | 'seller', extraData?: Record<string, string>) => Promise<UserData>;
  logout: () => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const STORAGE_KEY = 'tonorib_user';

function buildMockUser(
  email: string,
  fullName: string,
  role: 'buyer' | 'seller',
  extraData?: Record<string, string>
): UserData {
  return {
    uid: `mock-${email.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
    email,
    fullName,
    role,
    phone: extraData?.phone || '',
  };
}

function persistUser(user: UserData | null) {
  if (typeof window === 'undefined') return;
  if (user) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  } else {
    window.localStorage.removeItem(STORAGE_KEY);
  }
}

function readStoredUser(): UserData | null {
  if (typeof window === 'undefined') return null;
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw) as UserData;
    if (!parsed?.email || !parsed?.role) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setUser(readStoredUser());
    setLoading(false);
  }, []);

  const clearError = () => setError(null);

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    setError(null);

    try {
      if (!email || !password) {
        throw new Error('Email and password are required.');
      }

      const stored = readStoredUser();
      const role: 'buyer' | 'seller' = stored?.email?.toLowerCase() === email.toLowerCase()
        ? stored.role
        : email.toLowerCase().includes('seller')
          ? 'seller'
          : 'buyer';

      const nextUser = stored?.email?.toLowerCase() === email.toLowerCase()
        ? stored
        : buildMockUser(email, email.split('@')[0], role);

      setUser(nextUser);
      persistUser(nextUser);
      return nextUser;
    } catch (e: any) {
      const message = e?.message || 'Unable to sign in.';
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (
    email: string,
    password: string,
    fullName: string,
    role: 'buyer' | 'seller',
    extraData?: Record<string, string>
  ) => {
    setLoading(true);
    setError(null);

    try {
      if (!email || !password || !fullName) {
        throw new Error('Please fill in all required fields.');
      }

      const nextUser = buildMockUser(email, fullName, role, extraData);
      setUser(nextUser);
      persistUser(nextUser);
      return nextUser;
    } catch (e: any) {
      const message = e?.message || 'Unable to create account.';
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      setUser(null);
      persistUser(null);
    } finally {
      setLoading(false);
    }
  };

  const value = useMemo(
    () => ({ user, loading, error, signIn, signUp, logout, clearError }),
    [user, loading, error]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
