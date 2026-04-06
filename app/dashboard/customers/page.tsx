'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Users, Search, Mail, Phone, MapPin, MoreVertical, Star } from 'lucide-react';

const mockCustomers = [
  { id: '1', name: 'Janez Novak', email: 'janez@example.com', phone: '+386 40 123 456', orders: 12, spent: '€1,240', location: 'Ljubljana', lastOrder: '2026-04-05' },
  { id: '2', name: 'Maja Kovač', email: 'maja@example.com', phone: '+386 41 234 567', orders: 8, spent: '€890', location: 'Maribor', lastOrder: '2026-04-03' },
  { id: '3', name: 'Petra Horvat', email: 'petra@example.com', phone: '+386 51 345 678', orders: 5, spent: '€520', location: 'Celje', lastOrder: '2026-03-28' },
  { id: '4', name: 'Marko Zupan', email: 'marko@example.com', phone: '+386 30 456 789', orders: 15, spent: '€1,890', location: 'Koper', lastOrder: '2026-04-01' },
  { id: '5', name: 'Ana Mlinar', email: 'ana@example.com', phone: '+386 70 567 890', orders: 3, spent: '€280', location: 'Novo mesto', lastOrder: '2026-03-15' },
];

export default function CustomersPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCustomers = mockCustomers.filter(c => 
    !searchQuery || 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-manrope font-bold text-2xl text-slate mb-1">Customers</h1>
        <p className="text-slate-500">View your customers and their activity</p>
      </div>

      {/* Search */}
      <div className="card mb-6">
        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-silver-400" />
            <input
              type="text"
              placeholder="Search customers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-silver rounded-input text-sm"
            />
          </div>
        </div>
      </div>

      {/* Customers Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-seafoam">
              <tr>
                <th className="px-5 py-4 text-left text-xs font-semibold text-slate uppercase">Customer</th>
                <th className="px-5 py-4 text-left text-xs font-semibold text-slate uppercase">Contact</th>
                <th className="px-5 py-4 text-left text-xs font-semibold text-slate uppercase">Orders</th>
                <th className="px-5 py-4 text-left text-xs font-semibold text-slate uppercase">Total Spent</th>
                <th className="px-5 py-4 text-left text-xs font-semibold text-slate uppercase">Location</th>
                <th className="px-5 py-4 text-left text-xs font-semibold text-slate uppercase">Last Order</th>
                <th className="px-5 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-silver/50">
              {filteredCustomers.map((customer) => (
                <tr key={customer.id} className="hover:bg-seafoam/50">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-ocean flex items-center justify-center">
                        <span className="text-white font-medium">{customer.name.charAt(0)}</span>
                      </div>
                      <span className="font-medium text-slate">{customer.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="text-sm">
                      <p className="text-slate-600">{customer.email}</p>
                      <p className="text-slate-400">{customer.phone}</p>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className="font-medium text-slate">{customer.orders}</span>
                  </td>
                  <td className="px-5 py-4">
                    <span className="font-semibold text-fresh">{customer.spent}</span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1 text-sm text-slate-500">
                      <MapPin className="w-3.5 h-3.5" />
                      {customer.location}
                    </div>
                  </td>
                  <td className="px-5 py-4 text-sm text-slate-500">
                    {new Date(customer.lastOrder).toLocaleDateString('en-GB')}
                  </td>
                  <td className="px-5 py-4">
                    <button className="p-2 text-slate-400 hover:text-ocean transition-colors">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}