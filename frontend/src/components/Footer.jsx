import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="w-full flex flex-col">
      {/* Pre-Footer CTA */}
      <div className="w-full bg-black py-12 px-4 text-center">
        <h2 className="font-bebas text-3xl md:text-4xl tracking-wider text-white uppercase m-0 mb-2">
          LOGGED IN YET?
        </h2>
        <p className="font-montserrat text-gold-light text-sm md:text-base tracking-widest uppercase mb-6">
          WILD DEALS ARE WAITING. MAKE SURE NOT TO MISS OUT!
        </p>
        <Link
          to="/login"
          className="inline-block bg-white text-black hover:bg-gold transition-colors duration-300 font-bebas text-xl md:text-2xl tracking-widest uppercase py-3 px-8"
        >
          GET IN. NOW.
        </Link>
      </div>

      {/* Main Footer Links */}
      <div className="w-full bg-white py-16 px-4 md:px-10 border-t border-gray-100">
        {/* Follow Us - Mobile Only (shown first) */}
        <div className="md:hidden mb-8">
          <h3 className="font-bebas text-2xl tracking-wider text-black uppercase mb-6">FOLLOW US</h3>
          <div className="flex items-center gap-4 text-black">
            <a href="#" className="hover:text-gold transition-colors" aria-label="Instagram">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            </a>
            <a href="#" className="hover:text-gold transition-colors" aria-label="YouTube">
              <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
            </a>
            <a href="#" className="hover:text-gold transition-colors" aria-label="LinkedIn">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
            </a>
            <a href="#" className="hover:text-gold transition-colors" aria-label="X">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
            <a href="#" className="hover:text-gold transition-colors" aria-label="Facebook">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
            </a>
          </div>
        </div>

        <div className="max-w-[1400px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8">

          {/* Column 1: Shop */}
          <div className="flex flex-col">
            <h3 className="font-bebas text-2xl tracking-wider text-black uppercase mb-6">SHOP</h3>
            <ul className="flex flex-col gap-3 font-bebas text-lg tracking-wide text-gray-500">
              <li><a href="#" className="hover:text-gold transition-colors">PERFUME TRIAL PACK</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">PARFUM - 100ML</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">SHOP ALL</a></li>
            </ul>
          </div>

          {/* Column 2: Information */}
          <div className="flex flex-col">
            <h3 className="font-bebas text-2xl tracking-wider text-black uppercase mb-6">INFORMATION</h3>
            <ul className="flex flex-col gap-3 font-bebas text-lg tracking-wide text-gray-500">
              <li><Link to="/about-us" className="hover:text-gold transition-colors">ABOUT US</Link></li>
              <li><a href="#" className="hover:text-gold transition-colors">TERMS OF SERVICE</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">PRIVACY POLICY</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">SHIPPING POLICY</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">REFUND POLICY</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">EXCHANGE POLICY</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">CASHBACK TERMS</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">BLOG</a></li>
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div className="flex flex-col">
            <h3 className="font-bebas text-2xl tracking-wider text-black uppercase mb-6">CONTACT</h3>
            <ul className="flex flex-col gap-3 font-bebas text-lg tracking-wide text-gray-500">
              <li><Link to="/contact" className="hover:text-gold transition-colors">CONTACT</Link></li>
              <li><a href="#" className="hover:text-gold transition-colors">TRACK ORDER</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">BULK ORDERS - QUERY FORM</a></li>
            </ul>
          </div>

          {/* Column 4: Other & Follow Us (Follow Us hidden on mobile since it's shown above) */}
          <div className="flex flex-col">
            <h3 className="font-bebas text-2xl tracking-wider text-black uppercase mb-6">OTHER</h3>
            <ul className="flex flex-col gap-3 font-bebas text-lg tracking-wide text-gray-500 mb-8">
              <li><a href="#" className="hover:text-gold transition-colors">ACCOUNT & LOGIN</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">GET HELP</a></li>
            </ul>

            {/* Follow Us - Desktop Only */}
            <div className="hidden md:block">
              <h3 className="font-bebas text-2xl tracking-wider text-black uppercase mb-6">FOLLOW US</h3>
              <div className="flex items-center gap-4 text-black">
                {/* Instagram */}
                <a href="#" className="hover:text-gold transition-colors" aria-label="Instagram">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
                </a>
                {/* YouTube */}
                <a href="#" className="hover:text-gold transition-colors" aria-label="YouTube">
                  <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" /></svg>
                </a>
                {/* LinkedIn */}
                <a href="#" className="hover:text-gold transition-colors" aria-label="LinkedIn">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                </a>
                {/* X / Twitter */}
                <a href="#" className="hover:text-gold transition-colors" aria-label="X">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                </a>
                {/* Facebook */}
                <a href="#" className="hover:text-gold transition-colors" aria-label="Facebook">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" /></svg>
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}
