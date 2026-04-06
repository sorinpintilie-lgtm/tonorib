'use client';

import { useState } from 'react';
import { TrendingUp, TrendingDown, DollarSign, ShoppingBag, Package, Users, Eye, ArrowUp, ArrowDown } from 'lucide-react';

const mockAnalytics = {
  totalRevenue: 3240,
  revenueChange: 12,
  ordersCount: 28,
  ordersChange: 8,
  productsCount: 12,
  customersCount: 156,
  customersChange: 5,
  pageViews: 1240,
  pageViewsChange: 15,
};

const revenueByMonth = [
  { month: 'Jan', value: 280 },
  { month: 'Feb', value: 320 },
  { month: 'Mar', value: 290 },
  { month: 'Apr', value: 350 },
];

const topProducts = [
  { name: 'Rainbow Trout - Fresh', orders: 45, revenue: 832 },
  { name: 'Rainbow Trout - Filleted', orders: 32, revenue: 768 },
  { name: 'Sea Bream - Fresh', orders: 28, revenue: 616 },
  { name: 'Smoked Rainbow Trout', orders: 21, revenue: 588 },
];

const topRegions = [
  { region: 'Ljubljana', orders: 85 },
  { region: 'Maribor', orders: 42 },
  { region: 'Celje', orders: 28 },
  { region: 'Koper', orders: 18 },
];

export default function AnalyticsPage() {
  const [period, setPeriod] = useState('month');

  const stats = [
    {
      label: 'Total Revenue',
      value: `€${mockAnalytics.totalRevenue.toLocaleString()}`,
      change: `+${mockAnalytics.revenueChange}%`,
      positive: true,
      icon: DollarSign,
    },
    {
      label: 'Orders',
      value: mockAnalytics.ordersCount.toString(),
      change: `+${mockAnalytics.ordersChange}%`,
      positive: true,
      icon: ShoppingBag,
    },
    {
      label: 'Customers',
      value: mockAnalytics.customersCount.toString(),
      change: `+${mockAnalytics.customersChange}%`,
      positive: true,
      icon: Users,
    },
    {
      label: 'Page Views',
      value: mockAnalytics.pageViews.toLocaleString(),
      change: `+${mockAnalytics.pageViewsChange}%`,
      positive: true,
      icon: Eye,
    },
  ];

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="font-manrope font-bold text-2xl text-slate mb-1">Analytics</h1>
          <p className="text-slate-500">View your sales performance</p>
        </div>
        <select
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
          className="px-4 py-2 bg-white border border-silver rounded-button text-sm"
        >
          <option value="week">This week</option>
          <option value="month">This month</option>
          <option value="quarter">This quarter</option>
          <option value="year">This year</option>
        </select>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className="card p-5">
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 rounded-full bg-seafoam flex items-center justify-center">
                <stat.icon className="w-5 h-5 text-ocean" />
              </div>
              <div className={`flex items-center gap-1 text-sm ${stat.positive ? 'text-fresh' : 'text-coral'}`}>
                {stat.positive ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                {stat.change}
              </div>
            </div>
            <p className="text-slate-500 text-sm">{stat.label}</p>
            <p className="font-manrope font-bold text-2xl text-slate">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        {/* Revenue Chart */}
        <div className="card">
          <div className="p-5 border-b border-silver/50">
            <h2 className="font-manrope font-semibold text-lg text-slate">Sales by Month</h2>
          </div>
          <div className="p-5">
            <div className="flex items-end gap-2 h-48">
              {revenueByMonth.map((item) => {
                const maxValue = Math.max(...revenueByMonth.map(m => m.value));
                const height = (item.value / maxValue) * 100;
                return (
                  <div key={item.month} className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full bg-ocean/20 rounded-t-md relative" style={{ height: '100%' }}>
                      <div
                        className="absolute bottom-0 left-0 right-0 bg-ocean rounded-t-md transition-all"
                        style={{ height: `${height}%` }}
                      />
                    </div>
                    <span className="text-xs text-slate-500">{item.month}</span>
                    <span className="text-xs font-medium text-slate">€{item.value}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Top Products */}
        <div className="card">
          <div className="p-5 border-b border-silver/50">
            <h2 className="font-manrope font-semibold text-lg text-slate">Top Selling Products</h2>
          </div>
          <div className="divide-y divide-silver/50">
            {topProducts.map((product, index) => (
              <div key={product.name} className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-ocean/10 text-ocean text-sm font-medium flex items-center justify-center">
                    {index + 1}
                  </span>
                  <span className="text-slate">{product.name}</span>
                </div>
                <div className="text-right">
                  <p className="font-medium text-slate">€{product.revenue}</p>
                  <p className="text-xs text-slate-500">{product.orders} orders</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Regions */}
      <div className="card">
        <div className="p-5 border-b border-silver/50">
          <h2 className="font-manrope font-semibold text-lg text-slate">Orders by Region</h2>
        </div>
        <div className="p-5">
          <div className="space-y-4">
            {topRegions.map((item) => {
              const maxOrders = Math.max(...topRegions.map(r => r.orders));
              const percentage = (item.orders / maxOrders) * 100;
              return (
                <div key={item.region}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate">{item.region}</span>
                    <span className="text-slate-500">{item.orders} orders</span>
                  </div>
                  <div className="h-2 bg-seafoam rounded-full overflow-hidden">
                    <div
                      className="h-full bg-ocean rounded-full"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}