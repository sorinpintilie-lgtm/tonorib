'use client';

import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import { CartItem } from './types';

interface CartContextType {
  items: CartItem[];
  addItem: (productId: string, quantityKg: number) => void;
  updateItem: (productId: string, quantityKg: number) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
  itemsCount: number;
}

const STORAGE_KEY = 'tonorib_cart';
const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    try {
      setItems(JSON.parse(raw));
    } catch {
      setItems([]);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = (productId: string, quantityKg: number) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.productId === productId);
      if (existing) {
        return prev.map((item) => item.productId === productId ? { ...item, quantityKg: item.quantityKg + quantityKg } : item);
      }
      return [...prev, { productId, quantityKg }];
    });
  };

  const updateItem = (productId: string, quantityKg: number) => {
    setItems((prev) => quantityKg <= 0
      ? prev.filter((item) => item.productId !== productId)
      : prev.map((item) => item.productId === productId ? { ...item, quantityKg } : item));
  };

  const removeItem = (productId: string) => setItems((prev) => prev.filter((item) => item.productId !== productId));
  const clearCart = () => setItems([]);

  const value = useMemo(() => ({
    items,
    addItem,
    updateItem,
    removeItem,
    clearCart,
    itemsCount: items.reduce((sum, item) => sum + item.quantityKg, 0),
  }), [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
}
