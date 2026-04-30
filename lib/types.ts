export type UserRole = 'buyer' | 'seller' | 'admin';
export type ProductCategory = 'fresh' | 'frozen' | 'smoked' | 'live' | 'fillet';
export type OrderStatus = 'pending' | 'paid' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
export type AuctionStatus = 'draft' | 'live' | 'ended';

export interface UserProfile {
  uid: string;
  fullName: string;
  email: string;
  role: UserRole;
  phone?: string;
  sellerId?: string;
  savedProductIds?: string[];
  addresses?: UserAddress[];
  createdAt?: string;
  updatedAt?: string;
}

export interface UserAddress {
  label?: string;
  firstName?: string;
  lastName?: string;
  address: string;
  city: string;
  postalCode: string;
  phone?: string;
}

export interface SellerProfile {
  id: string;
  ownerId: string;
  farmName: string;
  description: string;
  location: string;
  deliveryRegions: string[];
  verified: boolean;
  rating: number;
  logoUrl?: string;
  phone?: string;
  email?: string;
  website?: string;
  createdAt?: string;
  updatedAt?: string;
  productsCount?: number;
}

export interface Product {
  id: string;
  sellerId: string;
  name: string;
  species: string;
  speciesScientific?: string;
  category: ProductCategory;
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
  createdAt?: string;
  updatedAt?: string;
}

export interface CartItem {
  productId: string;
  quantityKg: number;
}

export interface OrderItem {
  productId: string;
  sellerId: string;
  name: string;
  quantityKg: number;
  pricePerKg: number;
}

export interface Order {
  id: string;
  buyerId: string;
  buyerName?: string;
  buyerEmail?: string;
  sellerId: string;
  sellerName?: string;
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  status: OrderStatus;
  shippingAddress: string;
  shippingCity?: string;
  shippingPostalCode?: string;
  shippingPhone?: string;
  paymentMethod?: string;
  note?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Auction {
  id: string;
  sellerId: string;
  sellerName?: string;
  title: string;
  description: string;
  productName?: string;
  startingBid: number;
  currentBid: number;
  reservePrice?: number;
  endAt: string;
  imageUrl?: string;
  status: AuctionStatus;
  bidCount: number;
  createdBy: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface AuctionBid {
  id: string;
  auctionId: string;
  bidderId: string;
  bidderName?: string;
  amount: number;
  message?: string;
  createdAt?: string;
}

export interface ForumPost {
  id: string;
  title: string;
  category: string;
  content: string;
  authorId: string;
  authorName: string;
  replyCount: number;
  lastActivityAt?: string;
  createdAt?: string;
}

export interface ForumReply {
  id: string;
  postId: string;
  authorId: string;
  authorName: string;
  content: string;
  createdAt?: string;
}

export interface ClassifiedListing {
  id: string;
  title: string;
  category: string;
  description: string;
  priceLabel: string;
  authorId: string;
  authorName: string;
  contactEmail?: string;
  location?: string;
  status: 'active' | 'sold' | 'closed';
  createdAt?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  authorName?: string;
  coverImage?: string;
  published: boolean;
  createdAt?: string;
}
