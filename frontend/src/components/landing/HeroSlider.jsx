import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const slides = [
  {
    id: 1,
    desktopImage: 'https://placehold.co/1920x800/111111/d4af37?text=Hero+Banner+1',
    mobileImage: 'https://placehold.co/800x800/111111/d4af37?text=Hero+Banner+1',
    alt: 'Hero Banner 1'
  },
  {
    id: 2,
    desktopImage: 'https://placehold.co/1920x800/1a1a1a/d4af37?text=Hero+Banner+2',
    mobileImage: 'https://placehold.co/800x800/1a1a1a/d4af37?text=Hero+Banner+2',
    alt: 'Hero Banner 2'
  },
  {
    id: 3,
    desktopImage: 'https://placehold.co/1920x800/222222/d4af37?text=Hero+Banner+3',
    mobileImage: 'https://placehold.co/800x800/222222/d4af37?text=Hero+Banner+3',
    alt: 'Bodywash Loofah Pouch Banner'
  },
  {
    id: 4,
    desktopImage: 'https://placehold.co/1920x800/2a2a2a/d4af37?text=Hero+Banner+4',
    mobileImage: 'https://placehold.co/800x800/2a2a2a/d4af37?text=Hero+Banner+4',
    alt: 'Build Your Own Box Banner'
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
                  className="w-full h-auto block"
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
