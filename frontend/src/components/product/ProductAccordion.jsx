import { useState } from 'react';

const accordionData = [
  {
    id: 'description',
    title: 'DESCRIPTION',
    content: 'Love Drunk is a mesmerizing blend of sweet and spicy notes. It opens with a burst of candied nuts and cherry, quickly melting into a warm heart of rose and peony. The base leaves a lingering, breathtaking trail of vanilla and cedarwood. Perfect for evening wear and making an unforgettable impression.'
  },
  {
    id: 'ingredients',
    title: 'INGREDIENTS',
    content: 'Alcohol Denat., Fragrance (Parfum), Water (Aqua), Benzyl Salicylate, Linalool, Hexyl Cinnamal, Limonene, Hydroxycitronellal, Citronellol, Alpha-Isomethyl Ionone, Geraniol, Citral.'
  },
  {
    id: 'shipping',
    title: 'SHIPPING & RETURNS',
    content: 'Free standard shipping on all orders over ₹1199. We offer a 100% money-back guarantee. If you are not completely satisfied with your purchase, you can return it within 14 days for a full refund.'
  }
];

export default function ProductAccordion() {
  const [openId, setOpenId] = useState('description');

  const toggleAccordion = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="w-full bg-white py-16 px-4">
      <div className="max-w-[1200px] mx-auto border-t border-b border-gray-200">
        {accordionData.map((item) => (
          <div key={item.id} className="border-b border-gray-200 last:border-0">
            <button
              onClick={() => toggleAccordion(item.id)}
              className="w-full flex justify-between items-center py-6 focus:outline-none group"
            >
              <h3 className="font-bebas text-2xl tracking-widest uppercase text-black group-hover:text-gold transition-colors duration-300">
                {item.title}
              </h3>
              <span className={`transform transition-transform duration-300 text-gold text-2xl ${openId === item.id ? 'rotate-180' : ''}`}>
                ↓
              </span>
            </button>
            <div 
              className={`overflow-hidden transition-all duration-500 ease-in-out ${openId === item.id ? 'max-h-96 opacity-100 pb-6' : 'max-h-0 opacity-0'}`}
            >
              <p className="font-montserrat text-gray-600 leading-relaxed text-sm md:text-base">
                {item.content}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
