const noteIcons = {
  rose: '🌹', jasmine: '🌸', lavender: '🌿', bergamot: '🍋',
  citrus: '🍊', saffron: '🌺', sandalwood: '🪵', amber: '🍯',
  vanilla: '🍦', musk: '🦌', orange: '🍊', amberwood: '🪵',
  ambergris: '🌊', cedarwood: '🌲', violet: '🪻', 'white flowers': '🌼',
  cardamom: '🌿', oud: '🪵', patchouli: '🍃', pepper: '🌶️',
  cedar: '🌲', aldehydes: '🫧', iris: '🪷', peach: '🍑',
  lily: '🪷', 'green apple': '🍏', lemon: '🍋', 'green leaves': '🍃',
  marine: '🌊', grapefruit: '🍊', geranium: '🌺', spice: '🌶️',
  leather: '👞', pear: '🍐', 'white musk': '☁️', oudh: '🪵'
};

const getIcon = (noteName) => {
  const normalized = noteName.toLowerCase().trim();
  for (const [key, icon] of Object.entries(noteIcons)) {
    if (normalized.includes(key)) return icon;
  }
  return '✨'; // Default icon
};

export default function ProductNotes({ product }) {
  if (!product || !product.fullNotes) return null;

  const parseNotes = (noteString) => {
    return noteString.split(',').map(n => ({
      name: n.trim(),
      icon: getIcon(n)
    }));
  };

  const notes = {
    head: parseNotes(product.fullNotes.top),
    heart: parseNotes(product.fullNotes.heart),
    base: parseNotes(product.fullNotes.base)
  };

  return (
    <section className="w-full bg-white py-12 px-4 md:px-10">
      <div className="max-w-[1200px] mx-auto border border-gray-100 p-8 md:p-12 shadow-sm">
        <h3 className="text-center font-bebas text-3xl tracking-widest uppercase mb-10 text-black">
          NOTES
        </h3>
        
        <div className="flex flex-col md:flex-row justify-center items-start gap-12 md:gap-8 border-t border-gray-200 pt-10">
          
          {/* Head Notes */}
          <div className="flex flex-col items-center text-center flex-1 w-full border-b md:border-b-0 md:border-r border-gray-100 pb-10 md:pb-0">
            <h4 className="font-bebas text-2xl tracking-widest text-black mb-8 uppercase">
              TOP NOTES
            </h4>
            <div className="flex flex-wrap justify-center items-center gap-6">
              {notes.head.map((note) => (
                <div key={note.name} className="flex flex-col items-center">
                  <span className="text-4xl md:text-5xl mb-4 drop-shadow-sm">{note.icon}</span>
                  <span className="font-montserrat text-xs text-gray-700 uppercase tracking-widest">{note.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Heart Notes */}
          <div className="flex flex-col items-center text-center flex-1 w-full border-b md:border-b-0 md:border-r border-gray-100 pb-10 md:pb-0">
            <h4 className="font-bebas text-2xl tracking-widest text-black mb-8 uppercase">
              HEART NOTES
            </h4>
            <div className="flex flex-wrap justify-center items-center gap-6">
              {notes.heart.map((note) => (
                <div key={note.name} className="flex flex-col items-center">
                  <span className="text-4xl md:text-5xl mb-4 drop-shadow-sm">{note.icon}</span>
                  <span className="font-montserrat text-xs text-gray-700 uppercase tracking-widest">{note.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Base Notes */}
          <div className="flex flex-col items-center text-center flex-1 w-full">
            <h4 className="font-bebas text-2xl tracking-widest text-black mb-8 uppercase">
              BASE NOTES
            </h4>
            <div className="flex flex-wrap justify-center items-center gap-6">
              {notes.base.map((note) => (
                <div key={note.name} className="flex flex-col items-center">
                  <span className="text-4xl md:text-5xl mb-4 drop-shadow-sm">{note.icon}</span>
                  <span className="font-montserrat text-xs text-gray-700 uppercase tracking-widest">{note.name}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
