import { useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import ProductCard from '../../components/ProductCard';
import FilterSidebar from './FilterSidebar';
import { getProductsByCategory, allProducts } from '../../data/products';

export default function Collection() {
  const location = useLocation();
  
  // Extract category from URL
  const path = location.pathname.substring(1) || 'shop-all';
  const categoryId = path === '' ? 'shop-all' : path.replace('/', '-');

  // Fetch initial products
  // User requested all 13 products to show on all category pages
  let baseProducts = allProducts;

  const title = categoryId.replace(/-/g, ' ').toUpperCase();

  // Filter & Sort State
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortOption, setSortOption] = useState('featured');
  const [filters, setFilters] = useState({
    minPrice: 0,
    maxPrice: 3000,
    gender: [],
  });

  // Apply Filters & Sorting
  const filteredAndSortedProducts = useMemo(() => {
    let result = [...baseProducts];

    // Price Filter
    result = result.filter(p => p.price >= filters.minPrice && p.price <= filters.maxPrice);

    // Gender Filter
    if (filters.gender.length > 0) {
      result = result.filter(p => {
        // If product tags include any of the selected genders
        return filters.gender.some(g => p.tags.includes(`For ${g}`) || p.tags.includes(g));
      });
    }

    // Sorting
    if (sortOption === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [baseProducts, filters, sortOption]);

  return (
    <main className="min-h-screen bg-white flex flex-col">
      
      {/* Top Image Banner */}
      <div className="w-full h-[200px] md:h-[300px] lg:h-[400px] relative overflow-hidden bg-[#fdfaf5]">
        <img 
          src="https://placehold.co/1920x400/e6d7c3/111111?text=FOR+YOUR+FIRST+BEST+FRIEND+-+UPTO+40%25+OFF" 
          alt="Collection Promotional Banner" 
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Collection Content */}
      <div className="max-w-[1600px] mx-auto w-full px-4 md:px-10 py-10">
        
        {/* Breadcrumbs & Title */}
        <div className="flex flex-col mb-6">
          <div className="flex items-center gap-2 font-montserrat text-[10px] font-bold text-gray-400 tracking-widest uppercase mb-4">
            <span className="hover:text-gold cursor-pointer transition-colors">HOME</span>
            <span>&gt;</span>
            <span className="text-black">{title}</span>
          </div>
          <h1 className="font-bebas text-4xl tracking-widest text-black m-0 uppercase">
            {title}
          </h1>
        </div>

        {/* Toolbar (Filter & Sort) */}
        <div className="flex flex-wrap items-center justify-between py-4 border-t border-b border-gray-100 mb-8 font-montserrat text-xs font-bold tracking-widest uppercase">
          
          <button 
            onClick={() => setIsFilterOpen(true)}
            className="flex items-center gap-2 text-black hover:text-gold transition-colors py-2"
          >
            FILTER 
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
          </button>

          <div className="flex items-center gap-4">
            <span className="text-gray-400 hidden md:inline">{filteredAndSortedProducts.length} PRODUCTS</span>
            <div className="relative group">
              <button className="flex items-center gap-2 text-black hover:text-gold transition-colors py-2">
                SORT 
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
              </button>
              
              {/* Sort Dropdown Hover */}
              <div className="absolute right-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                <div className="bg-white border border-gray-100 shadow-xl min-w-[200px] py-2 flex flex-col">
                  <button onClick={() => setSortOption('featured')} className={`text-left px-4 py-2 hover:bg-gray-50 transition-colors ${sortOption === 'featured' ? 'text-gold' : 'text-gray-600'}`}>Featured</button>
                  <button onClick={() => setSortOption('price-low')} className={`text-left px-4 py-2 hover:bg-gray-50 transition-colors ${sortOption === 'price-low' ? 'text-gold' : 'text-gray-600'}`}>Price: Low to High</button>
                  <button onClick={() => setSortOption('price-high')} className={`text-left px-4 py-2 hover:bg-gray-50 transition-colors ${sortOption === 'price-high' ? 'text-gold' : 'text-gray-600'}`}>Price: High to Low</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {filteredAndSortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Empty State */}
        {filteredAndSortedProducts.length === 0 && (
          <div className="w-full py-20 flex flex-col items-center justify-center text-center">
            <h3 className="font-bebas text-3xl text-gray-400">NO PRODUCTS FOUND</h3>
            <p className="font-montserrat text-gray-500 mt-2">Try adjusting your filters.</p>
            <button onClick={() => setFilters({minPrice: 0, maxPrice: 3000, gender: []})} className="mt-6 border border-black px-6 py-2 text-xs font-bold tracking-widest uppercase hover:bg-black hover:text-white transition-colors">
              CLEAR FILTERS
            </button>
          </div>
        )}

      </div>

      {/* Filter Sidebar Component */}
      <FilterSidebar 
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        filters={filters}
        setFilters={setFilters}
        onApply={() => setIsFilterOpen(false)}
      />

    </main>
  );
}
