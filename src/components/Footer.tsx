import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, ShieldCheck, ArrowRight, Check } from 'lucide-react';
import { HOTEL_DETAILS } from '../data/hotelData';

interface FooterProps {
  setActivePage: (page: string) => void;
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({ setActivePage, onOpenBooking }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#08020e] text-purple-200/80 border-t border-amber-500/15 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-purple-900/40">
          
          {/* Column 1: Brand & Introduction */}
          <div className="space-y-4">
            <h3 className="font-serif text-2xl font-bold text-white tracking-wide">
              Reno Hotel Ipoh
            </h3>
            <p className="text-xs text-purple-200/70 leading-relaxed">
              A modern luxury boutique hotel in Ipoh, Perak. Blending timeless elegance with contemporary comforts, bespoke hospitality, and effortless proximity to Perak's heritage.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs text-amber-300/90 font-medium">
              <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Official Direct Booking Guarantee</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-widest text-amber-400 font-serif">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => { setActivePage('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-amber-300 transition-colors flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3 h-3 text-amber-400/60" /> Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActivePage('rooms'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-amber-300 transition-colors flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3 h-3 text-amber-400/60" /> Rooms & Suites
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActivePage('about-gallery'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-amber-300 transition-colors flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3 h-3 text-amber-400/60" /> About & Gallery
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActivePage('contact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-amber-300 transition-colors flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3 h-3 text-amber-400/60" /> Contact / Booking
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact & Hours */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-widest text-amber-400 font-serif">
              Concierge & Location
            </h4>
            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span className="leading-tight">{HOTEL_DETAILS.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <a href={`tel:${HOTEL_DETAILS.phone.replace(/\s+/g, '')}`} className="hover:text-amber-300 transition-colors">
                  {HOTEL_DETAILS.phone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <a href={`mailto:${HOTEL_DETAILS.email}`} className="hover:text-amber-300 transition-colors">
                  {HOTEL_DETAILS.email}
                </a>
              </div>
              <div className="flex items-center gap-2.5 pt-1 text-purple-300/80">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Check-in: {HOTEL_DETAILS.checkIn} · Check-out: {HOTEL_DETAILS.checkOut}</span>
              </div>
            </div>
          </div>

          {/* Column 4: Newsletter Privilege */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-widest text-amber-400 font-serif">
              Exclusive Offers
            </h4>
            <p className="text-xs text-purple-200/70 leading-relaxed">
              Subscribe to receive private invitations, seasonal suite discounts, and complimentary stay upgrades.
            </p>
            {subscribed ? (
              <div className="bg-purple-900/40 border border-amber-500/30 text-amber-200 text-xs p-3 rounded-lg flex items-center gap-2">
                <Check className="w-4 h-4 text-amber-400 shrink-0" />
                <span>You are subscribed to Reno VIP Privilege updates.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-purple-950/60 border border-purple-800/60 rounded-lg px-3 py-2 text-xs text-white placeholder-purple-400/60 focus:outline-none focus:border-amber-400"
                  />
                  <button
                    type="submit"
                    className="absolute right-1 top-1 bottom-1 px-3 bg-amber-400 text-purple-950 font-semibold rounded text-xs hover:bg-amber-300 transition-colors"
                  >
                    Join
                  </button>
                </div>
              </form>
            )}
            <button
              onClick={onOpenBooking}
              className="w-full mt-2 purple-gradient-btn py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider text-center block"
            >
              Reserve A Suite Online
            </button>
          </div>

        </div>

        {/* Bottom copyright line */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-purple-300/60 gap-4">
          <p>© {new Date().getFullYear()} Reno Hotel Ipoh. All Rights Reserved.</p>
          <div className="flex items-center gap-6">
            <span>10, Lorong Lahat, Kampung Kuala Pari Hulu, 30200 Ipoh, Perak, Malaysia</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
