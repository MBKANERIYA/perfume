import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const { user, updateProfile, logout } = useAuth();
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || ''
  });
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  useEffect(() => {
    if (!user) {
      navigate('/');
      return;
    }

    // Fetch user's orders
    fetch(`/api/orders/my-orders?email=${user.email}`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setOrders(data);
        }
      })
      .catch(err => console.error('Error fetching orders:', err))
      .finally(() => setLoadingOrders(false));
  }, [user, navigate]);

  if (!user) return null;

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveMessage('');
    try {
      await updateProfile(formData.name, formData.phone);
      setSaveMessage('Profile updated successfully!');
      setTimeout(() => setSaveMessage(''), 3000);
    } catch (error) {
      setSaveMessage('Failed to update profile.');
    } finally {
      setIsSaving(false);
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

  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-20 px-4 md:px-8 font-montserrat animate-fade-in">
      <div className="max-w-6xl mx-auto">
        <h1 className="font-bebas text-4xl tracking-widest text-black mb-8 border-b border-gray-200 pb-4">MY ACCOUNT</h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Left Column: Profile Form */}
          <div className="w-full lg:w-1/3 space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h2 className="font-bebas text-2xl tracking-widest mb-6">PROFILE DETAILS</h2>
              
              <form onSubmit={handleUpdateProfile} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Email (Read Only)</label>
                  <input type="email" value={user.email} disabled className="w-full bg-gray-50 border border-gray-200 p-3 rounded text-sm text-gray-500 cursor-not-allowed" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Full Name</label>
                  <input type="text" name="name" required value={formData.name} onChange={handleInputChange} className="w-full border border-gray-300 p-3 rounded text-sm focus:border-gold focus:outline-none transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Phone Number</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full border border-gray-300 p-3 rounded text-sm focus:border-gold focus:outline-none transition-colors" />
                </div>
                
                <button type="submit" disabled={isSaving} className="w-full bg-black hover:bg-gold text-white font-bebas text-lg tracking-widest uppercase py-3 rounded transition-colors mt-4">
                  {isSaving ? 'SAVING...' : 'UPDATE PROFILE'}
                </button>
                {saveMessage && <p className={`text-center text-xs font-bold mt-2 ${saveMessage.includes('success') ? 'text-green-600' : 'text-red-600'}`}>{saveMessage}</p>}
              </form>
            </div>
            
            <button onClick={() => { logout(); navigate('/'); }} className="w-full border border-red-200 text-red-600 hover:bg-red-50 font-bebas text-lg tracking-widest uppercase py-3 rounded transition-colors">
              LOGOUT
            </button>
          </div>

          {/* Right Column: Order History */}
          <div className="w-full lg:w-2/3">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h2 className="font-bebas text-2xl tracking-widest mb-6 border-b border-gray-100 pb-4">MY ORDERS</h2>
              
              <div className="space-y-6">
                {loadingOrders ? (
                  <p className="text-center text-gray-500 py-8 text-sm">Loading orders...</p>
                ) : orders.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-gray-500 mb-4">You haven't placed any orders yet.</p>
                    <button onClick={() => navigate('/shop-all')} className="bg-black text-white font-bebas tracking-widest px-6 py-2 rounded hover:bg-gold transition-colors">
                      START SHOPPING
                    </button>
                  </div>
                ) : (
                  orders.map(order => (
                    <div key={order._id} className="border border-gray-200 rounded-lg p-4 hover:border-gold transition-colors duration-300">
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4 border-b border-gray-100 pb-4">
                        <div>
                          <p className="font-bold text-black text-sm">Order {order.orderId}</p>
                          <p className="text-xs text-gray-500">{new Date(order.createdAt).toLocaleString()}</p>
                        </div>
                        <div className="text-right flex items-center gap-3">
                          <span className="font-bebas text-xl text-black">₹{order.totalAmount}</span>
                          <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${getStatusColor(order.orderStatus)}`}>
                            {order.orderStatus}
                          </span>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gray-50 rounded flex items-center justify-center p-1 border border-gray-100">
                              <img src={item.image} alt={item.title} className="w-full h-full object-contain" />
                            </div>
                            <div className="flex-1">
                              <p className="font-bold text-sm text-black line-clamp-1">{item.title}</p>
                              <p className="text-xs text-gray-500">Qty: {item.quantity} • ₹{item.price}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center text-xs text-gray-500">
                        <span>Payment: <strong className="text-black uppercase">{order.paymentMethod}</strong> ({order.paymentStatus})</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
