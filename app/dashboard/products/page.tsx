'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Package, Plus, Search, Trash2, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/auth';
import { deleteProduct, fetchProducts, fetchSellerByOwnerId } from '@/lib/firebase-data';
import { Product } from '@/lib/types';
import { categories } from '@/lib/constants';

export default function ProductsPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  const load = async () => {
    if (!user || user.role !== 'seller') return;
    const seller = await fetchSellerByOwnerId(user.uid);
    if (!seller) return;
    const rows = await fetchProducts({ sellerId: seller.id });
    setProducts(rows);
  };

  useEffect(() => {
    if (!loading && (!user || user.role !== 'seller')) router.push('/login');
  }, [user, loading, router]);

  useEffect(() => { load(); }, [user]);

  const filteredProducts = useMemo(() => products.filter((p) => {
    const matchesSearch = !searchQuery || p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.species.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !categoryFilter || p.category === categoryFilter;
    return matchesSearch && matchesCategory;
  }), [products, searchQuery, categoryFilter]);

  if (!user || user.role !== 'seller') return null;

  return (
    <div className="p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8"><div><h1 className="font-manrope font-bold text-2xl text-slate mb-1">My Products</h1><p className="text-slate-500">Manage your products and inventory</p></div><Link href="/dashboard/products/add"><Button variant="coral" className="flex items-center gap-2"><Plus className="w-4 h-4" />Add Product</Button></Link></div>
      <div className="card mb-6"><div className="p-4 flex flex-col sm:flex-row gap-4"><div className="relative flex-1"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-silver-400" /><input type="text" placeholder="Search products..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-2 bg-white border border-silver rounded-input text-sm" /></div><select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="px-4 py-2 bg-white border border-silver rounded-input text-sm min-w-[180px]"><option value="">All categories</option>{categories.map((category) => <option key={category.id} value={category.id}>{category.label}</option>)}</select></div></div>
      <div className="card overflow-hidden"><div className="overflow-x-auto"><table className="w-full"><thead className="bg-seafoam"><tr><th className="px-5 py-4 text-left text-xs font-semibold text-slate uppercase">Product</th><th className="px-5 py-4 text-left text-xs font-semibold text-slate uppercase">Category</th><th className="px-5 py-4 text-left text-xs font-semibold text-slate uppercase">Price/kg</th><th className="px-5 py-4 text-left text-xs font-semibold text-slate uppercase">Stock</th><th className="px-5 py-4 text-left text-xs font-semibold text-slate uppercase">Status</th><th className="px-5 py-4 text-right text-xs font-semibold text-slate uppercase">Actions</th></tr></thead><tbody className="divide-y divide-silver/50">{filteredProducts.map((product) => <tr key={product.id} className="hover:bg-seafoam/50"><td className="px-5 py-4"><div className="flex items-center gap-3"><div className="w-12 h-12 rounded-lg bg-seafoam overflow-hidden flex-shrink-0">{product.images[0] && <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />}</div><div><p className="font-medium text-slate">{product.name}</p><p className="text-sm text-slate-500">{product.species}</p></div></div></td><td className="px-5 py-4">{product.category}</td><td className="px-5 py-4"><span className="font-semibold text-slate">€{product.pricePerKg.toFixed(2)}</span></td><td className="px-5 py-4"><span className={`font-medium ${product.stockKg < 20 ? 'text-coral' : 'text-slate'}`}>{product.stockKg} kg</span></td><td className="px-5 py-4">{product.isPublished ? <span className="badge badge-fresh">Published</span> : <span className="badge badge-stock">Draft</span>}</td><td className="px-5 py-4"><div className="flex items-center justify-end gap-2"><Link href={`/product/${product.id}`} target="_blank"><button className="p-2 text-slate-400 hover:text-ocean"><Eye className="w-4 h-4" /></button></Link><button onClick={async () => { await deleteProduct(product.id); load(); }} className="p-2 text-slate-400 hover:text-coral"><Trash2 className="w-4 h-4" /></button></div></td></tr>)}</tbody></table></div>{filteredProducts.length === 0 && <div className="p-12 text-center"><Package className="w-12 h-12 text-silver mx-auto mb-4" /><h3 className="font-semibold text-slate mb-2">No products</h3><p className="text-slate-500 mb-4">No products match your search.</p><Link href="/dashboard/products/add"><Button variant="primary">Add first product</Button></Link></div>}</div>
    </div>
  );
}
