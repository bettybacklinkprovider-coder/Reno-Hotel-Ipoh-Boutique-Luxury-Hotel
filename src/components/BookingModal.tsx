import React, { useState, useEffect } from 'react';
import { X, Calendar, User, Sparkles, CheckCircle2, Phone, Shield, Coffee, Car, Heart } from 'lucide-react';
import { ROOMS_DATA, HOTEL_DETAILS } from '../data/hotelData';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preSelectedRoomId?: string;
  currency: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  preSelectedRoomId,
  currency,
}) => {
  const [selectedRoomId, setSelectedRoomId] = useState<string>(
    preSelectedRoomId || ROOMS_DATA[0].id
  );
  
  // Default dates: tomorrow check-in, +2 days check-out
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const dayAfterTomorrow = new Date(today);
  dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 3);

  const [checkIn, setCheckIn] = useState<string>(
    tomorrow.toISOString().split('T')[0]
  );
  const [checkOut, setCheckOut] = useState<string>(
    dayAfterTomorrow.toISOString().split('T')[0]
  );
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);

  // Add-ons
  const [addBreakfast, setAddBreakfast] = useState(true);
  const [addShuttle, setAddShuttle] = useState(false);
  const [addRomantic, setAddRomantic] = useState(false);

  // Form Fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');

  // Confirmation state
  const [confirmed, setConfirmed] = useState(false);
  const [bookingRef, setBookingRef] = useState('');

  useEffect(() => {
    if (preSelectedRoomId) {
      setSelectedRoomId(preSelectedRoomId);
    }
  }, [preSelectedRoomId]);

  if (!isOpen) return null;

  const currentRoom = ROOMS_DATA.find((r) => r.id === selectedRoomId) || ROOMS_DATA[0];

  // Currency conversion multiplier
  const getCurrencyRate = () => {
    if (currency === 'USD') return 0.23;
    if (currency === 'SGD') return 0.31;
    return 1.0; // MYR
  };

  const getCurrencySymbol = () => {
    if (currency === 'USD') return '$';
    if (currency === 'SGD') return 'S$';
    return 'RM ';
  };

  // Calculate nights
  const start = new Date(checkIn);
  const end = new Date(checkOut);
  const diffTime = Math.max(0, end.getTime() - start.getTime());
  const nights = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));

  // Costs calculation in MYR
  const roomCostMYR = currentRoom.priceMYR * nights;
  const breakfastCostMYR = addBreakfast ? 45 * adults * nights : 0;
  const shuttleCostMYR = addShuttle ? 120 : 0;
  const romanticCostMYR = addRomantic ? 180 : 0;
  const totalMYR = roomCostMYR + breakfastCostMYR + shuttleCostMYR + romanticCostMYR;

  const rate = getCurrencyRate();
  const symbol = getCurrencySymbol();

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const randomRef = 'RNH-' + Math.floor(100000 + Math.random() * 900000);
    setBookingRef(randomRef);
    setConfirmed(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-[#130722] border border-amber-500/30 rounded-2xl shadow-2xl overflow-hidden my-8 text-purple-100">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#1b0a33] border-b border-purple-800/40">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <h3 className="font-serif text-xl font-bold text-white tracking-wide">
              {confirmed ? 'Reservation Confirmed' : 'Reserve Your Stay at Reno Hotel Ipoh'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-purple-300 hover:text-white hover:bg-purple-900/50 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {confirmed ? (
          /* Confirmation State */
          <div className="p-8 space-y-6 text-center">
            <div className="w-16 h-16 bg-amber-400/20 text-amber-400 rounded-full flex items-center justify-center mx-auto border border-amber-400/40">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="text-xs font-semibold text-amber-400 uppercase tracking-widest">
                Booking Reference
              </span>
              <h2 className="font-mono text-3xl font-bold text-white mt-1">
                {bookingRef}
              </h2>
            </div>

            <div className="bg-[#1e0c38] border border-amber-500/20 rounded-xl p-5 max-w-md mx-auto text-left text-xs space-y-2">
              <div className="flex justify-between border-b border-purple-800/40 pb-2">
                <span className="text-purple-300">Guest Name:</span>
                <span className="font-semibold text-white">{fullName}</span>
              </div>
              <div className="flex justify-between border-b border-purple-800/40 pb-2">
                <span className="text-purple-300">Selected Room:</span>
                <span className="font-semibold text-amber-300">{currentRoom.name}</span>
              </div>
              <div className="flex justify-between border-b border-purple-800/40 pb-2">
                <span className="text-purple-300">Check-in / Check-out:</span>
                <span className="text-white">{checkIn} ({HOTEL_DETAILS.checkIn}) to {checkOut} ({HOTEL_DETAILS.checkOut})</span>
              </div>
              <div className="flex justify-between border-b border-purple-800/40 pb-2">
                <span className="text-purple-300">Duration & Guests:</span>
                <span className="text-white">{nights} Night(s) · {adults} Adult(s), {children} Child</span>
              </div>
              <div className="flex justify-between pt-1 text-sm font-bold text-amber-300">
                <span>Total Estimated:</span>
                <span>{symbol}{(totalMYR * rate).toFixed(2)}</span>
              </div>
            </div>

            <p className="text-xs text-purple-200/80 max-w-lg mx-auto leading-relaxed">
              Thank you, <strong className="text-white">{fullName}</strong>. A confirmation summary has been logged for our Front Desk team. You may present this booking code or contact us at <a href={`tel:${HOTEL_DETAILS.phone.replace(/\s+/g, '')}`} className="text-amber-300 underline">{HOTEL_DETAILS.phone}</a>.
            </p>

            <div className="pt-2 flex justify-center gap-4">
              <button
                onClick={onClose}
                className="gold-gradient-btn px-6 py-2.5 rounded-full text-xs uppercase tracking-wider font-semibold"
              >
                Close & Return to Hotel
              </button>
            </div>
          </div>
        ) : (
          /* Form State */
          <form onSubmit={handleBookingSubmit} className="p-6 space-y-6">
            
            {/* Step 1: Room Selection & Dates */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-amber-300 mb-1">
                  Select Room or Suite
                </label>
                <select
                  value={selectedRoomId}
                  onChange={(e) => setSelectedRoomId(e.target.value)}
                  className="w-full bg-[#1e0c38] border border-purple-700/60 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                >
                  {ROOMS_DATA.map((room) => (
                    <option key={room.id} value={room.id}>
                      {room.name} — {symbol}{(room.priceMYR * rate).toFixed(0)} / night
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-amber-300 mb-1">
                  Guests Count
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center justify-between bg-[#1e0c38] border border-purple-700/60 rounded-xl px-3 py-2 text-xs">
                    <span>Adults:</span>
                    <select
                      value={adults}
                      onChange={(e) => setAdults(Number(e.target.value))}
                      className="bg-transparent text-amber-300 font-semibold focus:outline-none"
                    >
                      {[1, 2, 3, 4].map((n) => (
                        <option key={n} value={n} className="bg-[#1e0c38] text-white">
                          {n}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex items-center justify-between bg-[#1e0c38] border border-purple-700/60 rounded-xl px-3 py-2 text-xs">
                    <span>Children:</span>
                    <select
                      value={children}
                      onChange={(e) => setChildren(Number(e.target.value))}
                      className="bg-transparent text-amber-300 font-semibold focus:outline-none"
                    >
                      {[0, 1, 2, 3].map((n) => (
                        <option key={n} value={n} className="bg-[#1e0c38] text-white">
                          {n}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Dates row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-purple-200 mb-1 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-amber-400" /> Check-in Date
                </label>
                <input
                  type="date"
                  required
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="w-full bg-[#1e0c38] border border-purple-700/60 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-purple-200 mb-1 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-amber-400" /> Check-out Date
                </label>
                <input
                  type="date"
                  required
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="w-full bg-[#1e0c38] border border-purple-700/60 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            {/* Optional Luxury Add-ons */}
            <div>
              <label className="block text-xs font-medium text-amber-300 mb-2">
                Enhance Your Stay (Optional Add-ons)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                
                <button
                  type="button"
                  onClick={() => setAddBreakfast(!addBreakfast)}
                  className={`p-3 rounded-xl border text-left transition-all text-xs flex flex-col justify-between ${
                    addBreakfast
                      ? 'bg-purple-900/60 border-amber-400 text-white'
                      : 'bg-[#18092e] border-purple-800/40 text-purple-300 hover:border-purple-600'
                  }`}
                >
                  <div className="flex items-center gap-2 font-medium">
                    <Coffee className="w-4 h-4 text-amber-400" />
                    <span>Gourmet Breakfast</span>
                  </div>
                  <span className="text-[11px] text-amber-300 mt-1">
                    +{symbol}{(45 * rate).toFixed(0)} / guest / day
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setAddShuttle(!addShuttle)}
                  className={`p-3 rounded-xl border text-left transition-all text-xs flex flex-col justify-between ${
                    addShuttle
                      ? 'bg-purple-900/60 border-amber-400 text-white'
                      : 'bg-[#18092e] border-purple-800/40 text-purple-300 hover:border-purple-600'
                  }`}
                >
                  <div className="flex items-center gap-2 font-medium">
                    <Car className="w-4 h-4 text-amber-400" />
                    <span>Airport Transfer</span>
                  </div>
                  <span className="text-[11px] text-amber-300 mt-1">
                    +{symbol}{(120 * rate).toFixed(0)} flat rate
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setAddRomantic(!addRomantic)}
                  className={`p-3 rounded-xl border text-left transition-all text-xs flex flex-col justify-between ${
                    addRomantic
                      ? 'bg-purple-900/60 border-amber-400 text-white'
                      : 'bg-[#18092e] border-purple-800/40 text-purple-300 hover:border-purple-600'
                  }`}
                >
                  <div className="flex items-center gap-2 font-medium">
                    <Heart className="w-4 h-4 text-amber-400" />
                    <span>VIP Welcome Set</span>
                  </div>
                  <span className="text-[11px] text-amber-300 mt-1">
                    +{symbol}{(180 * rate).toFixed(0)} flat rate
                  </span>
                </button>

              </div>
            </div>

            {/* Guest Personal Information */}
            <div className="space-y-3 pt-2 border-t border-purple-800/40">
              <span className="block text-xs font-semibold text-amber-300 uppercase tracking-wider">
                Guest Details
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <input
                    type="text"
                    required
                    placeholder="Full Name *"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-[#1e0c38] border border-purple-700/60 rounded-xl px-3 py-2 text-xs text-white placeholder-purple-400/60 focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    required
                    placeholder="Email Address *"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#1e0c38] border border-purple-700/60 rounded-xl px-3 py-2 text-xs text-white placeholder-purple-400/60 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <input
                    type="tel"
                    required
                    placeholder="Mobile / Phone Number *"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#1e0c38] border border-purple-700/60 rounded-xl px-3 py-2 text-xs text-white placeholder-purple-400/60 focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Special Requests (e.g. High floor, quiet room)"
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    className="w-full bg-[#1e0c38] border border-purple-700/60 rounded-xl px-3 py-2 text-xs text-white placeholder-purple-400/60 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>
            </div>

            {/* Total Price Bar & Submit Button */}
            <div className="pt-4 border-t border-purple-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#19092f] p-4 rounded-xl border border-amber-500/20">
              <div>
                <span className="text-[11px] text-purple-300 block">Estimated Total ({nights} Night{nights > 1 ? 's' : ''}):</span>
                <span className="font-serif text-2xl font-bold text-amber-300">
                  {symbol}{(totalMYR * rate).toFixed(2)}
                </span>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-full text-xs text-purple-300 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="gold-gradient-btn px-6 py-2.5 rounded-full text-xs uppercase tracking-wider font-semibold shadow-lg flex-1 sm:flex-none text-center"
                >
                  Confirm Reservation
                </button>
              </div>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
