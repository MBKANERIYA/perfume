import React, { useState, useEffect } from 'react';

export default function OrdersTab() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch('/api/orders');
      if (response.ok) {
        const data = await response.json();
        setOrders(data);
      }
    } catch (error) {
      console.error('Failed to fetch orders', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Delivered': return 'bg-green-100 text-green-700';
      case 'Shipped': return 'bg-blue-100 text-blue-700';
      case 'Processing': return 'bg-orange-100 text-orange-700';
      case 'Cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getPaymentBadge = (method, status) => {
    if (status === 'Paid') {
      return <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-[10px] font-bold uppercase ml-2">{method} - Paid</span>;
    }
    return <span className="bg-orange-100 text-orange-700 px-2 py-0.5 rounded text-[10px] font-bold uppercase ml-2">{method} - Pending</span>;
  };

  return (
    <div className="animate-fade-in flex flex-col h-full">
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="mb-4 md:mb-0">
          <h2 className="font-bebas text-3xl tracking-widest text-black mb-1 uppercase">Recent Orders</h2>
          <p className="text-gray-500 text-sm">View and manage customer orders ({orders.length} total)</p>
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
              {loading ? (
                <tr>
                  <td colSpan="7" className="px-6 py-12 text-center text-gray-500 font-montserrat text-sm">
                    Loading orders...
                  </td>
                </tr>
              ) : orders.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-12 text-center text-gray-500 font-montserrat text-sm">
                    No recent orders found.
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr key={order._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <span className="font-bold text-black">{order.orderId}</span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      <div className="font-bold">{order.customer.firstName} {order.customer.lastName}</div>
                      <div className="text-xs text-gray-500">{order.customer.email}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {order.items.reduce((acc, item) => acc + item.quantity, 0)} items
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <span className="font-bebas text-lg text-black">₹{order.totalAmount}</span>
                        {getPaymentBadge(order.paymentMethod, order.paymentStatus)}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${getStatusColor(order.orderStatus)}`}>
                        {order.orderStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => setSelectedOrder(order)}
                        className="text-black font-bold text-xs uppercase tracking-widest hover:text-gold transition-colors whitespace-nowrap"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
            
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <div>
                <h3 className="font-bebas text-2xl tracking-widest text-black">Order {selectedOrder.orderId}</h3>
                <p className="text-xs text-gray-500">{new Date(selectedOrder.createdAt).toLocaleString()}</p>
              </div>
              <button onClick={() => setSelectedOrder(null)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6 overflow-y-auto custom-scrollbar flex-1 space-y-8">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-bold text-xs text-gray-400 uppercase tracking-widest mb-3 border-b border-gray-100 pb-2">Customer Info</h4>
                  <div className="space-y-1 text-sm font-montserrat">
                    <p className="font-bold text-black">{selectedOrder.customer.firstName} {selectedOrder.customer.lastName}</p>
                    <p className="text-gray-600">{selectedOrder.customer.email}</p>
                    <p className="text-gray-600">{selectedOrder.customer.phone}</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-bold text-xs text-gray-400 uppercase tracking-widest mb-3 border-b border-gray-100 pb-2">Shipping Address</h4>
                  <div className="space-y-1 text-sm font-montserrat text-gray-600">
                    <p>{selectedOrder.customer.address}</p>
                    <p>{selectedOrder.customer.city}, {selectedOrder.customer.state}</p>
                    <p>PIN: {selectedOrder.customer.pincode}</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-xs text-gray-400 uppercase tracking-widest mb-3 border-b border-gray-100 pb-2">Order Items</h4>
                <div className="space-y-4">
                  {selectedOrder.items.map((item, index) => (
                    <div key={index} className="flex gap-4 items-center">
                      <div className="w-12 h-12 bg-gray-50 rounded flex items-center justify-center border border-gray-100 overflow-hidden p-1">
                        {item.image ? <img src={item.image} alt={item.title} className="w-full h-full object-contain" /> : <div className="w-full h-full bg-gray-200"></div>}
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-sm text-black">{item.title}</p>
                        <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-bebas text-lg text-black">₹{item.price * item.quantity}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-gray-100 pt-6">
                <div className="flex justify-between items-center">
                  <h4 className="font-bold text-xs text-gray-400 uppercase tracking-widest">Payment Info</h4>
                  <div className="text-right">
                    <p className="text-xs text-gray-500 mb-1">Method: <span className="font-bold text-black">{selectedOrder.paymentMethod}</span></p>
                    {getPaymentBadge(selectedOrder.paymentMethod, selectedOrder.paymentStatus)}
                  </div>
                </div>
              </div>

            </div>

            <div className="p-6 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
              <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${getStatusColor(selectedOrder.orderStatus)}`}>
                {selectedOrder.orderStatus}
              </span>
              <div className="text-right flex items-end gap-3">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Total</span>
                <span className="font-bebas text-3xl tracking-widest text-black">₹{selectedOrder.totalAmount}</span>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
