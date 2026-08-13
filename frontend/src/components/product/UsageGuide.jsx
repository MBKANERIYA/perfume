const pulsePoints = [
  {
    id: 1,
    image: 'https://placehold.co/400x300/e6d7c3/111111?text=Neck',
    label: 'BEHIND THE EARS'
  },
  {
    id: 2,
    image: 'https://placehold.co/400x300/e6d7c3/111111?text=Wrist',
    label: 'COLLARBONES'
  },
  {
    id: 3,
    image: 'https://placehold.co/400x300/e6d7c3/111111?text=Collarbone',
    label: 'INNER WRISTS'
  }
];

export default function UsageGuide() {
  return (
    <section className="w-full bg-[#fcfaf7] py-20 px-4 md:px-10">
      <div className="max-w-[1200px] mx-auto flex flex-col items-center">
        
        <h2 className="font-bebas text-4xl md:text-5xl text-black m-0 tracking-widest uppercase mb-12 text-center">
          SPRAY ON YOUR PULSE POINTS
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          {pulsePoints.map((point) => (
            <div key={point.id} className="flex flex-col group overflow-hidden rounded-t-md rounded-b-md shadow-md">
              <div className="w-full h-48 md:h-64 overflow-hidden">
                <img 
                  src={point.image} 
                  alt={point.label} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="bg-black py-4 px-2 text-center transition-colors duration-300 group-hover:bg-gold">
                <h3 className="font-bebas text-xl text-white tracking-widest uppercase m-0 group-hover:text-black">
                  {point.label}
                </h3>
              </div>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
}
