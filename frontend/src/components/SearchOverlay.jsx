import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { allProducts } from '../data/products';

export default function SearchOverlay({ isOpen, onClose }) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => document.getElementById('searchInput')?.focus(), 100);
    } else {
      setQuery(''); // reset on close
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const filteredProducts = query.trim() === ''
    ? []
    : allProducts.filter(p => p.title.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="absolute top-full left-0 w-full z-[1000000] bg-white shadow-[0_10px_30px_rgba(0,0,0,0.1)] flex flex-col font-montserrat border-t border-gray-100">

      {/* Search Bar Area */}
      <div className="w-full flex items-center px-4 md:px-10 py-3">
        <svg className="w-5 h-5 text-gray-400 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <circle cx="11" cy="11" r="8" strokeWidth="2" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" strokeWidth="2" />
        </svg>
        <input
          id="searchInput"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a perfume..."
          className="flex-1 text-sm bg-transparent outline-none text-black placeholder-gray-400"
        />
        <button onClick={onClose} className="ml-3 text-gray-400 hover:text-black transition-colors flex-shrink-0">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Results Area */}
      {query.trim().length > 0 && (
        <div className="max-h-[60vh] overflow-y-auto px-4 md:px-10 py-4 bg-gray-50 border-t border-gray-100">

          {filteredProducts.length === 0 && (
            <p className="text-gray-500 font-montserrat text-xs text-center py-4">No products found matching "{query}".</p>
          )}

          {/* Text Suggestions */}
          {filteredProducts.length > 0 && (
            <div className="flex flex-col mb-6">
              {filteredProducts.map(prod => (
                <Link
                  key={`text-${prod.id}`}
                  to={`/product/${prod.slug}`}
                  onClick={onClose}
                  className="py-2.5 font-montserrat text-xs font-semibold text-gray-700 hover:text-gold transition-colors flex items-center gap-2"
                >
                  <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                  {prod.title}
                </Link>
              ))}
            </div>
          )}

          {/* Product Cards */}
          {filteredProducts.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {filteredProducts.map(prod => (
                <Link
                  key={`card-${prod.id}`}
                  to={`/product/${prod.slug}`}
                  onClick={onClose}
                  className="flex flex-col bg-white border border-gray-200 group hover:border-gold transition-colors rounded overflow-hidden"
                >
                  <div className="w-full aspect-square bg-[#f3e7db] p-3 flex items-center justify-center">
                    <img src={prod.image} alt={prod.title} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300" />
                  </div>
                  <div className="p-3 text-center">
                    <h4 className="font-bebas text-sm uppercase tracking-wide m-0 text-black group-hover:text-gold transition-colors truncate">{prod.title}</h4>
                    <p className="font-bebas text-sm mt-0.5 text-gray-600">₹{prod.price}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}

        </div>
      )}
    </div>
  );
}
