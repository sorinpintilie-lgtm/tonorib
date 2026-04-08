'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  User as FirebaseUser
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from './firebase';

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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
          const userData = userDoc.exists() ? userDoc.data() : null;
          
          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email || '',
            fullName: userData?.fullName || '',
            role: userData?.role || 'buyer',
            phone: userData?.phone,
          });
        } catch (e) {
          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email || '',
            fullName: '',
            role: 'buyer',
          });
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const clearError = () => setError(null);

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const userDoc = await getDoc(doc(db, 'users', result.user.uid));
      const userData = userDoc.exists() ? userDoc.data() : null;

      const user: UserData = {
        uid: result.user.uid,
        email: result.user.email || '',
        fullName: userData?.fullName || '',
        role: userData?.role || 'buyer',
        phone: userData?.phone,
      };

      setUser(user);
      localStorage.setItem('tonorib_user', JSON.stringify(user));
    } catch (e: any) {
      const message = getAuthErrorMessage(e.code);
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
      const result = await createUserWithEmailAndPassword(auth, email, password);
      
      await updateProfile(result.user, { displayName: fullName });

      await setDoc(doc(db, 'users', result.user.uid), {
        uid: result.user.uid,
        email,
        fullName,
        role,
        phone: extraData?.phone || '',
        createdAt: serverTimestamp(),
      });

      if (role === 'seller') {
        await setDoc(doc(db, 'sellers', result.user.uid), {
          ownerId: result.user.uid,
          farmName: extraData?.farmName || '',
          description: '',
          location: extraData?.location || '',
          verified: false,
          rating: 0,
          productsCount: 0,
          createdAt: serverTimestamp(),
        });
      }

      const user: UserData = {
        uid: result.user.uid,
        email,
        fullName,
        role,
        phone: extraData?.phone,
      };

      setUser(user);
      localStorage.setItem('tonorib_user', JSON.stringify(user));
    } catch (e: any) {
      const message = getAuthErrorMessage(e.code);
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      setUser(null);
      localStorage.removeItem('tonorib_user');
    } catch (e: any) {
      setError(getAuthErrorMessage(e.code));
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

function getAuthErrorMessage(code: string): string {
  switch (code) {
    case 'auth/email-already-in-use':
      return 'This email is already registered.';
    case 'auth/invalid-email':
      return 'Invalid email address.';
    case 'auth/weak-password':
      return 'Password is too weak (minimum 6 characters).';
    case 'auth/wrong-password':
      return 'Incorrect password.';
    case 'auth/user-not-found':
      return 'No account found with this email.';
    case 'auth/invalid-credential':
    case 'auth/invalid-login-credentials':
      return 'Invalid email or password.';
    case 'auth/too-many-requests':
      return 'Too many attempts. Please try again later.';
    default:
      return 'An error occurred. Please try again.';
  }
}