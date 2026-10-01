import React, { useState } from 'react';
import { ROOMS_DATA, Room } from '../data/hotelData';
import { Check, Users, Maximize, Bed, Sparkles, Coffee, Shield, ArrowRight } from 'lucide-react';

interface RoomsPageProps {
  onOpenBooking: (roomId?: string) => void;
  currency: string;
}

export const RoomsPage: React.FC<RoomsPageProps> = ({ onOpenBooking, currency }) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'suites' | 'king' | 'family'>('all');

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

  const filteredRooms = ROOMS_DATA.filter((room) => {
    if (activeFilter === 'suites') return room.name.toLowerCase().includes('suite');
    if (activeFilter === 'king') return room.bed.toLowerCase().includes('king');
    if (activeFilter === 'family') return room.name.toLowerCase().includes('family');
    return true;
  });

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      
      {/* Page Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/80 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-widest">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Accommodations & Suites</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white">
          Rooms & Executive Suites
        </h1>
        <p className="text-sm text-purple-200/80 font-light leading-relaxed">
          Crafted with velvet textures, Italian marble, and bespoke teakwood, each suite at Reno Hotel Ipoh offers an elevated luxury experience in Perak.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex justify-center">
        <div className="inline-flex p-1.5 bg-[#17082c] rounded-2xl border border-purple-800/40 gap-1 sm:gap-2">
          {[
            { id: 'all', label: 'All Suites & Rooms' },
            { id: 'suites', label: 'Executive Suites' },
            { id: 'king', label: 'King Bed Sanctuary' },
            { id: 'family', label: 'Family Residence' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                activeFilter === tab.id
                  ? 'bg-amber-400 text-purple-950 font-semibold shadow-lg'
                  : 'text-purple-200 hover:text-white hover:bg-purple-900/40'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Room Showcase Cards */}
      <div className="space-y-12">
        {filteredRooms.map((room) => (
          <div
            key={room.id}
            className="glass-card rounded-3xl overflow-hidden border border-amber-500/20 grid grid-cols-1 lg:grid-cols-12 gap-0 group hover:border-amber-400/50 transition-colors shadow-2xl"
          >
            {/* Image Col */}
            <div className="lg:col-span-5 relative h-72 lg:h-auto overflow-hidden">
              <img
                src={room.image}
                alt={room.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#130722] via-transparent to-transparent lg:hidden" />
              {room.featured && (
                <div className="absolute top-4 left-4 bg-amber-400 text-purple-950 font-semibold text-[11px] uppercase tracking-wider px-3 py-1 rounded-full shadow-lg">
                  Signature Suite
                </div>
              )}
            </div>

            {/* Content Col */}
            <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6">
              
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-purple-800/40 pb-3">
                  <div>
                    <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white group-hover:text-amber-200 transition-colors">
                      {room.name}
                    </h2>
                    <p className="text-xs text-amber-300 font-serif italic mt-0.5">
                      {room.tagline}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="font-serif text-2xl font-bold text-amber-300">
                      {symbol}{(room.priceMYR * rate).toFixed(0)}
                    </span>
                    <span className="text-xs text-purple-300 block">per night</span>
                  </div>
                </div>

                {/* Specs */}
                <div className="flex flex-wrap items-center gap-6 text-xs text-purple-200">
                  <div className="flex items-center gap-1.5">
                    <Maximize className="w-4 h-4 text-amber-400" />
                    <span>{room.size}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-amber-400" />
                    <span>{room.capacity}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Bed className="w-4 h-4 text-amber-400" />
                    <span>{room.bed}</span>
                  </div>
                </div>

                <p className="text-xs text-purple-200/80 leading-relaxed font-light">
                  {room.description}
                </p>

                {/* Key Amenities */}
                <div>
                  <span className="block text-[11px] font-semibold text-amber-300 uppercase tracking-wider mb-2">
                    Suite Amenities Included:
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs text-purple-200">
                    {room.amenities.map((amenity, i) => (
                      <div key={i} className="flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span>{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Booking CTA Bar */}
              <div className="pt-4 border-t border-purple-800/40 flex items-center justify-between gap-4">
                <span className="text-[11px] text-purple-300 hidden sm:inline">
                  Free cancellation up to 48h before check-in.
                </span>
                <button
                  onClick={() => onOpenBooking(room.id)}
                  className="gold-gradient-btn px-6 py-2.5 rounded-full text-xs uppercase tracking-wider font-semibold ml-auto"
                >
                  Book This Suite
                </button>
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* Comparison Feature Matrix */}
      <div className="glass-card rounded-3xl p-8 border border-amber-500/20 space-y-6">
        <h3 className="font-serif text-2xl font-bold text-white text-center">
          Suite Comparison Matrix
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-purple-200">
            <thead>
              <tr className="border-b border-purple-800/60 text-amber-300 font-serif text-sm">
                <th className="py-3 px-4">Room Type</th>
                <th className="py-3 px-4">Size</th>
                <th className="py-3 px-4">Capacity</th>
                <th className="py-3 px-4">Key Highlight</th>
                <th className="py-3 px-4 text-right">Price / Night</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-purple-900/40">
              {ROOMS_DATA.map((room) => (
                <tr key={room.id} className="hover:bg-purple-900/20 transition-colors">
                  <td className="py-3 px-4 font-semibold text-white">{room.name}</td>
                  <td className="py-3 px-4">{room.size}</td>
                  <td className="py-3 px-4">{room.capacity}</td>
                  <td className="py-3 px-4 text-purple-300">{room.amenities[0]}</td>
                  <td className="py-3 px-4 text-right font-bold text-amber-300">
                    {symbol}{(room.priceMYR * rate).toFixed(0)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
