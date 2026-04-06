'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

const API_KEY = "AIzaSyAlTqERFPJ1ufPk7zVSpy6_FeVxX7dMao4";
const PROJECT_ID = "tonorib-24994";
const BASE_URL = `https://identitytoolkit.googleapis.com/v1`;
const DB_URL = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents`;

interface UserData {
  uid: string;
  email: string;
  fullName: string;
  role: 'buyer' | 'seller';
  phone?: string;
  idToken?: string;
}

interface AuthContextType {
  user: UserData | null;
  loading: boolean;
  error: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, fullName: string, role: 'buyer' | 'seller', extraData?: Record<string, string>) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check for existing session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('tonorib_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem('tonorib_user');
      }
    }
    setLoading(false);
  }, []);

  const clearError = () => setError(null);

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      // Sign in with Firebase Auth REST API
      const response = await fetch(`${BASE_URL}:signInWithPassword?key=${API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password,
          returnSecureToken: true,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(getAuthErrorMessage(data.error?.message || 'INVALID_CREDENTIAL'));
      }

      // Get user data from Firestore
      const userData = await fetchUserData(data.localId);

      const user: UserData = {
        uid: data.localId,
        email: data.email,
        fullName: userData?.fullName || '',
        role: userData?.role || 'buyer',
        phone: userData?.phone,
        idToken: data.idToken,
      };

      setUser(user);
      localStorage.setItem('tonorib_user', JSON.stringify(user));
      localStorage.setItem('tonorib_token', data.idToken);
    } catch (err: any) {
      setError(err.message || 'Login failed');
      throw err;
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
      // Create user with Firebase Auth REST API
      const response = await fetch(`${BASE_URL}:signUp?key=${API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password,
          returnSecureToken: true,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(getAuthErrorMessage(data.error?.message || 'EMAIL_EXISTS'));
      }

      // Store user data in Firestore
      await setUserData(data.localId, {
        uid: data.localId,
        email,
        fullName,
        role,
        phone: extraData?.phone || '',
      });

      // Create seller profile if seller
      if (role === 'seller') {
        await setSellerData(data.localId, {
          ownerId: data.localId,
          farmName: extraData?.farmName || '',
          description: '',
          location: extraData?.location || '',
          verified: false,
          rating: 0,
        });
      }

      const user: UserData = {
        uid: data.localId,
        email,
        fullName,
        role,
        phone: extraData?.phone,
        idToken: data.idToken,
      };

      setUser(user);
      localStorage.setItem('tonorib_user', JSON.stringify(user));
      localStorage.setItem('tonorib_token', data.idToken);
    } catch (err: any) {
      setError(err.message || 'Registration failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      setUser(null);
      localStorage.removeItem('tonorib_user');
      localStorage.removeItem('tonorib_token');
    } catch (err: any) {
      setError(getAuthErrorMessage('UNKNOWN'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, signIn, signUp, logout, clearError }}>
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

// Firestore helper functions using REST API
async function fetchUserData(uid: string): Promise<UserData | null> {
  try {
    const token = localStorage.getItem('tonorib_token');
    const response = await fetch(`${DB_URL}/users/${uid}?key=${API_KEY}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (response.ok) {
      const data = await response.json();
      return data.fields ? {
        uid: data.fields.uid?.stringValue || uid,
        email: data.fields.email?.stringValue || '',
        fullName: data.fields.fullName?.stringValue || '',
        role: (data.fields.role?.stringValue as 'buyer' | 'seller') || 'buyer',
        phone: data.fields.phone?.stringValue,
      } : null;
    }
  } catch {
    // Ignore errors
  }
  return null;
}

async function setUserData(uid: string, data: Record<string, any>) {
  try {
    const token = localStorage.getItem('tonorib_token');
    await fetch(`${DB_URL}/users/${uid}?key=${API_KEY}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ fields: data }),
    });
  } catch {
    // Ignore errors
  }
}

async function setSellerData(uid: string, data: Record<string, any>) {
  try {
    const token = localStorage.getItem('tonorib_token');
    await fetch(`${DB_URL}/sellers/${uid}?key=${API_KEY}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ fields: data }),
    });
  } catch {
    // Ignore errors
  }
}

function getAuthErrorMessage(code: string): string {
  switch (code) {
    case 'EMAIL_EXISTS':
      return 'This email is already registered.';
    case 'INVALID_EMAIL':
      return 'Invalid email address.';
    case 'WEAK_PASSWORD':
      return 'Password is too weak (minimum 6 characters).';
    case 'INVALID_PASSWORD':
      return 'Incorrect password.';
    case 'EMAIL_NOT_FOUND':
      return 'No account found with this email.';
    case 'INVALID_CREDENTIALS':
      return 'Invalid email or password.';
    case 'TOO_MANY_ATTEMPTS':
      return 'Too many attempts. Please try again later.';
    default:
      return 'An error occurred. Please try again.';
  }
}