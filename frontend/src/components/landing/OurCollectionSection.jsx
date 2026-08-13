import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import { Link } from 'react-router-dom';

const collections = [
  {
    id: 1,
    title: 'IMPERIAL GOLD',
    price: '₹1499',
    image: '/images/imperialgold.png',
    link: '/product/imperial-gold'
  },
  {
    id: 2,
    title: 'ROYAL OUDH',
    price: '₹1599',
    image: '/images/royaloudh.png',
    link: '/product/royal-oudh'
  },
  {
    id: 3,
    title: 'CRIMSON ROUGE',
    price: '₹1299',
    image: '/images/creamsonrough.png',
    link: '/product/crimson-rouge'
  },
  {
    id: 4,
    title: 'FOR MEN',
    price: 'EXPLORE MASCULINE SCENTS',
    image: '/images/midnightoudh.png',
    link: '/men'
  },
  {
    id: 5,
    title: 'FOR WOMEN',
    price: 'EXPLORE FEMININE SCENTS',
    image: '/images/velvetlavender.png',
    link: '/women'
  },
  {
    id: 6,
    title: 'UNISEX',
    price: 'EXPLORE NEUTRAL SCENTS',
    image: '/images/majesticmusk.png',
    link: '/unisex'
  }
];

export default function OurCollectionSection() {
  return (
    <section className="w-full bg-white pt-10 pb-16 md:py-16">
      {/* Section Title */}
      <div className="text-center mb-10 px-4">
        <h2 className="font-bebas text-4xl md:text-[42px] tracking-wide text-black uppercase m-0">
          OUR COLLECTION
        </h2>
      </div>

      {/* Collection Carousel */}
      <div className="w-full px-4 md:px-10 max-w-[1600px] mx-auto relative group">
        <Swiper
          modules={[Navigation]}
          navigation={{
            nextEl: '.collection-next',
            prevEl: '.collection-prev',
          }}
          spaceBetween={16}
          slidesPerView={2}
          breakpoints={{
            640: { slidesPerView: 3, spaceBetween: 20 },
            960: { slidesPerView: 4, spaceBetween: 24 },
            1280: { slidesPerView: 5, spaceBetween: 24 },
            1500: { slidesPerView: 6, spaceBetween: 24 },
          }}
          className="pb-4"
        >
          {collections.map((item) => (
            <SwiperSlide key={item.id} className="h-auto flex">
              <div className="flex flex-col w-full border border-gray-100 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-300 h-full group/card bg-white">
                {/* Image Container */}
                <Link to={item.link} className="w-full aspect-square overflow-hidden bg-[#f3e7db] block">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-contain p-4 group-hover/card:scale-105 transition-transform duration-500"
                  />
                </Link>

                {/* Content */}
                <div className="p-4 md:p-5 flex flex-col flex-grow">
                  <Link to={item.link} className="text-decoration-none block mb-1">
                    <h3 className="font-bebas text-xl md:text-[22px] tracking-wide text-black uppercase m-0 group-hover/card:text-gold transition-colors duration-300 line-clamp-1">
                      {item.title}
                    </h3>
                  </Link>
                  <p className="font-montserrat text-gray-700 text-xs md:text-[13px] mb-4">
                    {item.price}
                  </p>

                  {/* Buy Now Button - Using Gold/Black instead of Red */}
                  <div className="mt-auto">
                    <Link
                      to={item.link}
                      className="inline-block border border-gold text-gold hover:bg-gold hover:text-black text-[10px] md:text-[11px] font-bold uppercase tracking-wider py-1.5 px-4 transition-colors duration-300"
                    >
                      SHOP NOW
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Arrows */}
        <div className="collection-prev absolute top-[40%] -left-2 md:-left-5 -translate-y-1/2 z-10 w-10 h-10 bg-white border border-gray-200 shadow-md flex items-center justify-center cursor-pointer hover:border-gold hover:text-gold transition-colors duration-300 opacity-0 group-hover:opacity-100 disabled:opacity-0 rounded-full">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
        </div>
        <div className="collection-next absolute top-[40%] -right-2 md:-right-5 -translate-y-1/2 z-10 w-10 h-10 bg-white border border-gray-200 shadow-md flex items-center justify-center cursor-pointer hover:border-gold hover:text-gold transition-colors duration-300 opacity-0 group-hover:opacity-100 disabled:opacity-0 rounded-full">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
        </div>
      </div>

      {/* Scrolling Marquee / Ticker */}
      <div className="w-full bg-black py-2.5 overflow-hidden whitespace-nowrap flex relative mt-16">
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
