import React, { useState } from 'react';
import { Calendar, ArrowRight, Star, MapPin, Phone, Coffee, Sparkles, Shield, Clock, ChevronRight, Check, Heart, Compass } from 'lucide-react';
import { HOTEL_DETAILS, ROOMS_DATA, GALLERY_DATA, EXPERIENCES, heroImg, hotelLoungeImg } from '../data/hotelData';

interface HomePageProps {
  setActivePage: (page: string) => void;
  onOpenBooking: (roomId?: string) => void;
  onOpenConcierge: () => void;
  currency: string;
}

export const HomePage: React.FC<HomePageProps> = ({
  setActivePage,
  onOpenBooking,
  onOpenConcierge,
  currency,
}) => {
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [guestCount, setGuestCount] = useState('2 Guests');

  const getCurrencyRate = () => {
    if (currency === 'USD') return 0.23;
    if (currency === 'SGD') return 0.31;
    return 1.0;
  };

  const getSymbol = () => {
    if (currency === 'USD') return '$';
    if (currency === 'SGD') return 'S$';
    return 'RM ';
  };

  const rate = getCurrencyRate();
  const symbol = getSymbol();

  const handleSearchAvailability = (e: React.FormEvent) => {
    e.preventDefault();
    onOpenBooking();
  };

  return (
    <div className="space-y-24 pb-20">
      
      {/* SECTION 1: LUXURY HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Image with Scrim Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroImg}
            alt="Reno Hotel Ipoh Exterior Facade"
            className="w-full h-full object-cover object-center scale-105 filter brightness-75"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c0414] via-[#0c0414]/70 to-[#0c0414]/40" />
          <div className="absolute inset-0 bg-radial from-amber-500/10 via-transparent to-purple-950/50" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8 mt-8">
          
          {/* Subtle Top Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-950/80 border border-amber-500/30 text-amber-300 text-xs font-medium tracking-widest uppercase backdrop-blur-md shadow-xl">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span>Boutique Luxury Hotel · Ipoh, Perak</span>
          </div>

          {/* Hotel Name & Headline */}
          <div className="space-y-4">
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-tight drop-shadow-md">
              Reno Hotel Ipoh
            </h1>
            <p className="font-serif italic text-xl sm:text-2xl text-amber-200/90 max-w-2xl mx-auto">
              A Refined Sanctuary of Opulence & Colonial Grace
            </p>
          </div>

          {/* Short Luxury Description */}
          <p className="text-sm sm:text-base text-purple-100/90 max-w-2xl mx-auto leading-relaxed font-light">
            Immerse yourself in bespoke 5-star comfort nestled in historic Ipoh. Featuring handcrafted suites, private soaking tubs, artisanal white coffee tastings, and unparalleled local concierge care.
          </p>

          {/* Call to Action Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onOpenBooking()}
              className="gold-gradient-btn px-8 py-3.5 rounded-full text-xs uppercase tracking-widest font-bold shadow-2xl hover:scale-105 transition-transform flex items-center gap-2 w-full sm:w-auto justify-center"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Your Stay</span>
            </button>
            <button
              onClick={() => {
                setActivePage('rooms');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-8 py-3.5 rounded-full text-xs uppercase tracking-widest font-semibold text-white bg-purple-900/60 border border-amber-500/30 hover:border-amber-400 hover:bg-purple-900/80 transition-all w-full sm:w-auto justify-center flex items-center gap-2"
            >
              <span>Explore Rooms</span>
              <ArrowRight className="w-4 h-4 text-amber-400" />
            </button>
          </div>

          {/* Floating Availability Quick Bar */}
          <div className="pt-8 max-w-4xl mx-auto">
            <form
              onSubmit={handleSearchAvailability}
              className="glass-card p-3 sm:p-4 rounded-2xl sm:rounded-full border border-amber-500/30 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-3"
            >
              <div className="flex-1 w-full sm:w-auto px-3 border-b sm:border-b-0 sm:border-r border-purple-800/50 pb-2 sm:pb-0 text-left">
                <span className="block text-[10px] uppercase font-semibold text-amber-400 tracking-wider">
                  Check-in
                </span>
                <input
                  type="date"
                  value={checkInDate}
                  onChange={(e) => setCheckInDate(e.target.value)}
                  className="bg-transparent text-xs text-white focus:outline-none w-full"
                />
              </div>

              <div className="flex-1 w-full sm:w-auto px-3 border-b sm:border-b-0 sm:border-r border-purple-800/50 pb-2 sm:pb-0 text-left">
                <span className="block text-[10px] uppercase font-semibold text-amber-400 tracking-wider">
                  Check-out
                </span>
                <input
                  type="date"
                  value={checkOutDate}
                  onChange={(e) => setCheckOutDate(e.target.value)}
                  className="bg-transparent text-xs text-white focus:outline-none w-full"
                />
              </div>

              <div className="flex-1 w-full sm:w-auto px-3 text-left">
                <span className="block text-[10px] uppercase font-semibold text-amber-400 tracking-wider">
                  Guests
                </span>
                <select
                  value={guestCount}
                  onChange={(e) => setGuestCount(e.target.value)}
                  className="bg-transparent text-xs text-white focus:outline-none w-full cursor-pointer"
                >
                  <option value="1 Guest" className="bg-[#18092a] text-white">1 Guest</option>
                  <option value="2 Guests" className="bg-[#18092a] text-white">2 Guests</option>
                  <option value="3 Guests" className="bg-[#18092a] text-white">3 Guests</option>
                  <option value="4+ Guests" className="bg-[#18092a] text-white">4+ Guests / Family</option>
                </select>
              </div>

              <button
                type="submit"
                className="gold-gradient-btn px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider shrink-0 w-full sm:w-auto"
              >
                Check Rates
              </button>
            </form>
          </div>

        </div>
      </section>

      {/* SECTION 2: WELCOME / ABOUT RENO HOTEL */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Visual Layout Container */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden border border-amber-500/20 shadow-2xl group">
              <img
                src={hotelLoungeImg}
                alt="Reno Hotel Violet Lounge & Tea Parlor"
                className="w-full h-[420px] object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d0416] via-transparent to-transparent opacity-80" />
            </div>

            {/* Overlaid Badge */}
            <div className="absolute -bottom-6 -right-2 sm:right-6 glass-card p-4 rounded-2xl border border-amber-400/40 shadow-2xl max-w-xs space-y-1">
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
                <span className="text-xs font-bold text-white ml-1">4.9 / 5</span>
              </div>
              <p className="text-xs text-purple-200">
                “Ipoh's most captivating boutique hotel experience.”
              </p>
            </div>
          </div>

          {/* Text Content */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-amber-400">
              <span className="w-8 h-[1px] bg-amber-400" />
              <span>Welcome to Reno Hotel Ipoh</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white leading-tight">
              Where Perak Heritage Meets Modern Boutique Grandeur
            </h2>

            <p className="text-sm text-purple-200/80 leading-relaxed font-light">
              Situated on Lorong Lahat in Kampung Kuala Pari Hulu, Reno Hotel Ipoh offers an intimate haven designed for guests who cherish tranquility, sophisticated luxury, and personal hospitality.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="bg-[#18082e] p-4 rounded-xl border border-purple-800/40">
                <div className="text-amber-400 font-serif text-2xl font-bold">5-Star</div>
                <div className="text-xs text-purple-200 mt-0.5">Boutique Luxury Standards</div>
              </div>
              <div className="bg-[#18082e] p-4 rounded-xl border border-purple-800/40">
                <div className="text-amber-400 font-serif text-2xl font-bold">5 Mins</div>
                <div className="text-xs text-purple-200 mt-0.5">To Ipoh Heritage Old Town</div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => {
                  setActivePage('about-gallery');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="gold-gradient-btn px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider inline-flex items-center gap-2"
              >
                <span>Read Our Full Story</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 3: ROOMS & ACCOMMODATION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-semibold uppercase tracking-widest text-amber-400">
            Accommodations
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
            Suites & Sanctuary Rooms
          </h2>
          <p className="text-xs sm:text-sm text-purple-200/80">
            Every room at Reno Hotel Ipoh is uniquely styled with custom purple textiles, marble accents, and plush Egyptian cotton bedding.
          </p>
        </div>

        {/* Room Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {ROOMS_DATA.slice(0, 3).map((room) => (
            <div
              key={room.id}
              className="glass-card glass-card-hover rounded-2xl overflow-hidden flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={room.image}
                    alt={room.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#130722] via-transparent to-transparent opacity-80" />
                  <div className="absolute top-3 right-3 bg-purple-950/80 backdrop-blur-md px-3 py-1 rounded-full border border-amber-400/40 text-amber-300 text-xs font-bold">
                    {symbol}{(room.priceMYR * rate).toFixed(0)} <span className="text-[10px] font-normal text-purple-200">/ night</span>
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <span className="text-[11px] text-amber-300 font-medium block">
                    {room.capacity} · {room.bed}
                  </span>
                  <h3 className="font-serif text-xl font-bold text-white group-hover:text-amber-200 transition-colors">
                    {room.name}
                  </h3>
                  <p className="text-xs text-purple-200/80 line-clamp-2 leading-relaxed">
                    {room.description}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 flex items-center justify-between gap-3 border-t border-purple-900/40 mt-4">
                <button
                  onClick={() => {
                    setActivePage('rooms');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-xs text-purple-200 hover:text-amber-300 font-medium transition-colors"
                >
                  View Details
                </button>
                <button
                  onClick={() => onOpenBooking(room.id)}
                  className="gold-gradient-btn px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider"
                >
                  Book Room
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center pt-4">
          <button
            onClick={() => {
              setActivePage('rooms');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-8 py-3 rounded-full text-xs font-semibold uppercase tracking-wider text-amber-300 border border-amber-400/40 hover:bg-amber-400/10 transition-colors inline-flex items-center gap-2"
          >
            <span>View All Rooms & Suites</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* SECTION 4: HOTEL EXPERIENCE */}
      <section className="bg-gradient-to-b from-[#10051e] via-[#1a0833] to-[#10051e] py-16 border-y border-purple-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-semibold uppercase tracking-widest text-amber-400">
              The Guest Experience
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
              Curated Comfort & Bespoke Service
            </h2>
            <p className="text-xs sm:text-sm text-purple-200/80">
              We focus on the small details that create lasting memories during your visit to Perak.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {EXPERIENCES.map((exp) => {
              const renderIcon = () => {
                if (exp.icon === 'Coffee') return <Coffee className="w-4 h-4 text-amber-300" />;
                if (exp.icon === 'MapPin') return <MapPin className="w-4 h-4 text-amber-300" />;
                if (exp.icon === 'Concierge') return <Clock className="w-4 h-4 text-amber-300" />;
                return <Sparkles className="w-4 h-4 text-amber-300" />;
              };

              return (
                <div
                  key={exp.id}
                  className="glass-card glass-card-hover rounded-2xl overflow-hidden border border-purple-800/40 flex flex-col justify-between group hover:border-amber-400/50 transition-all duration-300 shadow-xl"
                >
                  <div>
                    {/* Experience Image Header */}
                    <div className="relative h-44 overflow-hidden">
                      <img
                        src={exp.image}
                        alt={exp.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#140828] via-purple-950/20 to-transparent" />
                      <div className="absolute top-3 left-3 w-9 h-9 rounded-xl bg-purple-950/80 border border-amber-400/40 backdrop-blur-md flex items-center justify-center shadow-lg">
                        {renderIcon()}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5 space-y-2.5">
                      <h3 className="font-serif text-lg font-bold text-white group-hover:text-amber-200 transition-colors">
                        {exp.title}
                      </h3>
                      <p className="text-xs text-purple-200/85 leading-relaxed font-light">
                        {exp.description}
                      </p>
                    </div>
                  </div>

                  <div className="p-5 pt-0">
                    <button
                      onClick={() => {
                        if (exp.id === 'exp-2') {
                          onOpenConcierge();
                        } else if (exp.id === 'exp-4') {
                          setActivePage('contact');
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        } else {
                          setActivePage('about-gallery');
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }
                      }}
                      className="inline-flex items-center gap-1.5 text-xs text-amber-300 font-semibold hover:text-amber-200 transition-colors pt-2 border-t border-purple-800/30 w-full"
                    >
                      <span>Explore {exp.title.split(' ')[0]}</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* AI Concierge Banner Callout */}
          <div className="glass-card p-6 rounded-2xl border border-amber-500/30 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <div className="inline-flex items-center gap-1.5 text-xs text-amber-300 font-semibold uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Virtual AI Luxury Concierge</span>
              </div>
              <h3 className="font-serif text-xl font-bold text-white">
                Planning your Ipoh food or heritage itinerary?
              </h3>
              <p className="text-xs text-purple-200 max-w-xl">
                Ask our AI Concierge for instant recommendations on Ipoh White Coffee, dim sum spots, limestone caves, and check-in assistance.
              </p>
            </div>
            <button
              onClick={onOpenConcierge}
              className="gold-gradient-btn px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider shrink-0"
            >
              Ask AI Concierge Now
            </button>
          </div>

        </div>
      </section>

      {/* SECTION 5: GALLERY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-widest text-amber-400">
              Visual Showcase
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
              Gallery of Reno Hotel Ipoh
            </h2>
          </div>
          <button
            onClick={() => {
              setActivePage('about-gallery');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-xs text-amber-300 hover:text-white font-medium flex items-center gap-1"
          >
            <span>View Full Gallery Page</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {GALLERY_DATA.slice(0, 6).map((item) => (
            <div
              key={item.id}
              className="group relative h-64 rounded-2xl overflow-hidden border border-purple-800/40 shadow-xl cursor-pointer"
              onClick={() => {
                setActivePage('about-gallery');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e0419] via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
              <div className="absolute bottom-4 left-4 right-4 text-left">
                <h4 className="font-serif text-base font-bold text-white">
                  {item.title}
                </h4>
                <p className="text-[11px] text-amber-200/90 truncate">
                  {item.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 6: LOCATION & CONTACT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-card p-8 sm:p-12 rounded-3xl border border-amber-500/30 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          
          {/* Address & Contact Info */}
          <div className="space-y-6">
            <span className="text-xs font-semibold uppercase tracking-widest text-amber-400">
              Location & Reservations
            </span>

            <h2 className="font-serif text-3xl font-bold text-white">
              Visit Us in Ipoh, Perak
            </h2>

            <div className="space-y-4 text-xs sm:text-sm text-purple-200/90">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-semibold mb-0.5">Address:</strong>
                  <span>{HOTEL_DETAILS.address}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-semibold mb-0.5">Direct Desk Phone:</strong>
                  <a
                    href={`tel:${HOTEL_DETAILS.phone.replace(/\s+/g, '')}`}
                    className="text-amber-300 font-semibold hover:underline"
                  >
                    {HOTEL_DETAILS.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-semibold mb-0.5">Operating Hours:</strong>
                  <span>Front Desk 24/7 · Check-in 3:00 PM · Check-out 12:00 PM</span>
                </div>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap gap-4">
              <button
                onClick={() => onOpenBooking()}
                className="gold-gradient-btn px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider"
              >
                Book Your Stay
              </button>
              <button
                onClick={() => {
                  setActivePage('contact');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider text-purple-200 bg-purple-900/40 border border-purple-700/50 hover:border-amber-400/50 transition-colors"
              >
                Contact Form & Map
              </button>
            </div>
          </div>

          {/* Interactive Map Card Area */}
          <div className="bg-[#18092a] border border-amber-500/20 rounded-2xl p-6 space-y-4 text-center">
            <div className="w-12 h-12 rounded-full bg-amber-400/10 border border-amber-400/40 text-amber-400 flex items-center justify-center mx-auto">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-bold text-white">
              Prime Location in Perak
            </h3>
            <p className="text-xs text-purple-200 leading-relaxed">
              Nestled off Lorong Lahat in Kampung Kuala Pari Hulu, Reno Hotel Ipoh offers quiet seclusion while keeping you 5-8 minutes away from Ipoh Railway Station, Old Town, and famous caves.
            </p>
            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(HOTEL_DETAILS.address)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs text-amber-300 hover:text-amber-200 font-semibold underline pt-2"
            >
              <MapPin className="w-4 h-4" />
              <span>Open in Google Maps</span>
            </a>
          </div>

        </div>
      </section>

    </div>
  );
};
