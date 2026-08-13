import { useState } from 'react';

export default function FilterSidebar({ isOpen, onClose, filters, setFilters, onApply }) {
  // Accordion state
  const [openSections, setOpenSections] = useState({
    price: true,
    gender: true,
  });

  const toggleSection = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handleGenderChange = (gender) => {
    setFilters((prev) => {
      const newGenders = prev.gender.includes(gender)
        ? prev.gender.filter((g) => g !== gender)
        : [...prev.gender, gender];
      return { ...prev, gender: newGenders };
    });
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-[100000] transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div 
        className={`fixed top-0 left-0 w-[320px] max-w-[85vw] h-screen bg-white z-[100001] shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.25,0.8,0.25,1)] flex flex-col ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <h2 className="font-bebas text-2xl tracking-widest m-0 uppercase">FILTER</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-black transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-5 font-montserrat">
          
          {/* PRICE */}
          <div className="mb-6 border-b border-gray-100 pb-4">
            <button 
              onClick={() => toggleSection('price')}
              className="w-full flex items-center justify-between font-bebas text-lg tracking-wider uppercase mb-3"
            >
              PRICE
              <svg className={`w-4 h-4 transition-transform duration-300 ${openSections.price ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
            </button>
            
            <div className={`overflow-hidden transition-all duration-300 ${openSections.price ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
              <div className="flex items-center gap-4 mt-2">
                <div className="flex flex-col w-full">
                  <label className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">From</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-xs">₹</span>
                    <input 
                      type="number" 
                      value={filters.minPrice}
                      onChange={(e) => setFilters({...filters, minPrice: Number(e.target.value)})}
                      className="w-full border border-gray-300 rounded-none py-2 pl-7 pr-3 text-xs outline-none focus:border-black transition-colors"
                    />
                  </div>
                </div>
                <div className="flex flex-col w-full">
                  <label className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">To</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-xs">₹</span>
                    <input 
                      type="number" 
                      value={filters.maxPrice}
                      onChange={(e) => setFilters({...filters, maxPrice: Number(e.target.value)})}
                      className="w-full border border-gray-300 rounded-none py-2 pl-7 pr-3 text-xs outline-none focus:border-black transition-colors"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* GENDER CATEGORIES */}
          <div className="mb-6 border-b border-gray-100 pb-4">
            <button 
              onClick={() => toggleSection('gender')}
              className="w-full flex items-center justify-between font-bebas text-lg tracking-wider uppercase mb-3"
            >
              GENDER CATEGORIES
              <svg className={`w-4 h-4 transition-transform duration-300 ${openSections.gender ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
            </button>
            
            <div className={`flex flex-col gap-3 overflow-hidden transition-all duration-300 ${openSections.gender ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
              {['For Women', 'For Men', 'Unisex'].map((gender) => (
                <label key={gender} className="flex items-center gap-3 cursor-pointer group">
                  <input 
                    type="checkbox" 
                    className="w-4 h-4 accent-black cursor-pointer"
                    checked={filters.gender.includes(gender)}
                    onChange={() => handleGenderChange(gender)}
                  />
                  <span className="text-xs uppercase tracking-widest text-gray-700 group-hover:text-black transition-colors">
                    {gender.replace('For ', '')}
                  </span>
                </label>
              ))}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-5 border-t border-gray-100">
          <button 
            onClick={() => {
              onApply();
              onClose();
            }}
            className="w-full bg-black text-white hover:bg-gold hover:text-black font-montserrat font-bold text-sm uppercase tracking-[2px] py-4 transition-colors duration-300"
          >
            APPLY
          </button>
        </div>

      </div>
    </>
  );
}
