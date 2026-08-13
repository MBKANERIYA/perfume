const steps = [
  {
    number: '1',
    title: 'Buy Game Changer Set',
    description: 'Purchase our trial set & explore our premium fragrances.'
  },
  {
    number: '2',
    title: 'Fall in love',
    description: 'Find your signature scent from our curated collection.'
  },
  {
    number: '3',
    title: 'Redeem full value',
    description: 'Apply 100% of your trial cost toward any 100ml bottle*.'
  },
  {
    number: '4',
    title: '100% Refund No Questions Asked*',
    description: 'Simply email at support@blabliblulife.com within 48 hours of delivery. Valid on website orders only. Refund applies to one trial pack per customer and credited to your account after reverse pickup from your address.'
  }
];

export default function RiskFreeSection() {
  return (
    <section className="w-full bg-gradient-to-r from-[#000000] via-[#1a1a1a] to-[#000000] py-16 text-white border-y border-gold/20">
      <div className="w-full px-4 md:px-10 max-w-[1600px] mx-auto">
        
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-8">
          
          {/* Left Column: CTA */}
          <div className="lg:w-1/4 flex flex-col items-start justify-center pr-4">
            <h2 className="font-bebas text-4xl md:text-5xl lg:text-[44px] leading-[1.1] tracking-wide uppercase mb-6 text-white">
              TRY OUR FRAGRANCES<br/>RISK FREE
            </h2>
            
            <a 
              href="/collections/trial-set" 
              className="bg-gold hover:bg-gold-light text-black font-montserrat font-bold text-sm uppercase tracking-widest py-3 px-10 transition-colors duration-300 inline-block mb-3"
            >
              TRY NOW
            </a>
            
            <p className="font-montserrat text-white/60 text-[10px] uppercase tracking-wider">
              *T&C Applied
            </p>
          </div>

          {/* Right Columns: Steps Grid */}
          <div className="lg:w-3/4 grid grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col items-start">
                {/* Step Number Circle */}
                <div className="w-9 h-9 rounded-full border border-gold flex items-center justify-center mb-5 group-hover:bg-gold transition-colors duration-300">
                  <span className="font-montserrat text-gold text-sm font-semibold group-hover:text-black">
                    {step.number}
                  </span>
                </div>
                
                {/* Title */}
                <h3 className="font-montserrat text-lg md:text-[19px] font-bold text-white mb-3 leading-tight pr-4">
                  {step.title}
                </h3>
                
                {/* Description */}
                <p className="font-montserrat text-white/80 text-[13px] md:text-sm leading-relaxed pr-2">
                  {step.description}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
