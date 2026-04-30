'use client';

import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from 'react';
import { getFirebaseAuth } from './firebase';
import { createSellerProfile, createUserProfile, fetchSellerByOwnerId, getUserProfile } from './firebase-data';
import { UserProfile } from './types';

interface AuthContextType {
  user: UserProfile | null;
  firebaseUser: any | null;
  loading: boolean;
  error: string | null;
  signIn: (email: string, password: string) => Promise<UserProfile>;
  signUp: (
    email: string,
    password: string,
    fullName: string,
    role: 'buyer' | 'seller',
    extraData?: Record<string, string>
  ) => Promise<UserProfile>;
  logout: () => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

async function hydrateUser(firebaseUser: any): Promise<UserProfile> {
  const existing = await getUserProfile(firebaseUser.uid);
  if (existing) return existing;

  const fallback: UserProfile = {
    uid: firebaseUser.uid,
    fullName: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'User',
    email: firebaseUser.email || '',
    role: 'buyer',
  };
  await createUserProfile(fallback);
  return fallback;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [firebaseUser, setFirebaseUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let unsubscribe = () => {};

    (async () => {
      const auth = await getFirebaseAuth();
      const { onAuthStateChanged } = await import('firebase/auth/web-extension');
      unsubscribe = onAuthStateChanged(auth, async (nextUser) => {
        setFirebaseUser(nextUser);
        if (!nextUser) {
          setUser(null);
          setLoading(false);
          return;
        }
        try {
          const profile = await hydrateUser(nextUser);
          setUser(profile);
        } catch (e: any) {
          setError(e?.message || 'Unable to load user profile.');
        } finally {
          setLoading(false);
        }
      });
    })();

    return () => unsubscribe();
  }, []);

  const clearError = () => setError(null);

  const signIn = async (email: string, password: string) => {
    setError(null);
    setLoading(true);
    try {
      const auth = await getFirebaseAuth();
      const { signInWithEmailAndPassword } = await import('firebase/auth/web-extension');
      const credential = await signInWithEmailAndPassword(auth, email, password);
      const profile = await hydrateUser(credential.user);
      const seller = profile.role === 'seller' && !profile.sellerId ? await fetchSellerByOwnerId(profile.uid) : null;
      const finalProfile = seller ? { ...profile, sellerId: seller.id } : profile;
      setFirebaseUser(credential.user);
      setUser(finalProfile);
      return finalProfile;
    } catch (e: any) {
      const message = e?.message || 'Unable to sign in.';
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, fullName: string, role: 'buyer' | 'seller', extraData?: Record<string, string>) => {
    setError(null);
    setLoading(true);
    try {
      const auth = await getFirebaseAuth();
      const { createUserWithEmailAndPassword } = await import('firebase/auth/web-extension');
      const credential = await createUserWithEmailAndPassword(auth, email, password);
      let sellerId: string | undefined;

      if (role === 'seller') {
        sellerId = await createSellerProfile({
          ownerId: credential.user.uid,
          farmName: extraData?.farmName || fullName,
          description: extraData?.description || 'New seller on TonoRib.',
          location: extraData?.location || '',
          deliveryRegions: [],
          verified: false,
          rating: 0,
          phone: extraData?.phone || '',
          email,
          website: '',
        });
      }

      const profile: UserProfile = { uid: credential.user.uid, fullName, email, role, phone: extraData?.phone || '', sellerId };
      await createUserProfile(profile);
      setFirebaseUser(credential.user);
      setUser(profile);
      return profile;
    } catch (e: any) {
      const message = e?.message || 'Unable to create account.';
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    const auth = await getFirebaseAuth();
    const { signOut } = await import('firebase/auth/web-extension');
    await signOut(auth);
    setFirebaseUser(null);
    setUser(null);
  };

  const value = useMemo(() => ({ user, firebaseUser, loading, error, signIn, signUp, logout, clearError }), [user, firebaseUser, loading, error]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
}
