// Mock data for RibTrg Fish Marketplace
// English content for the marketplace

export interface Seller {
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

export interface Product {
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

export interface Order {
  id: string;
  buyerId: string;
  sellerId: string;
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  status: 'pending' | 'paid' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: string;
  createdAt: string;
}

export interface OrderItem {
  productId: string;
  sellerId: string;
  name: string;
  quantityKg: number;
  pricePerKg: number;
}

// Mock Sellers - Fish Farms
export const mockSellers: Seller[] = [
  {
    id: 'seller-1',
    ownerId: 'user-1',
    farmName: 'Alpine Fish Farm',
    description: 'Family-owned fish farm with over 40 years of tradition in farming rainbow trout in the heart of the Slovenian Alps. Our fish are raised in natural conditions with pristine spring water.',
    location: 'Planina, Postojna',
    deliveryRegions: ['Ljubljana', 'Maribor', 'Celje', 'Koper'],
    verified: true,
    rating: 4.9,
    createdAt: '2023-01-15',
    productsCount: 12,
  },
  {
    id: 'seller-2',
    ownerId: 'user-2',
    farmName: 'Coastal Aquaculture',
    description: 'Specialized in farming sea fish and shellfish in the Koper Aquarium. We offer fresh and delicious Mediterranean seafood from the Adriatic Sea.',
    location: 'Koper',
    deliveryRegions: ['Koper', 'Izola', 'Piran', 'Ljubljana'],
    verified: true,
    rating: 4.7,
    createdAt: '2023-03-20',
    productsCount: 8,
  },
  {
    id: 'seller-3',
    ownerId: 'user-3',
    farmName: 'Lake Farm Bohinj',
    description: 'Eco-friendly fish farm by the glacial lake. Our fish live in a unique Alpine environment, giving them exceptional flavor and quality.',
    location: 'Bohinj',
    deliveryRegions: ['Bled', 'Ljubljana', 'Gorica'],
    verified: true,
    rating: 4.8,
    createdAt: '2023-02-10',
    productsCount: 6,
  },
  {
    id: 'seller-4',
    ownerId: 'user-4',
    farmName: 'River Fish Farm',
    description: 'Traditional fish farm known for quality carp and catfish for local gastronomy. Family tradition since 1975.',
    location: 'Novo mesto',
    deliveryRegions: ['Novo mesto', 'Črnomelj', 'Ljubljana'],
    verified: true,
    rating: 4.6,
    createdAt: '2022-11-05',
    productsCount: 5,
  },
  {
    id: 'seller-5',
    ownerId: 'user-5',
    farmName: 'Mountain Trout Farm',
    description: 'Small family fish farm in the heart of Slavonia. Specialized in farming trout and grayling in clean river water.',
    location: 'Radeče',
    deliveryRegions: ['Krško', 'Sevnica', 'Ljubljana'],
    verified: false,
    rating: 4.4,
    createdAt: '2024-01-10',
    productsCount: 4,
  },
];

// Mock Products
export const mockProducts: Product[] = [
  {
    id: 'prod-1',
    sellerId: 'seller-1',
    name: 'Rainbow Trout - Fresh',
    species: 'Rainbow Trout',
    speciesScientific: 'Oncorhynchus mykiss',
    category: 'fresh',
    pricePerKg: 18.50,
    stockKg: 150,
    minOrderKg: 5,
    unit: 'kg',
    freshnessDate: '2026-04-10',
    images: ['/rainbow-trout-fresh.png'],
    description: 'Fresh rainbow trout, farmed in natural conditions with pristine spring water. Our trout are known for exceptional taste and texture. Perfect for grilling or baking.',
    origin: 'Planina, Postojna',
    deliveryRegions: ['Ljubljana', 'Maribor', 'Celje', 'Koper'],
    isPublished: true,
    createdAt: '2024-02-01',
    updatedAt: '2026-04-05',
  },
  {
    id: 'prod-2',
    sellerId: 'seller-1',
    name: 'Rainbow Trout - Filleted',
    species: 'Rainbow Trout',
    speciesScientific: 'Oncorhynchus mykiss',
    category: 'fillet',
    pricePerKg: 24.00,
    stockKg: 80,
    minOrderKg: 3,
    unit: 'kg',
    freshnessDate: '2026-04-10',
    images: ['/rainbow-trout-filleted.png'],
    description: 'Ready-to-cook rainbow trout fillets. All bones and skin removed. Perfect for quick meals.',
    origin: 'Planina, Postojna',
    deliveryRegions: ['Ljubljana', 'Maribor', 'Celje', 'Koper'],
    isPublished: true,
    createdAt: '2024-02-15',
    updatedAt: '2026-04-05',
  },
  {
    id: 'prod-3',
    sellerId: 'seller-2',
    name: 'Sea Bream - Fresh',
    species: 'Gilthead Seabream',
    speciesScientific: 'Sparus aurata',
    category: 'fresh',
    pricePerKg: 22.00,
    stockKg: 60,
    minOrderKg: 3,
    unit: 'kg',
    freshnessDate: '2026-04-09',
    images: ['/sea-bream.png'],
    description: 'Fresh sea bream from the Adriatic. Our sea fish comes directly from our farms in Koper. A golden Mediterranean delicacy.',
    origin: 'Koper',
    deliveryRegions: ['Koper', 'Izola', 'Piran', 'Ljubljana'],
    isPublished: true,
    createdAt: '2024-01-20',
    updatedAt: '2026-04-04',
  },
  {
    id: 'prod-4',
    sellerId: 'seller-2',
    name: 'Sea Bass - Fresh',
    species: 'European Seabass',
    speciesScientific: 'Dicentrarchus labrax',
    category: 'fresh',
    pricePerKg: 26.00,
    stockKg: 45,
    minOrderKg: 2,
    unit: 'kg',
    freshnessDate: '2026-04-09',
    images: ['/sea-bass-fresh.png'],
    description: 'Quality sea bass from the Adriatic. Our fish live in natural conditions and are caught fresh daily. Ideal for baking or grilling.',
    origin: 'Koper',
    deliveryRegions: ['Koper', 'Izola', 'Piran', 'Ljubljana'],
    isPublished: true,
    createdAt: '2024-01-25',
    updatedAt: '2026-04-04',
  },
  {
    id: 'prod-5',
    sellerId: 'seller-3',
    name: 'Grayling - Fresh',
    species: 'Grayling',
    speciesScientific: 'Thymallus thymallus',
    category: 'fresh',
    pricePerKg: 32.00,
    stockKg: 25,
    minOrderKg: 2,
    unit: 'kg',
    freshnessDate: '2026-04-12',
    images: ['/grayling-fresh.png'],
    description: 'Rare Alpine grayling from Lake Bohinj. Our unique taste you cannot get anywhere else. Eco-friendly farming.',
    origin: 'Bohinj',
    deliveryRegions: ['Bled', 'Ljubljana', 'Gorica'],
    isPublished: true,
    createdAt: '2024-03-01',
    updatedAt: '2026-04-05',
  },
  {
    id: 'prod-6',
    sellerId: 'seller-3',
    name: 'Brown Trout - Fresh',
    species: 'Brown Trout',
    speciesScientific: 'Salmo trutta',
    category: 'fresh',
    pricePerKg: 21.00,
    stockKg: 40,
    minOrderKg: 3,
    unit: 'kg',
    freshnessDate: '2026-04-11',
    images: ['/brown-trout-fresh.png'],
    description: 'Brown trout from clean Alpine waters. Our traditional variety, known for rich flavor and beautiful appearance.',
    origin: 'Bohinj',
    deliveryRegions: ['Bled', 'Ljubljana', 'Gorica'],
    isPublished: true,
    createdAt: '2024-03-05',
    updatedAt: '2026-04-05',
  },
  {
    id: 'prod-7',
    sellerId: 'seller-4',
    name: 'Common Carp - Fresh',
    species: 'Common Carp',
    speciesScientific: 'Cyprinus carpio',
    category: 'fresh',
    pricePerKg: 12.00,
    stockKg: 200,
    minOrderKg: 10,
    unit: 'kg',
    freshnessDate: '2026-04-08',
    images: ['/carp-fresh.png'],
    description: 'Traditional carp from Dolenjska. Our specialty for those who appreciate authentic local flavor. Perfect for quick meals.',
    origin: 'Novo mesto',
    deliveryRegions: ['Novo mesto', 'Črnomelj', 'Ljubljana'],
    isPublished: true,
    createdAt: '2024-01-10',
    updatedAt: '2026-04-03',
  },
  {
    id: 'prod-8',
    sellerId: 'seller-4',
    name: 'Wels Catfish - Fresh',
    species: 'Wels Catfish',
    speciesScientific: 'Silurus glanis',
    category: 'fresh',
    pricePerKg: 16.00,
    stockKg: 80,
    minOrderKg: 5,
    unit: 'kg',
    freshnessDate: '2026-04-08',
    images: ['/catfish-fresh.png'],
    description: 'Tasty catfish from Dolenjska ponds. Our fish is rich in omega-3 fatty acids. Perfect for baked specialties.',
    origin: 'Novo mesto',
    deliveryRegions: ['Novo mesto', 'Črnomelj', 'Ljubljana'],
    isPublished: true,
    createdAt: '2024-01-15',
    updatedAt: '2026-04-03',
  },
  {
    id: 'prod-9',
    sellerId: 'seller-1',
    name: 'Smoked Rainbow Trout',
    species: 'Smoked Rainbow Trout',
    speciesScientific: 'Oncorhynchus mykiss',
    category: 'smoked',
    pricePerKg: 28.00,
    stockKg: 30,
    minOrderKg: 2,
    unit: 'kg',
    images: ['/smoked-rainbow-trout.png'],
    description: 'Traditionally smoked rainbow trout using our secret recipe. We use apple wood for the finest smoke. Perfect for appetizers.',
    origin: 'Planina, Postojna',
    deliveryRegions: ['Ljubljana', 'Maribor', 'Celje', 'Koper'],
    isPublished: true,
    createdAt: '2024-02-20',
    updatedAt: '2026-04-05',
  },
  {
    id: 'prod-10',
    sellerId: 'seller-1',
    name: 'Frozen Rainbow Trout',
    species: 'Frozen Rainbow Trout',
    speciesScientific: 'Oncorhynchus mykiss',
    category: 'frozen',
    pricePerKg: 14.00,
    stockKg: 100,
    minOrderKg: 5,
    unit: 'kg',
    images: ['/frozen-rainbow-trout.png'],
    description: 'Quick-frozen rainbow trout for longer storage. Preserves all nutritional value and fresh fish taste.',
    origin: 'Planina, Postojna',
    deliveryRegions: ['Ljubljana', 'Maribor', 'Celje', 'Koper'],
    isPublished: true,
    createdAt: '2024-02-25',
    updatedAt: '2026-04-05',
  },
  {
    id: 'prod-11',
    sellerId: 'seller-5',
    name: 'Juvenile Trout - Live',
    species: 'Young Trout',
    speciesScientific: 'Oncorhynchus mykiss',
    category: 'live',
    pricePerKg: 15.00,
    stockKg: 500,
    minOrderKg: 20,
    unit: 'kg',
    images: ['/juvenile-trout-live.png'],
    description: 'Live juvenile trout for further farming or fishing. Our young fish is healthy and active. Suitable for ponds.',
    origin: 'Radeče',
    deliveryRegions: ['Krško', 'Sevnica', 'Ljubljana'],
    isPublished: true,
    createdAt: '2024-03-10',
    updatedAt: '2026-04-06',
  },
  {
    id: 'prod-12',
    sellerId: 'seller-2',
    name: 'Mediterranean Shrimp - Fresh',
    species: 'Mediterranean Shrimp',
    speciesScientific: 'Parapenaeuslongirostris',
    category: 'fresh',
    pricePerKg: 34.00,
    stockKg: 20,
    minOrderKg: 1,
    unit: 'kg',
    freshnessDate: '2026-04-10',
    images: ['/mediterranean-shrimp.png'],
    description: 'Fresh shrimp from the Adriatic. Our seafood specialties are known for quality and freshness. Perfect for salads.',
    origin: 'Koper',
    deliveryRegions: ['Koper', 'Izola', 'Piran', 'Ljubljana'],
    isPublished: true,
    createdAt: '2024-04-01',
    updatedAt: '2026-04-06',
  },
];

// Mock Orders
export const mockOrders: Order[] = [
  {
    id: 'order-1',
    buyerId: 'user-buyer-1',
    sellerId: 'seller-1',
    items: [
      { productId: 'prod-1', sellerId: 'seller-1', name: 'Rainbow Trout - Fresh', quantityKg: 10, pricePerKg: 18.50 },
      { productId: 'prod-2', sellerId: 'seller-1', name: 'Rainbow Trout - Filleted', quantityKg: 5, pricePerKg: 24.00 },
    ],
    subtotal: 305.00,
    deliveryFee: 15.00,
    total: 320.00,
    status: 'delivered',
    shippingAddress: '15 Main Street, 1000 Ljubljana',
    createdAt: '2026-03-15',
  },
  {
    id: 'order-2',
    buyerId: 'user-buyer-1',
    sellerId: 'seller-2',
    items: [
      { productId: 'prod-3', sellerId: 'seller-2', name: 'Sea Bream - Fresh', quantityKg: 3, pricePerKg: 22.00 },
    ],
    subtotal: 66.00,
    deliveryFee: 12.00,
    total: 78.00,
    status: 'shipped',
    shippingAddress: '15 Main Street, 1000 Ljubljana',
    createdAt: '2026-04-01',
  },
  {
    id: 'order-3',
    buyerId: 'user-buyer-1',
    sellerId: 'seller-1',
    items: [
      { productId: 'prod-9', sellerId: 'seller-1', name: 'Smoked Rainbow Trout', quantityKg: 2, pricePerKg: 28.00 },
    ],
    subtotal: 56.00,
    deliveryFee: 10.00,
    total: 66.00,
    status: 'processing',
    shippingAddress: '15 Main Street, 1000 Ljubljana',
    createdAt: '2026-04-05',
  },
];

// Categories for filtering
export const categories = [
  { id: 'fresh', label: 'Fresh', icon: 'Fish' },
  { id: 'frozen', label: 'Frozen', icon: 'Snowflake' },
  { id: 'smoked', label: 'Smoked', icon: 'Flame' },
  { id: 'live', label: 'Live', icon: 'Heart' },
  { id: 'fillet', label: 'Fillet', icon: 'Knife' },
];

// Delivery regions
export const deliveryRegions = [
  'Ljubljana',
  'Maribor',
  'Celje',
  'Koper',
  'Kranj',
  'Novo mesto',
  'Bled',
  'Postojna',
  'Bohinj',
  'Radeče',
  'Krško',
  'Sevnica',
  'Izola',
  'Piran',
  'Črnomelj',
  'Gorica',
];

// Species options
export const speciesOptions = [
  'Rainbow Trout',
  'Grayling',
  'Brown Trout',
  'Sea Bream',
  'Sea Bass',
  'Common Carp',
  'Wels Catfish',
  'Pikeperch',
  'Mediterranean Shrimp',
  'Juvenile Trout',
];

// Helper functions
export function getSellerById(id: string): Seller | undefined {
  return mockSellers.find(s => s.id === id);
}

export function getProductById(id: string): Product | undefined {
  return mockProducts.find(p => p.id === id);
}

export function getProductsBySeller(sellerId: string): Product[] {
  return mockProducts.filter(p => p.sellerId === sellerId && p.isPublished);
}

export function getFilteredProducts(filters: {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  sellerId?: string;
  inStock?: boolean;
  search?: string;
}): Product[] {
  let filtered = mockProducts.filter(p => p.isPublished);

  if (filters.category) {
    filtered = filtered.filter(p => p.category === filters.category);
  }
  if (filters.minPrice) {
    filtered = filtered.filter(p => p.pricePerKg >= filters.minPrice!);
  }
  if (filters.maxPrice) {
    filtered = filtered.filter(p => p.pricePerKg <= filters.maxPrice!);
  }
  if (filters.sellerId) {
    filtered = filtered.filter(p => p.sellerId === filters.sellerId);
  }
  if (filters.inStock) {
    filtered = filtered.filter(p => p.stockKg > 0);
  }
  if (filters.search) {
    const searchLower = filters.search.toLowerCase();
    filtered = filtered.filter(p => 
      p.name.toLowerCase().includes(searchLower) ||
      p.species.toLowerCase().includes(searchLower) ||
      p.description.toLowerCase().includes(searchLower)
    );
  }

  return filtered;
}