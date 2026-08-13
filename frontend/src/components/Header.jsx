import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import SearchOverlay from './SearchOverlay';
import LoginOverlay from './LoginOverlay';

const navRow = [
  { label: 'New Arrivals', href: '/new-arrivals' },
  {
    label: 'Perfumes',
    href: '/shop-all',
    dropdown: [
      { label: 'Imperial Gold', href: '/product/imperial-gold' },
      { label: 'Crimson Rouge', href: '/product/crimson-rouge' },
      { label: 'Velvet Lavender', href: '/product/velvet-lavender' },
      { label: 'Royal Oudh', href: '/product/royal-oudh' },
      { label: 'Royal Sultan', href: '/product/royal-sultan' },
      { label: 'White Velvet', href: '/product/white-velvet' },
      { label: 'Sanaya', href: '/product/sanaya' },
      { label: 'Majestic Musk', href: '/product/majestic-musk' },
      { label: 'Emerald Breeze', href: '/product/emerald-breeze' },
      { label: 'Aqua Frost', href: '/product/aqua-frost' },
      { label: 'Blue Horizon', href: '/product/blue-horizon' },
      { label: 'Midnight Oudh', href: '/product/midnight-oudh' },
      { label: 'Silk Bloom', href: '/product/silk-bloom' },
    ],
  },
  { label: 'For Men', href: '/men' },
  { label: 'For Women', href: '/women' },
  { label: 'Unisex', href: '/unisex' },
  { label: 'About Us', href: '/about-us' },
];

function NavItem({ item }) {
  const [open, setOpen] = useState(false);
  const hasDropdown = item.dropdown && item.dropdown.length > 0;

  return (
    <div
      className="relative group"
      onMouseEnter={() => hasDropdown && setOpen(true)}
      onMouseLeave={() => hasDropdown && setOpen(false)}
    >
      <a
        href={item.href}
        className="text-gold hover:text-gold-light text-[11.5px] font-semibold uppercase tracking-[1.2px] px-3 py-2 whitespace-nowrap font-montserrat relative transition-all duration-300 inline-flex items-center gap-1"
      >
        {item.label}
        {hasDropdown && (
          <svg
            className={`w-2.5 h-2.5 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
            fill="currentColor"
            viewBox="0 0 10 6"
          >
            <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          </svg>
        )}
        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 group-hover:w-[70%] h-[1.5px] bg-gradient-to-r from-transparent via-gold to-transparent transition-all duration-300" />
      </a>

      {/* Dropdown - adjusted for larger list */}
      {hasDropdown && (
        <div
          data-lenis-prevent="true"
          className={`absolute top-full left-1/2 -translate-x-1/2 bg-[#111] border border-gold/25 rounded min-w-[220px] max-h-[400px] overflow-y-auto py-2 z-[100000] shadow-[0_15px_40px_rgba(0,0,0,0.5),0_0_15px_rgba(212,175,55,0.08)] transition-all duration-300 custom-scrollbar ${
            open ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-2.5'
          }`}
        >
          {item.dropdown.map((sub) => (
            <a
              key={sub.href}
              href={sub.href}
              className="block px-6 py-2.5 text-gold hover:text-gold-light text-xs font-medium uppercase tracking-[1px] font-montserrat transition-all duration-250 hover:bg-gold/10 hover:pl-[30px]"
            >
              {sub.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileDropdowns, setMobileDropdowns] = useState({});
  const [scrolled, setScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  
  const { cartItems, setIsCartOpen } = useCart();
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const toggleMobileDropdown = (label) => {
    setMobileDropdowns((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  return (
    <>
      <header
        className={`w-full bg-black font-montserrat sticky top-0 z-[99999] border-b border-gold/20 transition-shadow duration-300 ${
          scrolled ? 'shadow-[0_4px_30px_rgba(212,175,55,0.2)]' : 'shadow-[0_2px_20px_rgba(212,175,55,0.15)]'
        }`}
      >

        {/* Main Header */}
        <div className="flex items-center justify-between px-10 py-3 max-w-[1400px] mx-auto">
          {/* Logo */}
          <a href="/" className="flex-shrink-0 flex flex-col items-center hover:scale-[1.03] transition-transform duration-300 min-w-[120px]">
            <span className="font-cinzel text-[32px] font-bold text-gold uppercase tracking-[6px] leading-none whitespace-nowrap">
              KIZ
            </span>
            <span className="font-montserrat text-[10px] font-semibold text-gold/80 uppercase tracking-[10px] mt-1 ml-2">
              Perfumes
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-2 flex-1 px-8 justify-center">
            {navRow.map((item) => (
              <NavItem key={item.href} item={item} />
            ))}
          </nav>

          {/* Icons */}
          <div className="flex items-center gap-5 flex-shrink-0">
            {/* Account */}
            <button onClick={() => setIsLoginOpen(true)} className="text-gold hover:text-gold-light hover:-translate-y-0.5 transition-all duration-300 hover:drop-shadow-[0_0_6px_rgba(212,175,55,0.3)] bg-transparent border-none cursor-pointer" aria-label="My Account">
              <svg className="w-[22px] h-[22px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </button>

            {/* Search */}
            <button onClick={() => setIsSearchOpen(true)} className="text-gold hover:text-gold-light hover:-translate-y-0.5 transition-all duration-300 hover:drop-shadow-[0_0_6px_rgba(212,175,55,0.3)] bg-transparent border-none cursor-pointer" aria-label="Search">
              <svg className="w-[22px] h-[22px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>

            {/* Cart */}
            <button onClick={() => setIsCartOpen(true)} className="text-gold hover:text-gold-light hover:-translate-y-0.5 transition-all duration-300 relative hover:drop-shadow-[0_0_6px_rgba(212,175,55,0.3)] bg-transparent border-none cursor-pointer" aria-label="Shopping Cart">
              <svg className="w-[22px] h-[22px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              <span className="absolute -top-1.5 -right-2 bg-gold text-black text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center font-montserrat">
                {cartCount}
              </span>
            </button>

            {/* Mobile Toggle */}
            <button
              className="lg:hidden flex flex-col gap-[5px] bg-transparent border-none cursor-pointer p-2 z-[100001]"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle Menu"
            >
              <span className={`block w-6 h-0.5 bg-gold rounded-sm transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
              <span className={`block w-6 h-0.5 bg-gold rounded-sm transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
              <span className={`block w-6 h-0.5 bg-gold rounded-sm transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <nav
          className={`lg:hidden fixed top-0 right-0 w-[300px] h-screen bg-[#0a0a0a] flex flex-col pt-20 px-8 pb-8 z-[100000] overflow-y-auto border-l border-gold/20 shadow-[-10px_0_40px_rgba(0,0,0,0.5)] transition-transform duration-400 ease-[cubic-bezier(0.25,0.8,0.25,1)] ${
            mobileOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {navRow.map((item) => (
            <div key={item.href} className="w-full">
              {item.dropdown ? (
                <>
                  <button
                    onClick={() => toggleMobileDropdown(item.label)}
                    className="w-full flex items-center justify-between text-gold text-[13px] font-semibold uppercase tracking-[1.2px] py-3.5 border-b border-gold/[0.08] bg-transparent cursor-pointer font-montserrat"
                  >
                    {item.label}
                    <svg
                      className={`w-2.5 h-2.5 transition-transform duration-300 ${mobileDropdowns[item.label] ? 'rotate-180' : ''}`}
                      fill="currentColor"
                      viewBox="0 0 10 6"
                    >
                      <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                    </svg>
                  </button>
                  <div className={`pl-4 overflow-hidden transition-all duration-300 ${mobileDropdowns[item.label] ? 'max-h-60' : 'max-h-0'}`}>
                    {item.dropdown.map((sub) => (
                      <a
                        key={sub.href}
                        href={sub.href}
                        className="block text-gold/80 hover:text-gold-light text-xs font-medium uppercase tracking-[1px] py-2.5 font-montserrat transition-colors"
                      >
                        {sub.label}
                      </a>
                    ))}
                  </div>
                </>
              ) : (
                <a
                  href={item.href}
                  className="block text-gold text-[13px] font-semibold uppercase tracking-[1.2px] py-3.5 border-b border-gold/[0.08] font-montserrat"
                >
                  {item.label}
                </a>
              )}
            </div>
          ))}
        </nav>
        {/* Search Overlay positioned below header */}
        <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
        <LoginOverlay isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
      </header>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/60 z-[99998]"
          onClick={() => setMobileOpen(false)}
        />
      )}
    </>
  );
}
