import { useState } from 'react';

const mockReviews = [
  {
    id: 1,
    name: 'Rohan Mehta',
    date: '06/17/2026',
    rating: 5,
    text: 'The smell feels very premium and expensive. Hard to believe it comes at this price.',
  },
  {
    id: 2,
    name: 'Priya Nair',
    date: '06/17/2026',
    rating: 5,
    text: 'The fragrance stayed on me for the whole day without fading. Really happy with how long it lasts.',
  },
  {
    id: 3,
    name: 'Aarav Sharma',
    date: '06/17/2026',
    rating: 5,
    text: 'This perfume smells really rich and bold. I got so many compliments on the very first day I wore it.',
  },
  {
    id: 4,
    name: 'Sneha Kapoor',
    date: '05/17/2026',
    rating: 5,
    text: 'It smells like a luxury perfume you would find in a big mall store. Very impressive.',
  },
  {
    id: 5,
    name: 'Vikram Joshi',
    date: '06/17/2026',
    rating: 5,
    text: 'The scent is strong but not too heavy. It gives a very confident and clean feeling.',
  }
];

export default function CustomerReviews() {
  const [sortOption, setSortOption] = useState('Most Recent');

  // Star Rating Helper
  const renderStars = (rating) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg key={star} className={`w-4 h-4 ${star <= rating ? 'text-gold' : 'text-gray-200'}`} fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  };

  return (
    <section className="w-full bg-white py-16 px-4 md:px-10 border-t border-gray-100">
      <div className="max-w-[1200px] mx-auto flex flex-col">
        
        {/* Header */}
        <h2 className="font-bebas text-3xl md:text-4xl text-black m-0 tracking-wide uppercase text-center mb-10">
          CUSTOMER REVIEWS
        </h2>

        {/* Summary Block */}
        <div className="flex flex-col md:flex-row items-center justify-between border-b border-gray-200 pb-10 mb-8 gap-8">
          
          {/* Average Rating */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left w-full md:w-1/3">
            <div className="mb-2">
              {renderStars(5)}
            </div>
            <h3 className="font-bebas text-5xl md:text-6xl text-black m-0 tracking-widest leading-none">
              4.65 OUT OF 5
            </h3>
            <p className="font-montserrat text-sm text-gray-500 mt-2">
              Based on 254 reviews
            </p>
          </div>

          {/* Rating Distribution Bars */}
          <div className="flex flex-col gap-2 w-full md:w-1/3 border-l border-r border-gray-100 md:px-8">
            {[
              { stars: 5, count: 164, percent: 64 },
              { stars: 4, count: 90, percent: 36 },
              { stars: 3, count: 0, percent: 0 },
              { stars: 2, count: 0, percent: 0 },
              { stars: 1, count: 0, percent: 0 },
            ].map((bar) => (
              <div key={bar.stars} className="flex items-center gap-3">
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <svg key={s} className={`w-3 h-3 ${s <= bar.stars ? 'text-gold' : 'text-transparent'}`} stroke="currentColor" strokeWidth={s <= bar.stars ? '0' : '1'} fill="currentColor" viewBox="0 0 20 20">
                      <path stroke={s <= bar.stars ? 'none' : '#ccc'} d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <div className="flex-1 h-2.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-black" style={{ width: `${bar.percent}%` }}></div>
                </div>
                <span className="font-montserrat text-xs text-gray-500 w-6">{bar.count}</span>
              </div>
            ))}
          </div>

          {/* Write a Review Button */}
          <div className="flex justify-center md:justify-end w-full md:w-1/3">
            <button className="bg-black text-white hover:bg-gold hover:text-black transition-colors duration-300 font-bebas text-lg md:text-xl tracking-widest py-3 px-8 uppercase w-full md:w-auto">
              WRITE A REVIEW
            </button>
          </div>

        </div>

        {/* Sort Dropdown */}
        <div className="flex justify-start mb-6">
          <button className="flex items-center gap-2 text-gold font-montserrat text-xs font-semibold hover:text-black transition-colors">
            {sortOption}
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
          </button>
        </div>

        {/* Review List */}
        <div className="flex flex-col">
          {mockReviews.map((review) => (
            <div key={review.id} className="py-6 border-b border-gray-100 flex flex-col group">
              <div className="flex justify-between items-start mb-3">
                <div className="flex flex-col gap-2">
                  {renderStars(review.rating)}
                  <div className="flex items-center gap-2 text-gold">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span className="font-montserrat text-sm font-semibold">{review.name}</span>
                  </div>
                </div>
                <span className="font-montserrat text-xs text-gray-400">{review.date}</span>
              </div>
              <p className="font-montserrat text-sm text-gray-700 leading-relaxed mt-2">
                {review.text}
              </p>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-4 mt-10 font-montserrat text-sm">
          <span className="font-bold text-black cursor-pointer">1</span>
          <span className="text-gray-400 hover:text-gold transition-colors cursor-pointer">2</span>
          <span className="text-gray-400 hover:text-gold transition-colors cursor-pointer">3</span>
          <span className="text-gold cursor-pointer hover:text-black transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
          </span>
          <span className="text-gold cursor-pointer hover:text-black transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5l7 7-7 7M5 5l7 7-7 7" /></svg>
          </span>
        </div>

      </div>
    </section>
  );
}
