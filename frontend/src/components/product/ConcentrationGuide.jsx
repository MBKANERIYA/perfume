export default function ConcentrationGuide() {
  return (
    <section className="w-full bg-[#fdfaf5] py-16 px-4 md:px-10 flex justify-center">
      <div className="max-w-[1200px] w-full">
        <picture className="w-full">
          <source media="(max-width: 767px)" srcSet="https://placehold.co/800x800/fdfaf5/111111?text=PERFUME+CONCENTRATION+GUIDE+(Mobile)" />
          <source media="(min-width: 768px)" srcSet="https://placehold.co/1200x300/fdfaf5/111111?text=PERFUME+CONCENTRATION+GUIDE+(Desktop)" />
          <img 
            src="https://placehold.co/1200x300/fdfaf5/111111?text=PERFUME+CONCENTRATION+GUIDE+(Desktop)" 
            alt="Perfume Concentration Guide" 
            className="w-full h-auto md:h-[250px] lg:h-[300px] md:object-cover md:object-center rounded-md"
          />
        </picture>
      </div>
    </section>
  );
}
