import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const REVIEWS_PER_PAGE = 5;

const sortOptions = [
  { label: 'Most Recent', value: 'newest' },
  { label: 'Oldest First', value: 'oldest' },
  { label: 'Highest Rated', value: 'highest' },
  { label: 'Lowest Rated', value: 'lowest' },
];

export default function CustomerReviews() {
  const { id: productSlug } = useParams();
  const [reviews, setReviews] = useState([]);
  const [stats, setStats] = useState({ total: 0, average: 0, distribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 } });
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sort, setSort] = useState('newest');
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', rating: 5, title: '', text: '' });
  const [formError, setFormError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Fetch reviews
  useEffect(() => {
    if (!productSlug) return;
    fetch(`/api/reviews/${productSlug}?page=${page}&limit=${REVIEWS_PER_PAGE}&sort=${sort}`)
      .then(res => res.json())
      .then(data => {
        setReviews(data.reviews || []);
        setStats(data.stats || { total: 0, average: 0, distribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 } });
        setTotalPages(data.pagination?.totalPages || 1);
      })
      .catch(() => {});
  }, [productSlug, page, sort]);

  // Submit review
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    if (!formData.name || !formData.email || !formData.text) {
      setFormError('Please fill in all required fields.');
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch(`/api/reviews/${productSlug}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || 'Failed to submit');
      }
      setSuccessMsg('Thank you! Your review has been submitted.');
      setFormData({ name: '', email: '', rating: 5, title: '', text: '' });
      setShowForm(false);
      setPage(1);
      setSort('newest');
      // Re-fetch
      const data = await fetch(`/api/reviews/${productSlug}?page=1&limit=${REVIEWS_PER_PAGE}&sort=newest`).then(r => r.json());
      setReviews(data.reviews || []);
      setStats(data.stats || stats);
      setTotalPages(data.pagination?.totalPages || 1);
      setTimeout(() => setSuccessMsg(''), 4000);
    } catch (err) {
      setFormError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  // Star Rating Helper
  const renderStars = (rating, size = 'w-4 h-4') => (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg key={star} className={`${size} ${star <= rating ? 'text-gold' : 'text-gray-200'}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );

  // Interactive star picker
  const StarPicker = () => (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => setFormData({ ...formData, rating: star })}
          className="focus:outline-none"
        >
          <svg className={`w-8 h-8 transition-colors ${star <= formData.rating ? 'text-gold' : 'text-gray-300 hover:text-gold/60'}`} fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </button>
      ))}
    </div>
  );

  const totalReviews = stats.total;
  const dist = stats.distribution || {};

  return (
    <section className="w-full bg-white py-16 px-4 md:px-10 border-t border-gray-100">
      <div className="max-w-[1200px] mx-auto flex flex-col">
        
        {/* Header */}
        <h2 className="font-bebas text-3xl md:text-4xl text-black m-0 tracking-wide uppercase text-center mb-10">
          CUSTOMER REVIEWS
        </h2>

        {/* Success Message */}
        {successMsg && (
          <div className="bg-green-50 border border-green-200 text-green-800 font-montserrat text-sm px-6 py-4 rounded-md mb-6 text-center">
            {successMsg}
          </div>
        )}

        {/* Summary Block */}
        <div className="flex flex-col md:flex-row items-center justify-between border-b border-gray-200 pb-10 mb-8 gap-8">
          
          {/* Average Rating */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left w-full md:w-1/3">
            <div className="mb-2">
              {renderStars(Math.round(stats.average))}
            </div>
            <h3 className="font-bebas text-5xl md:text-6xl text-black m-0 tracking-widest leading-none">
              {stats.average > 0 ? stats.average : '0'} OUT OF 5
            </h3>
            <p className="font-montserrat text-sm text-gray-500 mt-2">
              Based on {totalReviews} review{totalReviews !== 1 ? 's' : ''}
            </p>
          </div>

          {/* Rating Distribution Bars */}
          <div className="flex flex-col gap-2 w-full md:w-1/3 border-l border-r border-gray-100 md:px-8">
            {[5, 4, 3, 2, 1].map((stars) => {
              const count = dist[stars] || 0;
              const percent = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
              return (
                <div key={stars} className="flex items-center gap-3">
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <svg key={s} className={`w-3 h-3 ${s <= stars ? 'text-gold' : 'text-transparent'}`} stroke="currentColor" strokeWidth={s <= stars ? '0' : '1'} fill="currentColor" viewBox="0 0 20 20">
                        <path stroke={s <= stars ? 'none' : '#ccc'} d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <div className="flex-1 h-2.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-black transition-all duration-500" style={{ width: `${percent}%` }}></div>
                  </div>
                  <span className="font-montserrat text-xs text-gray-500 w-6">{count}</span>
                </div>
              );
            })}
          </div>

          {/* Write a Review Button */}
          <div className="flex justify-center md:justify-end w-full md:w-1/3">
            <button 
              onClick={() => { setShowForm(!showForm); setFormError(''); }}
              className="bg-black text-white hover:bg-gold hover:text-black transition-colors duration-300 font-bebas text-lg md:text-xl tracking-widest py-3 px-8 uppercase w-full md:w-auto"
            >
              {showForm ? 'CANCEL' : 'WRITE A REVIEW'}
            </button>
          </div>

        </div>

        {/* Review Form */}
        {showForm && (
          <form onSubmit={handleSubmit} className="border border-gray-200 rounded-lg p-6 md:p-8 mb-10 bg-gray-50">
            <h3 className="font-bebas text-2xl tracking-wider mb-6 text-black">WRITE YOUR REVIEW</h3>
            
            {formError && (
              <div className="bg-red-50 border border-red-200 text-red-700 font-montserrat text-sm px-4 py-3 rounded mb-4">
                {formError}
              </div>
            )}

            {/* Rating */}
            <div className="mb-5">
              <label className="font-montserrat text-sm font-semibold text-gray-700 block mb-2">Rating *</label>
              <StarPicker />
            </div>

            {/* Name & Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
              <div>
                <label className="font-montserrat text-sm font-semibold text-gray-700 block mb-2">Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full border border-gray-300 px-4 py-3 font-montserrat text-sm focus:outline-none focus:border-gold transition-colors rounded"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="font-montserrat text-sm font-semibold text-gray-700 block mb-2">Email *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full border border-gray-300 px-4 py-3 font-montserrat text-sm focus:outline-none focus:border-gold transition-colors rounded"
                  placeholder="Your email (not displayed publicly)"
                />
              </div>
            </div>

            {/* Review Title */}
            <div className="mb-5">
              <label className="font-montserrat text-sm font-semibold text-gray-700 block mb-2">Review Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full border border-gray-300 px-4 py-3 font-montserrat text-sm focus:outline-none focus:border-gold transition-colors rounded"
                placeholder="Summarize your experience"
              />
            </div>

            {/* Review Text */}
            <div className="mb-6">
              <label className="font-montserrat text-sm font-semibold text-gray-700 block mb-2">Your Review *</label>
              <textarea
                value={formData.text}
                onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                className="w-full border border-gray-300 px-4 py-3 font-montserrat text-sm focus:outline-none focus:border-gold transition-colors rounded resize-none"
                rows={4}
                placeholder="Tell us about your experience with this perfume..."
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="bg-gold text-black hover:bg-black hover:text-white transition-colors duration-300 font-bebas text-xl tracking-widest py-3 px-10 uppercase disabled:opacity-50"
            >
              {submitting ? 'SUBMITTING...' : 'SUBMIT REVIEW'}
            </button>
          </form>
        )}

        {/* Sort Dropdown */}
        <div className="flex justify-start mb-6 relative">
          <button 
            onClick={() => setShowSortMenu(!showSortMenu)}
            className="flex items-center gap-2 text-gold font-montserrat text-xs font-semibold hover:text-black transition-colors"
          >
            {sortOptions.find(s => s.value === sort)?.label}
            <svg className={`w-3 h-3 transition-transform ${showSortMenu ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
          </button>
          {showSortMenu && (
            <div className="absolute top-8 left-0 bg-white border border-gray-200 shadow-lg rounded-md py-1 z-20 min-w-[160px]">
              {sortOptions.map(opt => (
                <button
                  key={opt.value}
                  onClick={() => { setSort(opt.value); setPage(1); setShowSortMenu(false); }}
                  className={`block w-full text-left px-4 py-2 font-montserrat text-xs hover:bg-gray-50 transition-colors ${sort === opt.value ? 'text-gold font-bold' : 'text-gray-700'}`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Review List */}
        <div className="flex flex-col">
          {reviews.length === 0 && (
            <div className="py-12 text-center">
              <p className="font-montserrat text-gray-400 text-sm">No reviews yet. Be the first to review this product!</p>
            </div>
          )}
          {reviews.map((review) => (
            <div key={review._id} className="py-6 border-b border-gray-100 flex flex-col group">
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
                <span className="font-montserrat text-xs text-gray-400">
                  {new Date(review.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                </span>
              </div>
              {review.title && (
                <h4 className="font-montserrat text-sm font-bold text-black mb-1">{review.title}</h4>
              )}
              <p className="font-montserrat text-sm text-gray-700 leading-relaxed mt-1">
                {review.text}
              </p>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-3 mt-10 font-montserrat text-sm">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="text-gold cursor-pointer hover:text-black transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`w-8 h-8 flex items-center justify-center rounded transition-colors ${page === p ? 'font-bold text-black bg-gold/10' : 'text-gray-400 hover:text-gold'}`}
              >
                {p}
              </button>
            ))}
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="text-gold cursor-pointer hover:text-black transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
