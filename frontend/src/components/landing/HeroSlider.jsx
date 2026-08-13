import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const slides = [
  {
    id: 1,
    desktopImage: '/images/desktop_royal_oudh.png',
    mobileImage: '/images/mobile_royal_oudh.png',
    alt: 'Royal Oudh Perfume'
  },
  {
    id: 2,
    desktopImage: '/images/desktop_imperial_gold.png',
    mobileImage: '/images/mobile_imperial_gold.png',
    alt: 'Imperial Gold Perfume'
  },
  {
    id: 3,
    desktopImage: '/images/desktop_velvet_lavender.png',
    mobileImage: '/images/mobile_velvet_lavender.png',
    alt: 'Velvet Lavender Perfume'
  },
  {
    id: 4,
    desktopImage: '/images/desktop_crimson_rouge.png',
    mobileImage: '/images/mobile_crimson_rouge.png',
    alt: 'Crimson Rouge Perfume'
  }
];

export default function HeroSlider() {
  return (
    <section className="w-full relative group">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        speed={1000}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          bulletClass: 'swiper-pagination-bullet !bg-white/50 !w-3 !h-3 !mx-1.5 transition-all duration-300',
          bulletActiveClass: '!bg-gold !w-8 !rounded-full',
        }}
        loop={true}
        className="w-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="w-full relative flex">
              <picture className="w-full">
                <source media="(max-width: 767px)" srcSet={slide.mobileImage} />
                <source media="(min-width: 768px)" srcSet={slide.desktopImage} />
                <img
                  src={slide.desktopImage}
                  alt={slide.alt}
                  className="w-full h-auto md:h-[500px] lg:h-[650px] md:object-cover md:object-center block"
                  loading={slide.id === 1 ? 'eager' : 'lazy'}
                />
              </picture>
              {/* Optional overlay if you want text on top of images later */}
              <div className="absolute inset-0 bg-black/10"></div>
            </div>
          </SwiperSlide>
        ))}


      </Swiper>
      
      <style>{`
        .swiper-pagination {
          bottom: 24px !important;
        }
      `}</style>
    </section>
  );
}
