import { useState } from 'react';

const faqs = [
  {
    question: 'WHAT DO YOU OFFER?',
    answer: 'We offer perfumes and gift sets in men, women, and unisex variants which includes Perfume trial pack, full-size, and pocket perfume bottles. You can also build your own customized box of favorite fragrances.'
  },
  {
    question: 'WHAT IF I ENTER THE WRONG ADDRESS?',
    answer: 'Please contact our customer support immediately. We can update the address if the order has not been dispatched yet.'
  },
  {
    question: 'ARE YOUR PERFUMES LONG-LASTING?',
    answer: 'Yes! Our perfumes are crafted with high oil concentration (up to 25%), ensuring a long-lasting fragrance that stays with you throughout the day.'
  },
  {
    question: 'HOW DO I CONTACT CUSTOMER SUPPORT?',
    answer: 'You can reach out to us via email at support@kizperfumes.com or WhatsApp us at our support number provided on the contact page.'
  },
  {
    question: 'DO YOU HAVE BULK PURCHASE OFFERS?',
    answer: 'Yes, we offer special discounts for bulk corporate orders and weddings. Please email us your requirements.'
  },
  {
    question: 'HOW LONG DOES DELIVERY TAKE?',
    answer: 'Standard delivery takes 3-5 business days depending on your location. Metro cities usually receive orders faster.'
  },
  {
    question: 'HOW CAN I TRACK MY ORDER?',
    answer: 'Once your order is shipped, you will receive an email and SMS with the tracking link and courier details.'
  },
  {
    question: 'DO YOU OFFER FREE SHIPPING?',
    answer: 'Yes, we offer free shipping on all orders above ₹999.'
  },
  {
    question: 'WHAT IS YOUR REFUND POLICY?',
    answer: 'We have a 100% money-back guarantee on our trial packs. For other items, please refer to our detailed refund policy page.'
  }
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0); // First one open by default as in screenshot

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section className="w-full bg-white py-20">
      <div className="w-full px-4 md:px-10 max-w-[1200px] mx-auto">
        
        {/* Header section */}
        <div className="mb-10 text-left">
          <h2 className="font-bebas text-5xl md:text-[56px] tracking-wide text-black uppercase m-0 mb-4">
            FAQS
          </h2>
          <p className="font-montserrat text-gray-700 text-sm md:text-base leading-relaxed">
            Curiosity didn't kill the cat - it just brought you here!<br />
            You got questions. We've got answers. If anything else pops up, WhatsApp us anytime.
          </p>
        </div>

        {/* Accordion List */}
        <div className="flex flex-col border-t border-gray-200">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            
            return (
              <div key={index} className="border-b border-gray-200">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full py-5 flex items-center justify-between bg-white cursor-pointer group text-left"
                >
                  <h3 className="font-bebas text-xl md:text-[22px] tracking-wide text-black uppercase m-0 group-hover:text-gold transition-colors duration-300">
                    {faq.question}
                  </h3>
                  
                  {/* Chevron Icon - Gold instead of Red */}
                  <span className={`text-gold transition-transform duration-300 ml-4 flex-shrink-0 ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </button>
                
                {/* Answer Area */}
                <div 
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? 'max-h-[500px] opacity-100 pb-6' : 'max-h-0 opacity-0 pb-0'
                  }`}
                >
                  <p className="font-montserrat text-gray-600 text-sm md:text-[15px] leading-relaxed pr-8">
                    {/* Render HTML if there's links (like the trial pack link in the screenshot) */}
                    {faq.question === 'WHAT DO YOU OFFER?' ? (
                      <>
                        We offer perfumes and gift sets in men, women, and unisex variants which includes <a href="#" className="text-black underline hover:text-gold transition-colors">Perfume trial pack</a>, full-size, and pocket perfume bottles. You can also build your own customized box of favorite fragrances.
                      </>
                    ) : (
                      faq.answer
                    )}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        
      </div>
    </section>
  );
}
