import React from 'react';

export default function OrdersTab() {
  const orders = [
    { id: '#1042', customer: 'Maulik Kaneriya', date: '2026-08-13', total: '₹2,498', status: 'Processing', items: 2 },
    { id: '#1041', customer: 'Sarah Smith', date: '2026-08-13', total: '₹1,299', status: 'Processing', items: 1 },
    { id: '#1040', customer: 'John Doe', date: '2026-08-12', total: '₹3,098', status: 'Shipped', items: 3 },
    { id: '#1039', customer: 'Emily Chen', date: '2026-08-11', total: '₹1,599', status: 'Delivered', items: 1 },
    { id: '#1038', customer: 'Michael Ross', date: '2026-08-10', total: '₹2,598', status: 'Delivered', items: 2 },
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'Delivered': return 'bg-green-100 text-green-700';
      case 'Shipped': return 'bg-blue-100 text-blue-700';
      case 'Processing': return 'bg-orange-100 text-orange-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="animate-fade-in flex flex-col h-full">
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="mb-4 md:mb-0">
          <h2 className="font-bebas text-3xl tracking-widest text-black mb-1 uppercase">Recent Orders</h2>
          <p className="text-gray-500 text-sm">View and manage customer orders</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex-1 flex flex-col">
        <div className="overflow-x-auto flex-1 custom-scrollbar">
          <table className="w-full text-left border-collapse min-w-[800px] md:min-w-0">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 font-montserrat text-xs text-gray-500 uppercase tracking-widest">
                <th className="px-6 py-4 font-bold">Order ID</th>
                <th className="px-6 py-4 font-bold">Customer</th>
                <th className="px-6 py-4 font-bold">Date</th>
                <th className="px-6 py-4 font-bold">Items</th>
                <th className="px-6 py-4 font-bold">Total</th>
                <th className="px-6 py-4 font-bold">Status</th>
                <th className="px-6 py-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <span className="font-bold text-black">{order.id}</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">{order.customer}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{order.date}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{order.items} items</td>
                  <td className="px-6 py-4">
                    <span className="font-bebas text-lg text-black">{order.total}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-black font-bold text-xs uppercase tracking-widest hover:text-gold transition-colors whitespace-nowrap">
                      View Details
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
