import React, { useState } from 'react';
import OverviewTab from './tabs/OverviewTab';
import ProductsTab from './tabs/ProductsTab';
import OrdersTab from './tabs/OrdersTab';
import { useAuth } from '../../context/AuthContext';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const { user, logout } = useAuth();

  // Simple protection: Check if user exists. 
  // In a real app, we'd check user.role === 'admin'
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 flex-col px-4">
        <h1 className="font-bebas text-4xl mb-4 text-black">ACCESS DENIED</h1>
        <p className="font-montserrat text-gray-500 mb-8">You must be logged in as an administrator to view this page.</p>
        <a href="/" className="bg-black text-white px-8 py-3 font-bebas text-xl hover:bg-gold transition-colors">
          RETURN TO STORE
        </a>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'overview': return <OverviewTab />;
      case 'products': return <ProductsTab />;
      case 'orders': return <OrdersTab />;
      default: return <OverviewTab />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 font-montserrat overflow-hidden">
      
      {/* Sidebar */}
      <aside className="w-64 bg-black text-white flex flex-col shadow-xl z-20 hidden md:flex">
        <div className="p-6 border-b border-gray-800 flex items-center justify-center">
          <span className="font-bebas text-3xl tracking-widest text-gold">KIZ ADMIN</span>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-2">
          <button 
            onClick={() => setActiveTab('overview')}
            className={`w-full text-left px-4 py-3 rounded text-sm font-bold tracking-wider transition-colors flex items-center gap-3 ${activeTab === 'overview' ? 'bg-gold text-black' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
            OVERVIEW
          </button>
          
          <button 
            onClick={() => setActiveTab('products')}
            className={`w-full text-left px-4 py-3 rounded text-sm font-bold tracking-wider transition-colors flex items-center gap-3 ${activeTab === 'products' ? 'bg-gold text-black' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
            PRODUCTS
          </button>

          <button 
            onClick={() => setActiveTab('orders')}
            className={`w-full text-left px-4 py-3 rounded text-sm font-bold tracking-wider transition-colors flex items-center gap-3 ${activeTab === 'orders' ? 'bg-gold text-black' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
            ORDERS
          </button>
        </nav>

        <div className="p-4 border-t border-gray-800">
          <div className="flex items-center gap-3 px-4 py-2">
            <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-gold font-bold">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 truncate">
              <p className="text-sm font-bold text-white truncate">{user?.name}</p>
              <p className="text-xs text-gray-400 truncate">{user?.email}</p>
            </div>
          </div>
          <button 
            onClick={logout}
            className="w-full mt-4 bg-gray-800 hover:bg-red-600 text-white font-bebas text-lg tracking-widest py-2 rounded transition-colors"
          >
            LOGOUT
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        {/* Mobile Header */}
        <div className="md:hidden bg-black text-white p-4 flex items-center justify-between shadow-md z-20">
          <span className="font-bebas text-2xl tracking-widest text-gold">KIZ ADMIN</span>
          <select 
            value={activeTab} 
            onChange={(e) => setActiveTab(e.target.value)}
            className="bg-gray-800 text-white border-none p-2 rounded text-xs font-bold uppercase"
          >
            <option value="overview">Overview</option>
            <option value="products">Products</option>
            <option value="orders">Orders</option>
          </select>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          {renderContent()}
        </div>
      </main>

    </div>
  );
}
