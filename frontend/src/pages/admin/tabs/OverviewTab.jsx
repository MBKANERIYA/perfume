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
    { title: 'Total Revenue', value: '₹1,24,500', trend: '+12.5%', isUp: true },
    { title: 'Total Orders', value: '456', trend: '+5.2%', isUp: true },
    { title: 'Active Users', value: '1,204', trend: '-2.1%', isUp: false },
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
          {[
            { action: 'New Order #1042', user: 'Maulik Kaneriya', time: '10 mins ago', amount: '₹2,498' },
            { action: 'New User Registered', user: 'johndoe@example.com', time: '1 hour ago', amount: null },
            { action: 'Order #1040 Shipped', user: 'System', time: '3 hours ago', amount: null },
            { action: 'New Order #1041', user: 'Sarah Smith', time: '5 hours ago', amount: '₹1,299' },
          ].map((activity, i) => (
            <div key={i} className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center">
                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                </div>
                <div>
                  <p className="text-sm font-bold text-black">{activity.action}</p>
                  <p className="text-xs text-gray-500">{activity.user}</p>
                </div>
              </div>
              <div className="text-right">
                {activity.amount && <p className="font-bebas text-lg text-gold">{activity.amount}</p>}
                <p className="text-xs text-gray-400">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
