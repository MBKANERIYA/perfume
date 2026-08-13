export default function PromoBanners() {
  return (
    <section className="w-full flex flex-col gap-4 py-8 bg-white max-w-[1600px] mx-auto px-4 md:px-10">
      
      {/* Banner 1 */}
      <div className="w-full h-auto md:h-[250px] lg:h-[300px] relative rounded-md overflow-hidden bg-gradient-to-br from-[#111] to-[#222] flex flex-col md:flex-row items-center group cursor-pointer border border-white/10">
        
        <div className="relative z-10 p-8 md:p-12 w-full md:w-3/5 flex flex-col justify-center text-center md:text-left order-2 md:order-1">
          <h2 className="font-bebas text-5xl md:text-6xl lg:text-7xl text-gold mb-2 tracking-wider drop-shadow-md leading-none">
            FOR YOUR BEST FRIEND
          </h2>
          <p className="font-montserrat text-white/90 text-xs md:text-sm mb-6 tracking-wide max-w-md mx-auto md:mx-0">
            Gift a memory that lasts forever. Explore our luxury collection designed to celebrate the ones you cherish most.
          </p>
          <div>
            <button className="bg-transparent border border-gold text-gold hover:bg-gold hover:text-black transition-all duration-300 font-montserrat font-bold text-[10px] md:text-xs uppercase tracking-[2px] px-6 py-3">
              Shop Gifts
            </button>
          </div>
        </div>

        {/* Floating Image */}
        <div className="w-full md:w-2/5 h-48 md:h-full relative flex items-center justify-center order-1 md:order-2 pt-6 md:pt-0">
          <div className="absolute inset-0 bg-gold/10 blur-3xl rounded-full w-48 h-48 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
          <img 
            src="/images/imperialgold.png" 
            alt="Imperial Gold" 
            className="relative z-10 h-full max-h-[160px] md:max-h-[260px] object-contain drop-shadow-[0_10px_20px_rgba(212,175,55,0.2)] group-hover:scale-110 transition-transform duration-700" 
          />
        </div>
      </div>

      {/* Banner 2 */}
      <div className="w-full h-auto md:h-[250px] lg:h-[300px] relative rounded-md overflow-hidden bg-gradient-to-bl from-[#1a1a1a] to-[#0a0a0a] flex flex-col md:flex-row items-center group cursor-pointer border border-white/10">
        
        {/* Floating Image */}
        <div className="w-full md:w-2/5 h-48 md:h-full relative flex items-center justify-center pt-6 md:pt-0">
          <div className="absolute inset-0 bg-red-900/20 blur-3xl rounded-full w-48 h-48 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
          <img 
            src="/images/creamsonrough.png" 
            alt="Crimson Rouge" 
            className="relative z-10 h-full max-h-[160px] md:max-h-[260px] object-contain drop-shadow-[0_10px_20px_rgba(150,0,0,0.3)] group-hover:scale-110 transition-transform duration-700" 
          />
        </div>

        <div className="relative z-10 p-8 md:p-12 w-full md:w-3/5 flex flex-col justify-center text-center md:text-right items-center md:items-end">
          <h2 className="font-bebas text-5xl md:text-6xl lg:text-7xl text-white mb-2 tracking-wider drop-shadow-md leading-none">
            BUY ANY 3 FOR <span className="text-gold">₹1700</span>
          </h2>
          <p className="font-montserrat text-white/80 text-xs md:text-sm mb-6 tracking-wide max-w-sm mx-auto md:mx-0">
            Mix and match your favorite signature scents. Perfect for building your ultimate fragrance wardrobe.
          </p>
          <div>
            <button className="bg-gold border border-gold text-black hover:bg-transparent hover:text-gold transition-all duration-300 font-montserrat font-bold text-[10px] md:text-xs uppercase tracking-[2px] px-6 py-3">
              Claim Offer
            </button>
          </div>
        </div>
      </div>
      
    </section>
  );
}
