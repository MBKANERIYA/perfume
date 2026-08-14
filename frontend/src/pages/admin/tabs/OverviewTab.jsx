import React, { useState, useEffect } from 'react';

export default function OverviewTab() {
  const [productCount, setProductCount] = useState(0);
  const [orders, setOrders] = useState([]);
  const [usersCount, setUsersCount] = useState(0);

  useEffect(() => {
    // Fetch Products
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setProductCount(data.length);
      })
      .catch(err => console.error('Error fetching products count', err));

    // Fetch Orders
    fetch('/api/orders')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setOrders(data);
      })
      .catch(err => console.error('Error fetching orders', err));

    // Fetch Users
    fetch('/api/auth/users')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setUsersCount(data.length);
      })
      .catch(err => console.error('Error fetching users count', err));
  }, []);

  const totalRevenue = orders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);

  const stats = [
    { title: 'Total Revenue', value: `₹${totalRevenue.toLocaleString()}`, trend: 'Live DB', isUp: true },
    { title: 'Total Orders', value: orders.length.toString(), trend: 'Live DB', isUp: true },
    { title: 'Active Users', value: usersCount.toString(), trend: 'Live DB', isUp: true },
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

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="font-bebas text-xl tracking-widest text-black mb-6 border-b border-gray-100 pb-4">Recent Activity</h3>
        <div className="space-y-6">
          {orders.length === 0 ? (
            <div className="py-4 text-center text-sm text-gray-400 font-montserrat">
              No recent activity found.
            </div>
          ) : (
            orders.slice(0, 5).map((order) => (
              <div key={order._id} className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center">
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-black">New Order {order.orderId}</p>
                    <p className="text-xs text-gray-500">{order.customer.firstName} {order.customer.lastName}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bebas text-lg text-gold">₹{order.totalAmount}</p>
                  <p className="text-xs text-gray-400">
                    {new Date(order.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
