const trialSets = [
  {
    id: 1,
    image: '/images/midnightoudh.png',
    title: 'Trial Set - Men',
    subtitle: '100% Redeemable',
    link: '/men'
  },
  {
    id: 2,
    image: '/images/creamsonrough.png',
    title: 'Oud Discovery',
    subtitle: '100% Redeemable',
    link: '/unisex'
  },
  {
    id: 3,
    image: '/images/sanaya.png',
    title: 'Trial Set - Women',
    subtitle: '100% Redeemable',
    link: '/women'
  },
  {
    id: 4,
    image: '/images/silkbloom.png',
    title: '14 Unique Scents',
    subtitle: '100% Redeemable',
    link: '/shop-all'
  }
];

import { Link } from 'react-router-dom';

export default function TrialSetSection() {
  return (
    <section className="w-full bg-white flex flex-col pt-12">
      {/* Section Title */}
      <div className="text-center mb-8 px-4">
        <h2 className="font-bebas text-4xl md:text-[42px] tracking-wide text-black uppercase m-0">
          GAME CHANGER TRIAL SET
        </h2>
      </div>

      {/* Grid container */}
      <div className="w-full px-4 md:px-10 max-w-[1600px] mx-auto mb-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {trialSets.map((item) => (
            <Link
              key={item.id}
              to={`/product/${item.title.toLowerCase().replace(/\s+/g, '-')}`}
              className="flex flex-col items-center group cursor-pointer text-decoration-none"
            >
              {/* Image Container */}
              <div className="w-full aspect-square overflow-hidden mb-4 bg-[#f3e7db]">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Text Info */}
              <div className="text-center px-2 w-full">
                <h3 className="font-bebas text-2xl md:text-[26px] tracking-wide text-black uppercase m-0 group-hover:text-gold transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="font-montserrat text-gold-dark text-[10px] md:text-xs font-bold tracking-wider uppercase mt-1">
                  {item.subtitle}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Scrolling Marquee / Ticker */}
      <div className="w-full bg-black py-2.5 overflow-hidden whitespace-nowrap flex relative">
        <div className="animate-marquee flex gap-4 min-w-full">
          {/* Duplicate content to ensure smooth infinite scrolling */}
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex items-center gap-4 text-white font-bebas text-[17px] tracking-[1.5px] whitespace-nowrap">
              <span>SMELL IT, LOVE IT — OR GET 100% MONEY BACK. REDEEM YOUR DISCOVERY SET COST ON ANY FULL-SIZE BOTTLE.</span>
              <span className="text-gold text-lg">✦</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
