'use client';

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  runTransaction,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
  Timestamp,
} from 'firebase/firestore';
import { db } from './firebase';
import {
  Auction,
  AuctionBid,
  BlogPost,
  ForumPost,
  ForumReply,
  Order,
  Product,
  SellerProfile,
  UserAddress,
  UserProfile,
} from './types';

function normalizeTimestamp(value: any): string | undefined {
  if (!value) return undefined;
  if (typeof value === 'string') return value;
  if (value instanceof Timestamp) return value.toDate().toISOString();
  if (typeof value?.toDate === 'function') return value.toDate().toISOString();
  return undefined;
}

function mapDoc<T>(id: string, data: any): T {
  const normalized: Record<string, any> = { id };
  for (const [key, value] of Object.entries(data || {})) {
    normalized[key] = value instanceof Timestamp || typeof (value as any)?.toDate === 'function'
      ? normalizeTimestamp(value)
      : value;
  }
  return normalized as T;
}

async function fetchCollection<T>(path: string, constraints: any[] = []): Promise<T[]> {
  const refCol = collection(db, path);
  const snap = await getDocs(query(refCol, ...constraints));
  return snap.docs.map((item) => mapDoc<T>(item.id, item.data()));
}

export async function uploadImage(file: File, _folder: string) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ''));
    reader.onerror = () => reject(new Error('Image upload failed.'));
    reader.readAsDataURL(file);
  });
}

export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  const snap = await getDoc(doc(db, 'users', uid));
  return snap.exists() ? mapDoc<UserProfile>(snap.id, snap.data()) : null;
}

export async function createUserProfile(profile: UserProfile) {
  await setDoc(doc(db, 'users', profile.uid), {
    ...profile,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  }, { merge: true });
}

export async function updateUserProfile(uid: string, patch: Partial<UserProfile>) {
  await updateDoc(doc(db, 'users', uid), {
    ...patch,
    updatedAt: serverTimestamp(),
  });
}

export async function fetchProducts(filters?: {
  category?: string;
  sellerId?: string;
  search?: string;
  inStock?: boolean;
  minPrice?: number;
  maxPrice?: number;
  region?: string;
}): Promise<Product[]> {
  const rows = await fetchCollection<Product>('products', [orderBy('updatedAt', 'desc')]);
  return rows.filter((product) => {
    if (!product.isPublished) return false;
    if (filters?.category && product.category !== filters.category) return false;
    if (filters?.sellerId && product.sellerId !== filters.sellerId) return false;
    if (filters?.inStock && product.stockKg <= 0) return false;
    if (filters?.minPrice != null && product.pricePerKg < filters.minPrice) return false;
    if (filters?.maxPrice != null && product.pricePerKg > filters.maxPrice) return false;
    if (filters?.region && !product.deliveryRegions?.includes(filters.region)) return false;
    if (filters?.search) {
      const q = filters.search.toLowerCase();
      return [product.name, product.species, product.description, product.origin]
        .filter(Boolean)
        .some((value) => value.toLowerCase().includes(q));
    }
    return true;
  });
}

export async function fetchProductById(id: string) {
  const snap = await getDoc(doc(db, 'products', id));
  return snap.exists() ? mapDoc<Product>(snap.id, snap.data()) : null;
}

export async function fetchSellers(): Promise<SellerProfile[]> {
  const sellers = await fetchCollection<SellerProfile>('sellers', [orderBy('farmName', 'asc')]);
  return await Promise.all(sellers.map(async (seller) => ({
    ...seller,
    productsCount: (await fetchProducts({ sellerId: seller.id })).length,
  })));
}

export async function fetchSellerById(id: string) {
  const snap = await getDoc(doc(db, 'sellers', id));
  if (!snap.exists()) return null;
  const seller = mapDoc<SellerProfile>(snap.id, snap.data());
  const productsCount = (await fetchProducts({ sellerId: id })).length;
  return { ...seller, productsCount };
}

export async function fetchSellerByOwnerId(ownerId: string) {
  const rows = await fetchCollection<SellerProfile>('sellers', [where('ownerId', '==', ownerId), limit(1)]);
  return rows[0] || null;
}

export async function createSellerProfile(profile: Omit<SellerProfile, 'id'>) {
  const created = await addDoc(collection(db, 'sellers'), {
    ...profile,
    verified: false,
    rating: profile.rating ?? 0,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return created.id;
}

export async function updateSellerProfile(id: string, patch: Partial<SellerProfile>) {
  await updateDoc(doc(db, 'sellers', id), {
    ...patch,
    updatedAt: serverTimestamp(),
  });
}

export async function createProduct(input: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) {
  const created = await addDoc(collection(db, 'products'), {
    ...input,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return created.id;
}

export async function updateProduct(id: string, patch: Partial<Product>) {
  await updateDoc(doc(db, 'products', id), { ...patch, updatedAt: serverTimestamp() });
}

export async function deleteProduct(id: string) {
  await deleteDoc(doc(db, 'products', id));
}

export async function fetchOrdersByBuyer(buyerId: string) {
  const rows = await fetchCollection<Order>('orders', [orderBy('createdAt', 'desc')]);
  return rows.filter((order) => order.buyerId === buyerId);
}

export async function fetchOrdersBySeller(sellerId: string) {
  const rows = await fetchCollection<Order>('orders', [orderBy('createdAt', 'desc')]);
  return rows.filter((order) => order.sellerId === sellerId);
}

export async function createOrder(input: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>) {
  const created = await addDoc(collection(db, 'orders'), {
    ...input,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return created.id;
}

export async function updateOrder(id: string, patch: Partial<Order>) {
  await updateDoc(doc(db, 'orders', id), { ...patch, updatedAt: serverTimestamp() });
}

export async function fetchAuctions() {
  return fetchCollection<Auction>('auctions', [orderBy('createdAt', 'desc')]);
}

export async function fetchAuctionById(id: string) {
  const snap = await getDoc(doc(db, 'auctions', id));
  return snap.exists() ? mapDoc<Auction>(snap.id, snap.data()) : null;
}

export async function createAuction(input: Omit<Auction, 'id' | 'currentBid' | 'bidCount' | 'createdAt' | 'updatedAt'>) {
  const created = await addDoc(collection(db, 'auctions'), {
    ...input,
    currentBid: input.startingBid,
    bidCount: 0,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return created.id;
}

export async function fetchAuctionBids(auctionId: string) {
  return fetchCollection<AuctionBid>(`auctions/${auctionId}/bids`, [orderBy('createdAt', 'desc')]);
}

export async function placeAuctionBid(auction: Auction, bid: { bidderId: string; bidderName: string; amount: number; message?: string }) {
  const auctionRef = doc(db, 'auctions', auction.id);
  const bidsRef = collection(db, `auctions/${auction.id}/bids`);

  await runTransaction(db, async (tx) => {
    const auctionSnap = await tx.get(auctionRef);
    if (!auctionSnap.exists()) throw new Error('Auction not found.');
    const data = auctionSnap.data();
    const currentBid = Number(data.currentBid || data.startingBid || 0);
    const status = data.status;
    if (status !== 'live') throw new Error('Auction is not live.');
    if (bid.amount <= currentBid) throw new Error('Bid must be higher than the current bid.');

    tx.update(auctionRef, {
      currentBid: bid.amount,
      bidCount: Number(data.bidCount || 0) + 1,
      updatedAt: serverTimestamp(),
    });

    tx.set(doc(bidsRef), {
      auctionId: auction.id,
      bidderId: bid.bidderId,
      bidderName: bid.bidderName,
      amount: bid.amount,
      message: bid.message || '',
      createdAt: serverTimestamp(),
    });
  });
}

export async function fetchForumPosts() {
  return fetchCollection<ForumPost>('forumPosts', [orderBy('lastActivityAt', 'desc')]);
}

export async function fetchForumPostById(id: string) {
  const snap = await getDoc(doc(db, 'forumPosts', id));
  return snap.exists() ? mapDoc<ForumPost>(snap.id, snap.data()) : null;
}

export async function createForumPost(input: Omit<ForumPost, 'id' | 'replyCount' | 'createdAt' | 'lastActivityAt'>) {
  const created = await addDoc(collection(db, 'forumPosts'), {
    ...input,
    replyCount: 0,
    createdAt: serverTimestamp(),
    lastActivityAt: serverTimestamp(),
  });
  return created.id;
}

export async function fetchForumReplies(postId: string) {
  return fetchCollection<ForumReply>(`forumPosts/${postId}/replies`, [orderBy('createdAt', 'asc')]);
}

export async function createForumReply(postId: string, input: Omit<ForumReply, 'id' | 'postId' | 'createdAt'>) {
  await addDoc(collection(db, `forumPosts/${postId}/replies`), {
    ...input,
    postId,
    createdAt: serverTimestamp(),
  });
  await updateDoc(doc(db, 'forumPosts', postId), {
    replyCount: await incrementField('forumPosts', postId, 'replyCount'),
    lastActivityAt: serverTimestamp(),
  });
}

async function incrementField(collectionName: string, id: string, field: string) {
  const snap = await getDoc(doc(db, collectionName, id));
  const current = snap.exists() ? Number(snap.data()?.[field] || 0) : 0;
  return current + 1;
}

export async function fetchBlogPosts() {
  const rows = await fetchCollection<BlogPost>('blogPosts', [orderBy('createdAt', 'desc')]);
  return rows.filter((post) => post.published);
}

export async function fetchBlogPostById(id: string) {
  const snap = await getDoc(doc(db, 'blogPosts', id));
  return snap.exists() ? mapDoc<BlogPost>(snap.id, snap.data()) : null;
}

export async function saveUserAddresses(uid: string, addresses: UserAddress[]) {
  await updateUserProfile(uid, { addresses });
}
