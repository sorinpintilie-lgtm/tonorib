// Firebase configuration and initialization for TonoRib

import { initializeApp, getApps, getAnalytics } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAlTqERFPJ1ufPk7zVSpy6_FeVxX7dMao4",
  authDomain: "tonorib-24994.firebaseapp.com",
  projectId: "tonorib-24994",
  storageBucket: "tonorib-24994.firebasestorage.app",
  messagingSenderId: "730740826816",
  appId: "1:730740826816:web:bf04f9e0cb6a26da964325",
  measurementId: "G-4GNZDF0959"
};

// Initialize Firebase only once
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Initialize Analytics (client-side only)
let analytics: ReturnType<typeof getAnalytics> | null = null;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export { analytics };

export default app;

/* 
// Example Firestore Schema:
// 
// users/{userId} {
//   uid: string
//   fullName: string
//   email: string
//   role: 'buyer' | 'seller' | 'admin'
//   phone?: string
//   createdAt: Timestamp
// }
// 
// sellers/{sellerId} {
//   ownerId: string
//   farmName: string
//   description: string
//   location: string
//   deliveryRegions: string[]
//   verified: boolean
//   rating: number
//   logoUrl?: string
//   createdAt: Timestamp
// }
// 
// products/{productId} {
//   sellerId: string
//   name: string
//   species: string
//   category: 'fresh' | 'frozen' | 'smoked' | 'live' | 'fillet'
//   pricePerKg: number
//   stockKg: number
//   minOrderKg: number
//   unit: 'kg'
//   freshnessDate?: Timestamp
//   images: string[]
//   description: string
//   origin: string
//   deliveryRegions: string[]
//   isPublished: boolean
//   createdAt: Timestamp
//   updatedAt: Timestamp
// }
// 
// orders/{orderId} {
//   buyerId: string
//   items: {
//     productId: string
//     sellerId: string
//     name: string
//     quantityKg: number
//     pricePerKg: number
//   }[]
//   subtotal: number
//   deliveryFee: number
//   total: number
//   status: 'pending' | 'paid' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
//   shippingAddress: string
//   createdAt: Timestamp
// }

/*
// Example Security Rules (firestore.rules):
//
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, update: if request.auth != null && request.auth.uid == userId;
      allow create: if request.auth != null && request.auth.uid == userId;
    }

    match /sellers/{sellerId} {
      allow read: if true;
      allow create: if request.auth != null;
      allow update, delete: if request.auth != null
        && resource.data.ownerId == request.auth.uid;
    }

    match /products/{productId} {
      allow read: if resource.data.isPublished == true || request.auth != null;
      allow create: if request.auth != null;
      allow update, delete: if request.auth != null &&
        resource.data.sellerId in get(/databases/$(database)/documents/sellers/$(resource.data.sellerId)).data.ownerId;
    }

    match /orders/{orderId} {
      allow create: if request.auth != null;
      allow read: if request.auth != null &&
        (resource.data.buyerId == request.auth.uid);
    }
  }
}
*/
