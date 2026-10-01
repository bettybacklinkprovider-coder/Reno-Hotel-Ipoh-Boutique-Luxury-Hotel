import React, { useState } from 'react';
import { GALLERY_DATA, GalleryItem, HOTEL_DETAILS, heroImg, executiveBathImg, ipohCoffeeTeaImg, bespokeConciergeImg } from '../data/hotelData';
import { Sparkles, Maximize2, X, ChevronRight, Award, Shield, Heart, Coffee, Star } from 'lucide-react';

interface AboutGalleryPageProps {
  onOpenBooking: () => void;
}

export const AboutGalleryPage: React.FC<AboutGalleryPageProps> = ({ onOpenBooking }) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'rooms' | 'interior' | 'dining' | 'surroundings'>('all');
  const [activeLightboxItem, setActiveLightboxItem] = useState<GalleryItem | null>(null);

  const filteredItems = GALLERY_DATA.filter((item) => {
    if (activeCategory === 'all') return true;
    return item.category === activeCategory;
  });

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
      
      {/* SECTION 1: ABOUT RENO HOTEL STORY */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/80 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>The Reno Legacy</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white leading-tight">
            An Ode to Timeless Hospitality in Perak
          </h1>

          <p className="text-sm text-purple-200/90 leading-relaxed font-light">
            Founded with a vision to bring bespoke boutique grandeur to Ipoh, Reno Hotel Ipoh stands as a sanctuary of quiet refinement. Nestled on Lorong Lahat in Kampung Kuala Pari Hulu, our hotel harmonizes Ipoh's historic tin-mining heritage with modern luxury.
          </p>

          <p className="text-sm text-purple-200/80 leading-relaxed font-light">
            From handcrafted purple velvet upholstery and Italian marble bathrooms to our signature Violet Tea Lounge serving artisanal Ipoh white coffee, every detail is curated to offer an enchanting escape.
          </p>

          <div className="grid grid-cols-2 gap-4 pt-2 text-center sm:text-left">
            <div className="bg-[#1a0832] p-4 rounded-xl border border-purple-800/40">
              <span className="font-serif text-3xl font-bold text-amber-300 block">4.9 / 5</span>
              <span className="text-xs text-purple-300">Guest Rating Score</span>
            </div>
            <div className="bg-[#1a0832] p-4 rounded-xl border border-purple-800/40">
              <span className="font-serif text-3xl font-bold text-amber-300 block">100%</span>
              <span className="text-xs text-purple-300">Personalized Service</span>
            </div>
          </div>
        </div>

        {/* Feature Image Stack */}
        <div className="relative">
          <div className="rounded-2xl overflow-hidden border border-amber-500/30 shadow-2xl">
            <img
              src={heroImg}
              alt="Reno Hotel Ipoh Story"
              className="w-full h-[450px] object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

      </div>

      {/* SECTION 2: BOUTIQUE LUXURY CONCEPT VALUES */}
      <div className="bg-gradient-to-b from-[#110522] via-[#1a0833] to-[#110522] p-8 sm:p-12 rounded-3xl border border-purple-900/50 space-y-8">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="text-xs font-semibold uppercase tracking-widest text-amber-400">
            Our Hospitality Pillars
          </span>
          <h2 className="font-serif text-3xl font-bold text-white">
            The Reno Boutique Experience
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#1d0a36] rounded-2xl border border-purple-800/40 overflow-hidden group hover:border-amber-400/40 transition-colors shadow-xl flex flex-col justify-between">
            <div className="relative h-44 overflow-hidden">
              <img
                src={executiveBathImg}
                alt="Uncompromising Luxury"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1d0a36] via-transparent to-transparent" />
              <div className="absolute top-3 left-3 w-9 h-9 rounded-xl bg-purple-950/80 border border-amber-400/30 flex items-center justify-center text-amber-400">
                <Award className="w-5 h-5" />
              </div>
            </div>
            <div className="p-6 pt-2 space-y-2">
              <h3 className="font-serif text-xl font-bold text-white">Uncompromising Luxury</h3>
              <p className="text-xs text-purple-200/80 leading-relaxed font-light">
                We select Egyptian cotton linens, freestanding marble soaks, and state-of-the-art acoustic soundproofing so every night is tranquil.
              </p>
            </div>
          </div>

          <div className="bg-[#1d0a36] rounded-2xl border border-purple-800/40 overflow-hidden group hover:border-amber-400/40 transition-colors shadow-xl flex flex-col justify-between">
            <div className="relative h-44 overflow-hidden">
              <img
                src={ipohCoffeeTeaImg}
                alt="Authentic Ipoh Flavors"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1d0a36] via-transparent to-transparent" />
              <div className="absolute top-3 left-3 w-9 h-9 rounded-xl bg-purple-950/80 border border-amber-400/30 flex items-center justify-center text-amber-400">
                <Coffee className="w-5 h-5" />
              </div>
            </div>
            <div className="p-6 pt-2 space-y-2">
              <h3 className="font-serif text-xl font-bold text-white">Authentic Ipoh Flavors</h3>
              <p className="text-xs text-purple-200/80 leading-relaxed font-light">
                Enjoy complimentary morning white coffee brewed from local roast beans, along with fresh kaya tarts and gourmet international options.
              </p>
            </div>
          </div>

          <div className="bg-[#1d0a36] rounded-2xl border border-purple-800/40 overflow-hidden group hover:border-amber-400/40 transition-colors shadow-xl flex flex-col justify-between">
            <div className="relative h-44 overflow-hidden">
              <img
                src={bespokeConciergeImg}
                alt="Attentive Concierge Care"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1d0a36] via-transparent to-transparent" />
              <div className="absolute top-3 left-3 w-9 h-9 rounded-xl bg-purple-950/80 border border-amber-400/30 flex items-center justify-center text-amber-400">
                <Heart className="w-5 h-5" />
              </div>
            </div>
            <div className="p-6 pt-2 space-y-2">
              <h3 className="font-serif text-xl font-bold text-white">Attentive Concierge Care</h3>
              <p className="text-xs text-purple-200/80 leading-relaxed font-light">
                From private cave tour recommendations to airport transfers, our staff ensures your trip to Perak is effortless and memorable.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 3: HOTEL INTERIOR & EXPERIENCE GALLERY */}
      <div className="space-y-8">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-semibold uppercase tracking-widest text-amber-400">
            Image Gallery
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
            Explore Reno Hotel Ipoh
          </h2>
          <p className="text-xs sm:text-sm text-purple-200/80">
            Click on any image to open the full-screen interactive lightbox view.
          </p>
        </div>

        {/* Gallery Category Filter */}
        <div className="flex justify-center">
          <div className="inline-flex p-1.5 bg-[#17082c] rounded-2xl border border-purple-800/40 gap-1 sm:gap-2 flex-wrap justify-center">
            {[
              { id: 'all', label: 'All Photos' },
              { id: 'rooms', label: 'Suites & Rooms' },
              { id: 'interior', label: 'Interiors & Baths' },
              { id: 'dining', label: 'Lounge & Dining' },
              { id: 'surroundings', label: 'Facade & Ipoh' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                  activeCategory === tab.id
                    ? 'bg-amber-400 text-purple-950 font-semibold shadow-lg'
                    : 'text-purple-200 hover:text-white hover:bg-purple-900/40'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveLightboxItem(item)}
              className="group relative h-72 rounded-2xl overflow-hidden border border-amber-500/20 shadow-xl cursor-pointer hover:border-amber-400/60 transition-colors"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d0317] via-black/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
              
              <div className="absolute top-3 right-3 p-2 bg-purple-950/80 rounded-full border border-amber-400/30 text-amber-300 opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-4 h-4" />
              </div>

              <div className="absolute bottom-4 left-4 right-4 text-left space-y-1">
                <h3 className="font-serif text-lg font-bold text-white group-hover:text-amber-200 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-purple-200/90 leading-tight">
                  {item.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeLightboxItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fadeIn">
          <div className="relative max-w-4xl w-full bg-[#130722] border border-amber-500/30 rounded-2xl overflow-hidden shadow-2xl">
            <button
              onClick={() => setActiveLightboxItem(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-purple-950/80 text-purple-200 hover:text-white border border-amber-400/30"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="max-h-[75vh] overflow-hidden bg-black flex items-center justify-center">
              <img
                src={activeLightboxItem.image}
                alt={activeLightboxItem.title}
                className="max-h-[75vh] w-auto object-contain"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="p-6 bg-[#1a0a30] border-t border-purple-800/40 space-y-1">
              <h3 className="font-serif text-xl font-bold text-white">
                {activeLightboxItem.title}
              </h3>
              <p className="text-xs text-purple-200">
                {activeLightboxItem.caption}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* CTA Bottom Banner */}
      <div className="glass-card p-8 rounded-3xl border border-amber-500/30 text-center space-y-4 max-w-3xl mx-auto">
        <h2 className="font-serif text-2xl font-bold text-white">
          Experience Reno Hotel Ipoh Firsthand
        </h2>
        <p className="text-xs text-purple-200 leading-relaxed">
          Reserve your preferred suite directly online to enjoy guaranteed best rates, complimentary welcome drinks, and priority check-in.
        </p>
        <button
          onClick={onOpenBooking}
          className="gold-gradient-btn px-8 py-3 rounded-full text-xs font-semibold uppercase tracking-wider inline-block"
        >
          Reserve Your Suite
        </button>
      </div>

    </div>
  );
};
