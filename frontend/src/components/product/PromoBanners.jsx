export default function PromoBanners() {
  return (
    <section className="w-full flex flex-col gap-4 py-8 bg-white max-w-[1600px] mx-auto px-4 md:px-10">
      {/* Banner 1 */}
      <picture className="w-full">
        <source media="(max-width: 767px)" srcSet="/images/mobile_promo_friend.png" />
        <source media="(min-width: 768px)" srcSet="/images/desktop_promo_friend.png" />
        <img 
          src="/images/desktop_promo_friend.png" 
          alt="Promo Banner 1" 
          className="w-full h-auto object-cover rounded-md"
        />
      </picture>
      
      {/* Banner 2 */}
      <picture className="w-full">
        <source media="(max-width: 767px)" srcSet="https://placehold.co/800x800/ebebeb/111111?text=BUY+ANY+3+FOR+1700+(Mobile)" />
        <source media="(min-width: 768px)" srcSet="https://placehold.co/1920x400/ebebeb/111111?text=BUY+ANY+3+FOR+1700+(Desktop)" />
        <img 
          src="https://placehold.co/1920x400/ebebeb/111111?text=BUY+ANY+3+FOR+1700+(Desktop)" 
          alt="Promo Banner 2" 
          className="w-full h-auto object-cover rounded-md"
        />
      </picture>
    </section>
  );
}
