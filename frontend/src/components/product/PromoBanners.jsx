export default function PromoBanners() {
  return (
    <section className="w-full flex flex-col gap-4 py-8 bg-white max-w-[1600px] mx-auto px-4 md:px-10">
      {/* Banner 1 */}
      <img 
        src="https://placehold.co/1920x400/fdfaf5/111111?text=Promo+Banner+1+(FOR+YOUR+FIRST+BEST+FRIEND)" 
        alt="Promo Banner 1" 
        className="w-full h-auto object-cover"
      />
      
      {/* Banner 2 */}
      <img 
        src="https://placehold.co/1920x400/ebebeb/111111?text=Promo+Banner+2+(BUY+ANY+3+FOR+1700)" 
        alt="Promo Banner 2" 
        className="w-full h-auto object-cover"
      />
    </section>
  );
}
