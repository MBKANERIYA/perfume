import { useState } from 'react';
import ProductCard from '../ProductCard';

const bestsellers = [
  {
    id: 1,
    title: 'ROYAL OUDH',
    price: 1599,
    originalPrice: 2099,
    discount: 'SAVE ₹500',
    rating: 4.8,
    reviews: 215,
    tag: 'NEW IN',
    image: '/images/royaloudh.png',
    slug: 'royal-oudh',
    features: [
      { id: 'long-lasting', label: 'Long Lasting' },
      { id: 'woody', label: 'Woody' }
    ]
  },
  {
    id: 2,
    title: 'VELVET LAVENDER',
    price: 1199,
    originalPrice: 1699,
    discount: 'SAVE ₹500',
    rating: 4.9,
    reviews: 180,
    tag: 'BESTSELLER',
    image: '/images/velvetlavender.png',
    slug: 'velvet-lavender',
    features: [
      { id: 'floral', label: 'Floral' },
      { id: 'fresh', label: 'Fresh' }
    ]
  },
  {
    id: 3,
    title: 'MAJESTIC MUSK',
    price: 1399,
    originalPrice: 1899,
    discount: 'SAVE ₹500',
    rating: 4.7,
    reviews: 320,
    tag: 'BESTSELLER',
    image: '/images/majesticmusk.png',
    slug: 'majestic-musk',
    features: [
      { id: 'musk', label: 'Musk' },
      { id: 'unisex', label: 'Unisex' }
    ]
  },
  {
    id: 4,
    title: 'AQUA FROST',
    price: 1299,
    originalPrice: 1799,
    discount: 'SAVE ₹500',
    rating: 4.6,
    reviews: 145,
    image: '/images/aquafrost.png',
    slug: 'aqua-frost',
    features: [
      { id: 'aquatic', label: 'Aquatic' },
      { id: 'fresh', label: 'Fresh' }
    ]
  }
];

export default function BestsellerSection() {
  const [activeTab, setActiveTab] = useState('bestseller');

  return (
    <section className="w-full bg-white py-16">
      {/* Tabs Header */}
      <div className="flex justify-center items-center gap-4 mb-10 px-4">
        <button 
          onClick={() => setActiveTab('bestseller')}
          className={`font-bebas text-3xl md:text-4xl tracking-wide uppercase transition-colors duration-300 ${activeTab === 'bestseller' ? 'text-gold' : 'text-black hover:text-gold-dark'}`}
        >
          BESTSELLER
        </button>
        <span className="text-gray-300 text-3xl font-light">|</span>
        <button 
          onClick={() => setActiveTab('new-arrivals')}
          className={`font-bebas text-3xl md:text-4xl tracking-wide uppercase transition-colors duration-300 ${activeTab === 'new-arrivals' ? 'text-gold' : 'text-black hover:text-gold-dark'}`}
        >
          NEW ARRIVALS
        </button>
      </div>

      {/* Product Grid */}
      <div className="w-full px-4 md:px-10 max-w-[1600px] mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
          {bestsellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
