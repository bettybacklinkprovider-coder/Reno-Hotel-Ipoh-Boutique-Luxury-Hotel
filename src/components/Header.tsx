import React, { useState, useEffect } from 'react';
import { Menu, X, Calendar, Sparkles, ChevronDown, Phone } from 'lucide-react';
import { HOTEL_DETAILS } from '../data/hotelData';

interface HeaderProps {
  activePage: string;
  setActivePage: (page: string) => void;
  onOpenBooking: (roomId?: string) => void;
  onOpenConcierge: () => void;
  currency: string;
  setCurrency: (currency: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activePage,
  setActivePage,
  onOpenBooking,
  onOpenConcierge,
  currency,
  setCurrency,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'rooms', label: 'Rooms & Suites' },
    { id: 'about-gallery', label: 'About & Gallery' },
    { id: 'contact', label: 'Contact / Booking' },
  ];

  const handleNavClick = (pageId: string) => {
    setActivePage(pageId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass-nav py-3 border-b border-purple-900/40 shadow-2xl shadow-purple-950/50' : 'bg-gradient-to-b from-[#0c0414]/90 via-[#0c0414]/60 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Zone 1: Single text element wordmark as per Top Bar Contract */}
          <button
            onClick={() => handleNavClick('home')}
            className="text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded-sm"
          >
            <span className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-white group-hover:text-amber-200 transition-colors block">
              Reno Hotel Ipoh
            </span>
          </button>

          {/* Zone 2: 4 clean text navigation links */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = activePage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`text-sm tracking-wide transition-all duration-200 relative py-1 focus:outline-none whitespace-nowrap ${
                    isActive
                      ? 'text-amber-300 font-medium'
                      : 'text-purple-100/80 hover:text-white font-normal'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Actions - Currency, AI Concierge, Book Now Button */}
          <div className="hidden md:flex items-center gap-4">
            {/* Phone Quick Link */}
            <a
              href={`tel:${HOTEL_DETAILS.phone.replace(/\s+/g, '')}`}
              className="hidden xl:flex items-center gap-1.5 text-xs text-purple-200/90 hover:text-amber-300 transition-colors py-1.5 px-2.5 rounded-full bg-purple-900/30 border border-purple-700/30"
              title="Call Front Desk"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>{HOTEL_DETAILS.phone}</span>
            </a>

            {/* Currency Selector */}
            <div className="relative">
              <button
                onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
                className="flex items-center gap-1 text-xs font-medium text-purple-200 bg-purple-950/60 border border-amber-500/20 px-3 py-1.5 rounded-full hover:border-amber-400/50 transition-colors focus:outline-none"
              >
                <span>{currency}</span>
                <ChevronDown className="w-3 h-3 text-amber-400" />
              </button>

              {currencyDropdownOpen && (
                <div className="absolute right-0 mt-2 w-28 bg-[#18092a] border border-amber-500/30 rounded-lg shadow-xl py-1 z-50 text-xs">
                  {['MYR (RM)', 'USD ($)', 'SGD (S$)'].map((curr) => (
                    <button
                      key={curr}
                      onClick={() => {
                        setCurrency(curr.split(' ')[0]);
                        setCurrencyDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 transition-colors ${
                        currency === curr.split(' ')[0]
                          ? 'bg-amber-400/20 text-amber-300 font-semibold'
                          : 'text-purple-100 hover:bg-purple-900/50'
                      }`}
                    >
                      {curr}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* AI Concierge Trigger */}
            <button
              onClick={onOpenConcierge}
              className="flex items-center gap-1.5 text-xs text-purple-200 hover:text-amber-300 px-3 py-1.5 rounded-full border border-purple-500/30 hover:border-amber-400/50 bg-purple-900/20 transition-all duration-200 whitespace-nowrap"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span>AI Concierge</span>
            </button>

            {/* Primary Book CTA */}
            <button
              onClick={() => onOpenBooking()}
              className="gold-gradient-btn px-4 py-2 rounded-full text-xs uppercase tracking-wider font-semibold shadow-lg hover:shadow-amber-500/20 transition-all duration-200 flex items-center gap-1.5 whitespace-nowrap"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Your Stay</span>
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={onOpenConcierge}
              className="p-2 text-amber-400 rounded-lg hover:bg-purple-900/40 border border-purple-800/40"
              aria-label="Open AI Concierge"
            >
              <Sparkles className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-purple-100 rounded-lg hover:bg-purple-900/50 focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#130623] border-b border-purple-900/60 px-4 pt-4 pb-6 mt-2 space-y-4 shadow-2xl animate-fadeIn">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`text-left text-base py-2 px-3 rounded-lg transition-colors ${
                  activePage === link.id
                    ? 'bg-purple-900/50 text-amber-300 font-medium border-l-2 border-amber-400'
                    : 'text-purple-200/90 hover:bg-purple-900/30'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="pt-3 border-t border-purple-800/40 flex flex-col gap-3">
            <div className="flex items-center justify-between text-xs text-purple-200 px-1">
              <span>Currency:</span>
              <div className="flex gap-2">
                {['MYR', 'USD', 'SGD'].map((curr) => (
                  <button
                    key={curr}
                    onClick={() => setCurrency(curr)}
                    className={`px-2.5 py-1 rounded border ${
                      currency === curr
                        ? 'bg-amber-400 text-purple-950 border-amber-400 font-semibold'
                        : 'border-purple-700/50 text-purple-300'
                    }`}
                  >
                    {curr}
                  </button>
                ))}
              </div>
            </div>

            <a
              href={`tel:${HOTEL_DETAILS.phone.replace(/\s+/g, '')}`}
              className="flex items-center justify-center gap-2 text-xs py-2 text-purple-200 bg-purple-900/30 rounded-lg border border-purple-700/30"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>{HOTEL_DETAILS.phone}</span>
            </a>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full gold-gradient-btn py-3 rounded-xl text-xs uppercase tracking-wider font-semibold shadow-lg text-center"
            >
              Book Your Stay Now
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
