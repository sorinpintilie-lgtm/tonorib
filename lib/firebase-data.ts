import { db } from './firebase';
import { 
  collection, 
  getDocs, 
  getDoc, 
  doc, 
  query, 
  where, 
  orderBy,
  DocumentData,
  QuerySnapshot
} from 'firebase/firestore';

export interface FirebaseProduct {
  id: string;
  sellerId: string;
  name: string;
  species: string;
  speciesScientific?: string;
  category: 'fresh' | 'frozen' | 'smoked' | 'live' | 'fillet';
  pricePerKg: number;
  stockKg: number;
  minOrderKg: number;
  unit: string;
  freshnessDate?: string;
  images: string[];
  description: string;
  origin: string;
  deliveryRegions: string[];
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface FirebaseSeller {
  id: string;
  ownerId: string;
  farmName: string;
  description: string;
  location: string;
  deliveryRegions: string[];
  verified: boolean;
  rating: number;
  logoUrl?: string;
  createdAt: string;
  productsCount: number;
}

export async function fetchProducts(): Promise<FirebaseProduct[]> {
  try {
    const productsRef = collection(db, 'products');
    const q = query(productsRef, where('isPublished', '==', true));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as FirebaseProduct[];
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export async function fetchProductById(productId: string): Promise<FirebaseProduct | null> {
  try {
    const productRef = doc(db, 'products', productId);
    const snapshot = await getDoc(productRef);
    if (snapshot.exists()) {
      return { id: snapshot.id, ...snapshot.data() } as FirebaseProduct;
    }
    return null;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

export async function fetchSellers(): Promise<FirebaseSeller[]> {
  try {
    const sellersRef = collection(db, 'sellers');
    const snapshot = await getDocs(sellersRef);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as FirebaseSeller[];
  } catch (error) {
    console.error('Error fetching sellers:', error);
    return [];
  }
}

export async function fetchSellerById(sellerId: string): Promise<FirebaseSeller | null> {
  try {
    const sellerRef = doc(db, 'sellers', sellerId);
    const snapshot = await getDoc(sellerRef);
    if (snapshot.exists()) {
      return { id: snapshot.id, ...snapshot.data() } as FirebaseSeller;
    }
    return null;
  } catch (error) {
    console.error('Error fetching seller:', error);
    return null;
  }
}

export async function fetchProductsBySeller(sellerId: string): Promise<FirebaseProduct[]> {
  try {
    const productsRef = collection(db, 'products');
    const q = query(
      productsRef, 
      where('sellerId', '==', sellerId),
      where('isPublished', '==', true)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as FirebaseProduct[];
  } catch (error) {
    console.error('Error fetching seller products:', error);
    return [];
  }
}

export async function fetchFilteredProducts(filters: {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  sellerId?: string;
  inStock?: boolean;
  search?: string;
}): Promise<FirebaseProduct[]> {
  try {
    const productsRef = collection(db, 'products');
    let q = query(productsRef, where('isPublished', '==', true));

    const snapshot = await getDocs(q);
    let products = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as FirebaseProduct[];

    if (filters.category) {
      products = products.filter(p => p.category === filters.category);
    }
    if (filters.minPrice) {
      products = products.filter(p => p.pricePerKg >= filters.minPrice!);
    }
    if (filters.maxPrice) {
      products = products.filter(p => p.pricePerKg <= filters.maxPrice!);
    }
    if (filters.sellerId) {
      products = products.filter(p => p.sellerId === filters.sellerId);
    }
    if (filters.inStock) {
      products = products.filter(p => p.stockKg > 0);
    }
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      products = products.filter(p => 
        p.name.toLowerCase().includes(searchLower) ||
        p.species.toLowerCase().includes(searchLower) ||
        p.description.toLowerCase().includes(searchLower)
      );
    }

    return products;
  } catch (error) {
    console.error('Error fetching filtered products:', error);
    return [];
  }
}
