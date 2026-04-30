import { Product } from './types';

// Temporary product seed data only.
// Kept intentionally as the one allowed mock domain while the rest of the platform uses Firebase.
export const productSeedData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>[] = [
  {
    sellerId: 'seed-seller',
    name: 'Rainbow Trout - Fresh',
    species: 'Rainbow Trout',
    speciesScientific: 'Oncorhynchus mykiss',
    category: 'fresh',
    pricePerKg: 18.5,
    stockKg: 150,
    minOrderKg: 5,
    unit: 'kg',
    freshnessDate: '2026-05-10T00:00:00.000Z',
    images: ['/rainbow-trout-fresh.png'],
    description: 'Seed product for initial catalog setup.',
    origin: 'Slovenia',
    deliveryRegions: ['Ljubljana', 'Maribor'],
    isPublished: true,
  },
  {
    sellerId: 'seed-seller',
    name: 'Sea Bream - Fresh',
    species: 'Gilthead Seabream',
    speciesScientific: 'Sparus aurata',
    category: 'fresh',
    pricePerKg: 22,
    stockKg: 60,
    minOrderKg: 3,
    unit: 'kg',
    freshnessDate: '2026-05-09T00:00:00.000Z',
    images: ['/sea-bream.png'],
    description: 'Seed product for initial catalog setup.',
    origin: 'Croatia',
    deliveryRegions: ['Koper', 'Ljubljana'],
    isPublished: true,
  },
];
