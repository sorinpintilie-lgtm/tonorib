'use client';

import Link from 'next/link';
import { ShoppingCart, MapPin, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { Product, Seller, getSellerById } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product, quantity: number) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const seller = getSellerById(product.sellerId);
  const isInStock = product.stockKg > 0;
  const isLowStock = product.stockKg > 0 && product.stockKg < 20;

  // Format freshness date
  const getFreshnessStatus = () => {
    if (!product.freshnessDate) return null;
    const freshness = new Date(product.freshnessDate);
    const today = new Date();
    const daysDiff = Math.floor((freshness.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysDiff < 0) return { label: 'Expired', class: 'badge-stock', icon: AlertCircle };
    if (daysDiff <= 1) return { label: 'Fresh Today', class: 'badge-fresh', icon: Clock };
    if (daysDiff <= 3) return { label: 'Fresh', class: 'badge-fresh', icon: Clock };
    return null;
  };

  const freshnessStatus = getFreshnessStatus();

  return (
    <div className="card card-hover overflow-hidden group">
      {/* Image Container */}
      <Link href={`/product/${product.id}`} className="block relative aspect-[4/3] overflow-hidden bg-seafoam">
        <img
          src={product.images[0] || 'https://images.unsplash.com/photo-1580476262798-b7d767ce8521?w=800'}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          {/* Freshness Badge */}
          {freshnessStatus && (
            <span className={`badge ${freshnessStatus.class} flex items-center gap-1`}>
              <freshnessStatus.icon className="w-3 h-3" />
              {freshnessStatus.label}
            </span>
          )}
          
          {/* Stock Badge */}
          {isInStock && (
            <span className={`badge ${isLowStock ? 'bg-coral-50 text-coral border border-coral-200' : 'badge-fresh'}`}>
              {isLowStock ? 'Low Stock' : 'In Stock'}
            </span>
          )}
          {!isInStock && (
            <span className="badge badge-stock">Out of Stock</span>
          )}
        </div>
      </Link>

      {/* Content */}
      <div className="p-4">
        {/* Species & Farm */}
        <Link href={`/product/${product.id}`} className="block">
          <h3 className="font-manrope font-semibold text-lg text-slate mb-1 group-hover:text-ocean transition-colors line-clamp-1">
            {product.name}
          </h3>
        </Link>
        
        <p className="text-sm text-slate-500 mb-2">{product.species}</p>
        
        {/* Seller */}
        {seller && (
          <Link href={`/supplier/${seller.id}`} className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-teal mb-3">
            {seller.verified && <CheckCircle className="w-3.5 h-3.5 text-teal" />}
            <span className="line-clamp-1">{seller.farmName}</span>
          </Link>
        )}

        {/* Delivery Info */}
        <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-3">
          <MapPin className="w-3 h-3" />
          <span className="line-clamp-1">
            {product.deliveryRegions.slice(0, 2).join(', ')}
            {product.deliveryRegions.length > 2 && ` +${product.deliveryRegions.length - 2}`}
          </span>
        </div>

        {/* Price & CTA */}
        <div className="flex items-end justify-between gap-2">
          <div>
            <p className="text-xs text-slate-400">Price</p>
            <p className="font-manrope font-bold text-xl text-coral">
              €{product.pricePerKg.toFixed(2)}
              <span className="text-sm font-normal text-slate-500">/kg</span>
            </p>
            {product.minOrderKg > 1 && (
              <p className="text-xs text-slate-400">Min. Order: {product.minOrderKg} kg</p>
            )}
          </div>
          
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onAddToCart?.(product, product.minOrderKg)}
            disabled={!isInStock}
            className="flex items-center gap-1.5"
          >
            <ShoppingCart className="w-4 h-4" />
            <span className="hidden sm:inline">Add</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
