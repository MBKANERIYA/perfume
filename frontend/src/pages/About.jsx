import React from 'react';

export default function About() {
  return (
    <main className="w-full bg-white font-montserrat">
      {/* Breadcrumb Header */}
      <div className="w-full max-w-[1400px] mx-auto px-6 py-4">
        <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
          HOME <span className="mx-2">/</span> <span className="text-black">ABOUT US</span>
        </div>
      </div>

      {/* Section 1 */}
      <section className="w-full flex flex-col md:flex-row min-h-[600px] border-t border-gray-100">
        
        {/* Left: Text Content */}
        <div className="w-full md:w-1/2 p-10 md:p-16 lg:p-24 flex flex-col justify-center bg-white">
          <h1 className="font-bebas text-5xl md:text-6xl text-gold mb-8 uppercase tracking-wider">
            KIZ PERFUMES
          </h1>
          
          <p className="text-gray-500 text-sm md:text-base italic mb-8">
            "Wear your love, raw and real."
          </p>
          
          <p className="text-black text-sm md:text-base leading-relaxed mb-6 font-medium">
            Love isn't clean. It's messy, raw, and powerful. We are here for every kind of love, the kind that breaks rules, challenges norms, and owns its truth. We don't sugarcoat it. We embrace the passion, the chaos, the quiet moments, and the loud ones.
          </p>
          
          <p className="text-black text-sm md:text-base leading-relaxed font-medium">
            KIZ Perfumes is an Indian fragrance brand creating long-lasting, parfum-grade fragrances made to wear daily, made to gift loudly. It focuses on building premium scent profiles with quality ingredients without any heavy price tags. Because blending in is boring, and every scent should remind you that love is wild, messy, and entirely yours.
          </p>
        </div>

        {/* Right: Image */}
        <div className="w-full md:w-1/2 bg-black flex items-center justify-center p-12 relative overflow-hidden">
          {/* Subtle gradient overlay to match the moody vibe */}
          <div className="absolute inset-0 bg-gradient-to-tr from-gold/20 to-transparent z-0"></div>
          <img 
            src="/images/imperialgold.png" 
            alt="KIZ Imperial Gold" 
            className="relative z-10 w-full max-w-[400px] object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-700"
          />
        </div>

      </section>

      {/* Section 2 */}
      <section className="w-full flex flex-col-reverse md:flex-row min-h-[800px]">
        
        {/* Left: Image */}
        <div className="w-full md:w-1/2 bg-[#111] flex items-center justify-center p-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-gold/10 via-transparent to-black/10 z-0"></div>
          <img 
            src="/images/creamsonrough.png" 
            alt="KIZ Crimson Rouge" 
            className="relative z-10 w-full max-w-[450px] object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-700"
          />
        </div>

        {/* Right: Text Content */}
        <div className="w-full md:w-1/2 p-10 md:p-16 lg:p-20 flex flex-col justify-center bg-white">
          <h2 className="font-bebas text-4xl md:text-5xl text-black mb-10 uppercase tracking-widest">
            PERSONA
          </h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-black font-bold text-sm md:text-base mb-1">Trying to fit in, but why?</h3>
              <p className="text-gray-700 text-sm leading-relaxed">We're not trend followers, we're trend makers. We wreck the norms, we make our own law.</p>
            </div>

            <div>
              <h3 className="text-black font-bold text-sm md:text-base mb-1">We don't give a "damn", when it comes to being part of a crowd.</h3>
              <p className="text-gray-700 text-sm leading-relaxed">Why does it matter at all, when we are the leaders?</p>
            </div>

            <div>
              <h3 className="text-black font-bold text-sm md:text-base mb-1">We're not here for the moment; we're building an empire for tomorrow.</h3>
              <p className="text-gray-700 text-sm leading-relaxed">Who cares about today, when we are the future.</p>
            </div>

            <div>
              <h3 className="text-black font-bold text-sm md:text-base mb-1">We believe in messy love stories.</h3>
              <p className="text-gray-700 text-sm leading-relaxed">Love is not just one definition; it embraces the chaos in every connection.</p>
            </div>

            <div>
              <h3 className="text-black font-bold text-sm md:text-base mb-1">For us, art is freedom.</h3>
              <p className="text-gray-700 text-sm leading-relaxed">Every art starts with love, a love that is free and fierce. Art has its own madness, so does love. We keep it real and wild.</p>
            </div>

            <div>
              <h3 className="text-black font-bold text-sm md:text-base mb-1">We don't try to be perfect.</h3>
              <p className="text-gray-700 text-sm leading-relaxed">No love is perfect, nor you need to be. Wear your flaws like second skin.</p>
            </div>

            <div>
              <h3 className="text-black font-bold text-sm md:text-base mb-1">We mixed essential oils the way you mix memories. Passionately.</h3>
              <p className="text-gray-700 text-sm leading-relaxed">We are not born in a laboratory. Nurtured with no mass formula, just pure creation.</p>
            </div>

            <div className="pt-4 mt-4">
              <p className="text-gray-800 text-sm leading-relaxed font-medium">
                Because every emotion is perfectly imperfect, that's what makes it unforgettable. There's magic in every accidental blend, unscripted memories, and stealing the whole damn show. Isn't it?
              </p>
            </div>
          </div>
          
        </div>

      </section>

    </main>
  );
}
