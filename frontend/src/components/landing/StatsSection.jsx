export default function StatsSection() {
  return (
    <section className="w-full bg-[#fcfaf7] py-10 md:py-16">
      <div className="w-full px-4 md:px-10 max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0 md:divide-x divide-gray-200">
          
          {/* Stat 1 */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-5 px-2 md:px-6">
            {/* Custom SVG Icon for People/Chat */}
            <div className="text-gold flex-shrink-0">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 11c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3zm-6 2c-2.21 0-4 1.79-4 4v1h8v-1c0-2.21-1.79-4-4-4zm12 0c-2.21 0-4 1.79-4 4v1h8v-1c0-2.21-1.79-4-4-4z" />
                <path d="M21 2h-6c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h2l3 3v-3h1c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
              </svg>
            </div>
            <div className="flex flex-col text-center md:text-left">
              <h3 className="font-bebas text-4xl md:text-5xl text-gold m-0 tracking-wide">
                15,000+
              </h3>
              <p className="font-montserrat text-black text-sm md:text-base m-0">
                Smelled the difference
              </p>
            </div>
          </div>

          {/* Stat 2 */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-5 px-2 md:px-6">
            {/* Custom SVG Icon for Stars */}
            <div className="text-gold flex-shrink-0 flex flex-col items-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="mb-0.5">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="mt-0.5">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </div>
            <div className="flex flex-col text-center md:text-left">
              <h3 className="font-bebas text-4xl md:text-5xl text-gold m-0 tracking-wide">
                9/10
              </h3>
              <p className="font-montserrat text-black text-sm md:text-base m-0">
                Rating given by real users
              </p>
            </div>
          </div>

          {/* Stat 3 */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-5 px-2 md:px-6">
            {/* Custom SVG Icon for Perfume Bottle with Heart */}
            <div className="text-gold flex-shrink-0">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18 10h-2V6h2V4H6v2h2v4H6v10h12V10zM12 18.5c-1.88 0-3.5-1.57-3.5-3.5 0-2.22 3.5-6.5 3.5-6.5s3.5 4.28 3.5 6.5c0 1.93-1.62 3.5-3.5 3.5zm0-1.25c-1.1 0-2-.9-2-2 0-1.42 2-3.8 2-3.8s2 2.38 2 3.8c0 1.1-.9 2-2 2z"/>
                {/* Overlaying solid heart in the center of bottle */}
                <path d="M12 17.2c-1.38 0-2.5-1.12-2.5-2.5 0-1.58 2.5-4.64 2.5-4.64s2.5 3.06 2.5 4.64c0 1.38-1.12 2.5-2.5 2.5z" />
              </svg>
            </div>
            <div className="flex flex-col text-center md:text-left">
              <h3 className="font-bebas text-4xl md:text-5xl text-gold m-0 tracking-wide">
                8/10
              </h3>
              <p className="font-montserrat text-black text-sm md:text-base m-0">
                Found perfect scent in first try
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
