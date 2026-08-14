import React, { useState, useEffect } from 'react';

export default function OverviewTab() {
  const [productCount, setProductCount] = useState(0);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setProductCount(data.length);
        }
      })
      .catch(err => console.error('Error fetching products count', err));
  }, []);

  const stats = [
    { title: 'Total Revenue', value: '₹0', trend: '0%', isUp: true },
    { title: 'Total Orders', value: '0', trend: '0%', isUp: true },
    { title: 'Active Users', value: '0', trend: '0%', isUp: false },
    { title: 'Total Products', value: productCount.toString(), trend: 'Live DB', isUp: true },
  ];

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h2 className="font-bebas text-3xl tracking-widest text-black mb-2 uppercase">Dashboard Overview</h2>
        <p className="text-gray-500 text-sm">Welcome back to the KIZ Admin panel. Here's what's happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col">
            <span className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-2">{stat.title}</span>
            <span className="font-bebas text-4xl text-black mb-2">{stat.value}</span>
            <span className={`text-xs font-bold ${stat.neutral ? 'text-orange-500' : stat.isUp ? 'text-green-500' : 'text-red-500'}`}>
              {stat.trend}
            </span>
          </div>
        ))}
      </div>

      {/* Recent Activity (Mock) */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="font-bebas text-xl tracking-widest text-black mb-6 border-b border-gray-100 pb-4">Recent Activity</h3>
        <div className="space-y-6">
          {/* Empty state when no activity */}
          <div className="py-4 text-center text-sm text-gray-400 font-montserrat">
            No recent activity found.
          </div>
        </div>
      </div>
    </div>
  );
}
