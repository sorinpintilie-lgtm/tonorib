import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAlTqERFPJ1ufPk7zVSpy6_FeVxX7dMao4',
  authDomain: 'tonorib-24994.firebaseapp.com',
  projectId: 'tonorib-24994',
  storageBucket: 'tonorib-24994.firebasestorage.app',
  messagingSenderId: '730740826816',
  appId: '1:730740826816:web:bf04f9e0cb6a26da964325',
  measurementId: 'G-4GNZDF0959',
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const db = getFirestore(app);

export async function getFirebaseAuth() {
  const { getAuth } = await import('firebase/auth/web-extension');
  return getAuth(app);
}

export default app;
