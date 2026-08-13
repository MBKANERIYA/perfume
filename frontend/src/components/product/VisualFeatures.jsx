export default function VisualFeatures() {
  return (
    <section className="w-full flex flex-col">
      
      {/* Feature 1: Cocktail / Breathless (Black & Gold Theme) */}
      <div className="w-full bg-black py-20 px-4 md:px-10 flex items-center justify-center relative overflow-hidden min-h-[400px] md:min-h-[500px]">
        <div className="max-w-[1200px] w-full flex flex-col md:flex-row items-center relative z-10">
          
          {/* Left Side: Cocktail Image Placeholder */}
          <div className="w-full md:w-1/2 flex justify-center md:justify-start mb-10 md:mb-0">
            <div className="w-64 h-64 md:w-[400px] md:h-[400px] bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm border border-gold/30">
               <span className="font-montserrat text-gold tracking-widest text-sm uppercase">Cocktail Image</span>
            </div>
          </div>
          
          {/* Right Side: Text */}
          <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left">
            <h2 className="font-bebas text-5xl md:text-7xl text-white m-0 leading-none tracking-wide mb-6 uppercase">
              LOVE THAT LEAVES<br/>
              <span className="text-gold">YOU BREATHLESS.</span>
            </h2>
            <div className="h-[2px] w-32 bg-gold mb-4"></div>
            <p className="font-montserrat text-gray-300 text-sm md:text-base tracking-widest uppercase">
              INTOXICATING CONCENTRATION
            </p>
          </div>
        </div>
      </div>

      {/* Feature 2: Ingredients Highlight */}
      <div className="w-full bg-[#f3e7db] py-20 px-4 md:px-10 flex items-center justify-center">
        <div className="max-w-[1200px] w-full flex flex-col md:flex-row items-center gap-10">
          
          {/* Left Side: Text Block */}
          <div className="w-full md:w-1/3 flex justify-center md:justify-end">
            <div className="bg-white py-6 px-10 shadow-lg text-center transform -rotate-2">
              <span className="font-montserrat text-xs text-gray-500 uppercase tracking-widest block mb-2">NOTES</span>
              <h3 className="font-bebas text-3xl md:text-4xl text-black m-0 leading-tight tracking-wider uppercase">
                CANDIED NUTS,<br/>
                CINNAMON, DATES
              </h3>
            </div>
          </div>

          {/* Right Side: Ingredients Scattering Placeholder */}
          <div className="w-full md:w-2/3 h-[300px] md:h-[400px] relative flex justify-center items-center">
            {/* Main Bottle */}
            <div className="w-32 h-48 md:w-48 md:h-64 bg-white shadow-xl z-10 flex items-center justify-center transform rotate-12">
               <span className="font-montserrat text-xs text-black uppercase">Bottle</span>
            </div>
            {/* Scattered elements placeholders */}
            <div className="absolute top-10 left-10 w-16 h-16 rounded-full bg-[#d4af37]/40 backdrop-blur-sm"></div>
            <div className="absolute bottom-10 right-20 w-20 h-20 rounded-full bg-[#d4af37]/60 backdrop-blur-sm"></div>
            <div className="absolute top-20 right-10 w-12 h-12 rounded-full bg-[#d4af37]/30 backdrop-blur-sm"></div>
          </div>
        </div>
      </div>

      {/* Feature 3: The Puzzle */}
      <div className="w-full bg-[#1a1a1a] py-20 px-4 md:px-10 flex items-center justify-center relative overflow-hidden min-h-[400px]">
        {/* Placeholder for the large puzzle graphic background */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold to-black"></div>
        
        <div className="max-w-[1200px] w-full flex justify-center relative z-10">
           <div className="w-[300px] h-[300px] md:w-[500px] md:h-[300px] border-4 border-gold/50 bg-black/50 backdrop-blur-md flex items-center justify-center transform -rotate-12 shadow-2xl shadow-gold/20">
              <span className="font-bebas text-3xl text-gold tracking-widest">PUZZLE BOTTLE SHOT</span>
           </div>
        </div>
      </div>

    </section>
  );
}
