import React, { useState } from 'react';
import { HOTEL_DETAILS, FAQS } from '../data/hotelData';
import { Phone, MapPin, Mail, Clock, Send, CheckCircle2, ChevronDown, ChevronUp, Calendar, Compass, ShieldCheck } from 'lucide-react';

interface ContactPageProps {
  onOpenBooking: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onOpenBooking }) => {
  // Contact Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('General Inquiry');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      
      {/* Page Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/80 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-widest">
          <Phone className="w-3.5 h-3.5 text-amber-400" />
          <span>Front Desk & Reservations</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white">
          Contact & Reservation Desk
        </h1>
        <p className="text-sm text-purple-200/80 font-light leading-relaxed">
          Our dedicated hospitality concierge at Reno Hotel Ipoh is available 24/7 to assist with room bookings, private events, or travel inquiries in Perak.
        </p>
      </div>

      {/* Grid: Contact Info + Contact Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Column: Direct Hotel Info */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="glass-card p-6 rounded-2xl border border-amber-500/30 space-y-6">
            <h2 className="font-serif text-2xl font-bold text-white border-b border-purple-800/40 pb-3">
              Reno Hotel Details
            </h2>

            <div className="space-y-5 text-xs sm:text-sm text-purple-200">
              
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <strong className="text-white block font-semibold">Phone Number:</strong>
                  <a
                    href={`tel:${HOTEL_DETAILS.phone.replace(/\s+/g, '')}`}
                    className="text-amber-300 font-bold text-base hover:underline block mt-0.5"
                  >
                    {HOTEL_DETAILS.phone}
                  </a>
                  <span className="text-[11px] text-purple-300 block">24-Hour Desk Line</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <strong className="text-white block font-semibold">Hotel Address:</strong>
                  <span className="leading-relaxed block mt-0.5">{HOTEL_DETAILS.address}</span>
                  <span className="text-[11px] text-amber-300 block mt-1">Kampung Kuala Pari Hulu, 30200 Ipoh, Perak</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <strong className="text-white block font-semibold">Reservations Email:</strong>
                  <a
                    href={`mailto:${HOTEL_DETAILS.email}`}
                    className="text-amber-300 font-medium hover:underline block mt-0.5"
                  >
                    {HOTEL_DETAILS.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <strong className="text-white block font-semibold">Check-in / Check-out:</strong>
                  <span className="block mt-0.5">Check-in: {HOTEL_DETAILS.checkIn} · Check-out: {HOTEL_DETAILS.checkOut}</span>
                </div>
              </div>

            </div>

            <div className="pt-2">
              <button
                onClick={onOpenBooking}
                className="w-full gold-gradient-btn py-3 rounded-xl text-xs uppercase tracking-wider font-semibold text-center block shadow-lg"
              >
                Launch Instant Booking System
              </button>
            </div>
          </div>

          {/* Quick Distance Guide */}
          <div className="bg-[#18092a] p-6 rounded-2xl border border-purple-800/40 space-y-3 text-xs">
            <h3 className="font-serif text-base font-bold text-amber-300 flex items-center gap-2">
              <Compass className="w-4 h-4" /> Nearby Landmark Distances
            </h3>
            <div className="space-y-2 text-purple-200">
              <div className="flex justify-between border-b border-purple-900/40 pb-1.5">
                <span>Ipoh Railway Station (Majestic Station)</span>
                <span className="font-semibold text-amber-300">5 Mins</span>
              </div>
              <div className="flex justify-between border-b border-purple-900/40 pb-1.5">
                <span>Concubine Lane & Ipoh Old Town</span>
                <span className="font-semibold text-amber-300">6 Mins</span>
              </div>
              <div className="flex justify-between border-b border-purple-900/40 pb-1.5">
                <span>Sultan Azlan Shah Airport (IPH)</span>
                <span className="font-semibold text-amber-300">12 Mins</span>
              </div>
              <div className="flex justify-between pb-1">
                <span>Kek Lok Tong & Perak Cave Temple</span>
                <span className="font-semibold text-amber-300">15 Mins</span>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Contact Inquiry Form */}
        <div className="lg:col-span-7">
          <div className="glass-card p-8 rounded-3xl border border-amber-500/30 space-y-6">
            <h2 className="font-serif text-2xl font-bold text-white">
              Send an Inquiry to Concierge
            </h2>

            {submitted ? (
              <div className="bg-purple-900/40 border border-amber-400/40 p-8 rounded-2xl text-center space-y-4">
                <CheckCircle2 className="w-12 h-12 text-amber-400 mx-auto" />
                <h3 className="font-serif text-xl font-bold text-white">
                  Message Sent Successfully
                </h3>
                <p className="text-xs text-purple-200 max-w-md mx-auto leading-relaxed">
                  Thank you, <strong className="text-white">{name}</strong>. Our Front Desk team will respond to your inquiry at <strong className="text-amber-300">{email}</strong> within 2 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="gold-gradient-btn px-6 py-2 rounded-full text-xs font-semibold uppercase tracking-wider"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-amber-300 mb-1">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sarah Jenkins"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-[#1c0c36] border border-purple-700/60 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-purple-400/50 focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-amber-300 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. sarah@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#1c0c36] border border-purple-700/60 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-purple-400/50 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-purple-200 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +60 12-345 6789"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-[#1c0c36] border border-purple-700/60 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-purple-400/50 focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-purple-200 mb-1">
                      Inquiry Subject
                    </label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full bg-[#1c0c36] border border-purple-700/60 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                    >
                      <option value="General Inquiry" className="bg-[#1c0c36]">General Inquiry</option>
                      <option value="Suite Booking Help" className="bg-[#1c0c36]">Suite Booking Assistance</option>
                      <option value="Airport Transfer" className="bg-[#1c0c36]">Airport & Shuttle Transfer</option>
                      <option value="Private Event or Dining" className="bg-[#1c0c36]">Private Event / Dining</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-amber-300 mb-1">
                    Your Message *
                  </label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Tell us about your upcoming travel dates, room preferences, or special arrangements..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-[#1c0c36] border border-purple-700/60 rounded-xl p-3.5 text-xs text-white placeholder-purple-400/50 focus:outline-none focus:border-amber-400 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full gold-gradient-btn py-3 rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Inquiry to Reno Desk</span>
                </button>
              </form>
            )}

          </div>
        </div>

      </div>

      {/* Interactive Map & Location Banner */}
      <div className="glass-card p-8 rounded-3xl border border-amber-500/30 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-amber-400">
              Ipoh Location Map
            </span>
            <h3 className="font-serif text-2xl font-bold text-white">
              10, Lorong Lahat, Kampung Kuala Pari Hulu, 30200 Ipoh
            </h3>
          </div>
          <a
            href={`https://maps.google.com/?q=${encodeURIComponent(HOTEL_DETAILS.address)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="gold-gradient-btn px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider shrink-0"
          >
            Get Live Directions
          </a>
        </div>

        {/* Styled Simulated Map Frame */}
        <div className="relative h-64 w-full rounded-2xl overflow-hidden border border-purple-800/60 bg-[#120721] flex items-center justify-center p-6 text-center">
          <div className="space-y-3 z-10 max-w-md">
            <MapPin className="w-10 h-10 text-amber-400 mx-auto animate-bounce" />
            <h4 className="font-serif text-lg font-bold text-white">
              Reno Hotel Ipoh Location Pin
            </h4>
            <p className="text-xs text-purple-200">
              10, Lorong Lahat, Kampung Kuala Pari Hulu, 30200 Ipoh, Perak, Malaysia
            </p>
            <p className="text-[11px] text-amber-300 font-semibold">
              Latitude: {HOTEL_DETAILS.coordinates.lat} · Longitude: {HOTEL_DETAILS.coordinates.lng}
            </p>
          </div>
          <div className="absolute inset-0 bg-[radial-gradient(#3c166d_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />
        </div>
      </div>

      {/* FAQ Accordion Section */}
      <div className="space-y-6 max-w-4xl mx-auto">
        <div className="text-center space-y-2">
          <span className="text-xs font-semibold uppercase tracking-widest text-amber-400">
            Frequently Asked Questions
          </span>
          <h2 className="font-serif text-3xl font-bold text-white">
            Guest Information & FAQs
          </h2>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, idx) => (
            <div
              key={idx}
              className="glass-card rounded-2xl border border-purple-800/40 overflow-hidden"
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full text-left p-5 flex items-center justify-between text-xs sm:text-sm font-semibold text-white hover:text-amber-300 transition-colors"
              >
                <span>{faq.question}</span>
                {openFaq === idx ? (
                  <ChevronUp className="w-4 h-4 text-amber-400 shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-amber-400 shrink-0" />
                )}
              </button>

              {openFaq === idx && (
                <div className="px-5 pb-5 text-xs text-purple-200/90 leading-relaxed border-t border-purple-900/30 pt-3">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
