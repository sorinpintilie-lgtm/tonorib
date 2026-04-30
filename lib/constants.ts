import { ProductCategory } from './types';

export const categories: { id: ProductCategory; label: string }[] = [
  { id: 'fresh', label: 'Fresh' },
  { id: 'frozen', label: 'Frozen' },
  { id: 'smoked', label: 'Smoked' },
  { id: 'live', label: 'Live' },
  { id: 'fillet', label: 'Fillet' },
];

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

export const forumCategories = [
  'Fish Farming',
  'Market & Sales',
  'Regulations & Compliance',
  'Technology & Equipment',
  'General Discussion',
];

export const classifiedCategories = [
  'Equipment',
  'Services',
  'Jobs',
  'Vehicles',
  'Feed & Supplies',
  'Consulting',
];

export const productSeedImages: Record<string, string> = {
  trout: '/rainbow-trout-fresh.png',
  seaBream: '/sea-bream.png',
  seaBass: '/sea-bass-fresh.png',
  grayling: '/grayling-fresh.png',
  carp: '/carp-fresh.png',
};
