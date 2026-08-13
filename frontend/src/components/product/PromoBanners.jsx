export default function PromoBanners() {
  return (
    <section className="w-full flex flex-col gap-4 py-8 bg-white max-w-[1600px] mx-auto px-4 md:px-10">
      
      {/* Banner 1 */}
      <div className="w-full h-[320px] md:h-[250px] lg:h-[300px] relative rounded-md overflow-hidden bg-[#111] flex items-center group cursor-pointer">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-40 group-hover:opacity-50 transition-opacity duration-700"
          style={{ backgroundImage: `url('/images/desktop_imperial_gold.png')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
        
        <div className="relative z-10 p-6 md:p-12 max-w-2xl mt-auto md:mt-0">
          <h2 className="font-bebas text-5xl md:text-6xl lg:text-7xl text-gold mb-1 md:mb-2 tracking-wider drop-shadow-md leading-none">
            FOR YOUR BEST FRIEND
          </h2>
          <p className="font-montserrat text-white/90 text-xs md:text-sm mb-4 md:mb-6 tracking-wide max-w-md">
            Gift a memory that lasts forever. Explore our luxury collection designed to celebrate the ones you cherish most.
          </p>
          <button className="bg-transparent border border-gold text-gold hover:bg-gold hover:text-black transition-all duration-300 font-montserrat font-bold text-[10px] md:text-xs uppercase tracking-[2px] px-5 py-2.5">
            Shop Gifts
          </button>
        </div>
      </div>

      {/* Banner 2 */}
      <div className="w-full h-[320px] md:h-[250px] lg:h-[300px] relative rounded-md overflow-hidden bg-[#1a1a1a] flex items-center md:justify-end group cursor-pointer">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-40 group-hover:opacity-50 transition-opacity duration-700"
          style={{ backgroundImage: `url('/images/desktop_crimson_rouge.png')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-l from-black/90 via-black/60 to-transparent" />
        
        <div className="relative z-10 p-6 md:p-12 max-w-2xl text-left md:text-right flex flex-col items-start md:items-end mt-auto md:mt-0">
          <h2 className="font-bebas text-5xl md:text-6xl lg:text-7xl text-white mb-1 md:mb-2 tracking-wider drop-shadow-md leading-none">
            BUY ANY 3 FOR <span className="text-gold">₹1700</span>
          </h2>
          <p className="font-montserrat text-white/80 text-xs md:text-sm mb-4 md:mb-6 tracking-wide max-w-sm">
            Mix and match your favorite signature scents. Perfect for building your ultimate fragrance wardrobe.
          </p>
          <button className="bg-gold border border-gold text-black hover:bg-transparent hover:text-gold transition-all duration-300 font-montserrat font-bold text-[10px] md:text-xs uppercase tracking-[2px] px-5 py-2.5">
            Claim Offer
          </button>
        </div>
      </div>
      
    </section>
  );
}
