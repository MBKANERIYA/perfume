import React from 'react';

export default function Contact() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-8 md:py-16 font-montserrat">
        
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-widest mb-12">
          <a href="/" className="hover:text-black transition-colors">HOME</a>
          <span className="text-gray-300">/</span>
          <span className="text-black">CONTACT</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-32">
          
          {/* Left Column: Contact Info */}
          <div className="flex flex-col">
            <h1 className="font-bebas text-5xl md:text-6xl tracking-widest text-black mb-8 uppercase">
              CONTACT
            </h1>
            
            <h2 className="font-bebas text-3xl md:text-4xl tracking-widest text-black mb-6 uppercase">
              REGISTERED OFFICE
            </h2>
            
            <div className="space-y-6 text-[15px] text-gray-800 leading-relaxed font-medium">
              <p>Office No 201 Unitech cyber park Sector 39, Gurugram Haryana 122003</p>
              <p>
                <a href="mailto:support@kizperfumes.com" className="hover:text-gold transition-colors underline decoration-gray-300 underline-offset-4">
                  Email - support@kizperfumes.com
                </a>
              </p>
              <p>Phone no. - +91-9220508119</p>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="flex flex-col mt-4 md:mt-2">
            <form className="flex flex-col space-y-10">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="flex flex-col border-b border-gray-200">
                  <label className="font-bebas text-2xl tracking-widest text-black mb-2">NAME</label>
                  <input 
                    type="text" 
                    placeholder="Enter Full Name" 
                    className="w-full bg-transparent border-none focus:outline-none text-sm text-gray-800 placeholder-gray-400 pb-3"
                  />
                </div>
                <div className="flex flex-col border-b border-gray-200">
                  <label className="font-bebas text-2xl tracking-widest text-black mb-2">EMAIL</label>
                  <input 
                    type="email" 
                    placeholder="Enter Email" 
                    className="w-full bg-transparent border-none focus:outline-none text-sm text-gray-800 placeholder-gray-400 pb-3"
                  />
                </div>
              </div>

              <div className="flex flex-col border-b border-gray-200">
                <label className="font-bebas text-2xl tracking-widest text-black mb-2">PHONE NUMBER</label>
                <input 
                  type="tel" 
                  placeholder="Enter Mobile No" 
                  className="w-full bg-transparent border-none focus:outline-none text-sm text-gray-800 placeholder-gray-400 pb-3"
                />
              </div>

              <div className="flex flex-col border-b border-gray-200">
                <label className="font-bebas text-2xl tracking-widest text-black mb-2">MESSAGE</label>
                <textarea 
                  placeholder="Message" 
                  rows="3"
                  className="w-full bg-transparent border-none focus:outline-none text-sm text-gray-800 placeholder-gray-400 pb-3 resize-none"
                ></textarea>
              </div>

              <button 
                type="button" 
                className="w-full bg-black hover:bg-gold text-white font-bebas text-2xl tracking-widest py-4 transition-colors duration-300 mt-4"
              >
                SEND
              </button>

            </form>
          </div>

        </div>
      </div>
    </main>
  );
}
