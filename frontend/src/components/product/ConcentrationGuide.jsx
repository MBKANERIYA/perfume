export default function ConcentrationGuide() {
  const guides = [
    { name: "EAU DE COLOGNE", conc: "2-4%", time: "Up to 2 Hours", desc: "Light, fresh and airy. Perfect for a quick daytime refresh.", level: 1 },
    { name: "EAU DE TOILETTE", conc: "5-15%", time: "2-3 Hours", desc: "Crisp and refreshing. Ideal for everyday office or casual wear.", level: 2 },
    { name: "EAU DE PARFUM", conc: "15-20%", time: "4-5 Hours", desc: "Rich and long-lasting. The perfect balance for all day presence.", level: 3 },
    { name: "PARFUM (EXTRAIT)", conc: "20-30%", time: "6-8+ Hours", desc: "Intense and luxurious. A single application lasts beautifully all night.", level: 4, highlight: true }
  ];

  return (
    <section className="w-full bg-[#111] py-16 px-4 md:px-10 flex justify-center text-white relative overflow-hidden">
      {/* Subtle luxury background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 blur-[120px] rounded-full mix-blend-screen pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold/5 blur-[120px] rounded-full mix-blend-screen pointer-events-none"></div>

      <div className="max-w-[1200px] w-full relative z-10 flex flex-col items-center">
        
        <h2 className="font-bebas text-4xl md:text-5xl text-gold mb-2 tracking-widest text-center">
          FRAGRANCE CONCENTRATION GUIDE
        </h2>
        <p className="font-montserrat text-sm md:text-base text-gray-400 mb-12 text-center max-w-2xl">
          Understanding the difference in perfume oils helps you choose the perfect scent intensity and longevity for any occasion. KIZ Perfumes are crafted as premium EXTRAIT DE PARFUM.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
          {guides.map((item, idx) => (
            <div 
              key={idx} 
              className={`flex flex-col p-6 rounded-lg border transition-all duration-300 hover:-translate-y-1 ${
                item.highlight 
                  ? 'bg-gradient-to-br from-gold/20 to-transparent border-gold/50 shadow-[0_0_20px_rgba(212,175,55,0.15)]' 
                  : 'bg-white/5 border-white/10 hover:border-gold/30'
              }`}
            >
              <div className="flex items-end gap-2 mb-4">
                <span className={`font-bebas text-4xl leading-none ${item.highlight ? 'text-gold' : 'text-white'}`}>
                  {item.conc}
                </span>
                <span className="font-montserrat text-xs text-gray-400 mb-0.5 uppercase tracking-wider font-semibold">Oils</span>
              </div>
              
              <h3 className={`font-bebas text-2xl tracking-wide mb-2 ${item.highlight ? 'text-gold' : 'text-gray-200'}`}>
                {item.name}
              </h3>
              
              <div className="flex items-center gap-2 mb-5">
                <svg className={`w-4 h-4 ${item.highlight ? 'text-gold' : 'text-gray-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-montserrat text-xs font-semibold text-gray-300 tracking-wider">
                  {item.time}
                </span>
              </div>

              {/* Intensity Bar */}
              <div className="w-full h-1.5 bg-white/10 rounded-full mb-5 overflow-hidden flex">
                {[1,2,3,4].map(num => (
                  <div 
                    key={num} 
                    className={`h-full flex-1 border-r border-black/50 last:border-r-0 ${
                      num <= item.level ? (item.highlight ? 'bg-gold' : 'bg-white/60') : 'bg-transparent'
                    }`}
                  ></div>
                ))}
              </div>

              <p className="font-montserrat text-xs text-gray-400 leading-relaxed mt-auto">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
