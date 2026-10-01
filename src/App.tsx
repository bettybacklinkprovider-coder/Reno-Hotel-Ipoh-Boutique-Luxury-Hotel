import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { RoomsPage } from './pages/RoomsPage';
import { AboutGalleryPage } from './pages/AboutGalleryPage';
import { ContactPage } from './pages/ContactPage';
import { BookingModal } from './components/BookingModal';
import { AIConciergeDrawer } from './components/AIConciergeDrawer';
import { Sparkles, Calendar } from 'lucide-react';

export default function App() {
  const [activePage, setActivePage] = useState<string>('home');
  const [currency, setCurrency] = useState<string>('MYR');
  
  // Modals state
  const [bookingOpen, setBookingOpen] = useState<boolean>(false);
  const [selectedRoomId, setSelectedRoomId] = useState<string | undefined>(undefined);
  const [conciergeOpen, setConciergeOpen] = useState<boolean>(false);

  // Sync state with URL hash
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (['home', 'rooms', 'about-gallery', 'contact'].includes(hash)) {
        setActivePage(hash);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const changePage = (pageId: string) => {
    setActivePage(pageId);
    window.location.hash = pageId;
  };

  const handleOpenBooking = (roomId?: string) => {
    setSelectedRoomId(roomId);
    setBookingOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0c0414] text-[#f4effa] font-sans selection:bg-purple-700 selection:text-white">
      
      {/* Header Navigation */}
      <Header
        activePage={activePage}
        setActivePage={changePage}
        onOpenBooking={handleOpenBooking}
        onOpenConcierge={() => setConciergeOpen(true)}
        currency={currency}
        setCurrency={setCurrency}
      />

      {/* Main Page Render */}
      <main className="flex-1">
        {activePage === 'home' && (
          <HomePage
            setActivePage={changePage}
            onOpenBooking={handleOpenBooking}
            onOpenConcierge={() => setConciergeOpen(true)}
            currency={currency}
          />
        )}

        {activePage === 'rooms' && (
          <RoomsPage
            onOpenBooking={handleOpenBooking}
            currency={currency}
          />
        )}

        {activePage === 'about-gallery' && (
          <AboutGalleryPage
            onOpenBooking={() => handleOpenBooking()}
          />
        )}

        {activePage === 'contact' && (
          <ContactPage
            onOpenBooking={() => handleOpenBooking()}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        setActivePage={changePage}
        onOpenBooking={() => handleOpenBooking()}
      />

      {/* Floating Action Buttons (Bottom Right) */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
        <button
          onClick={() => setConciergeOpen(true)}
          className="glass-card px-4 py-2.5 rounded-full text-xs font-semibold text-amber-300 border border-amber-400/50 hover:border-amber-300 bg-purple-950/90 shadow-2xl flex items-center gap-2 hover:scale-105 transition-all group"
          aria-label="Open Ipoh AI Concierge"
        >
          <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
          <span className="hidden sm:inline">Ask AI Concierge</span>
        </button>

        <button
          onClick={() => handleOpenBooking()}
          className="gold-gradient-btn px-5 py-3 rounded-full text-xs uppercase tracking-wider font-bold shadow-2xl flex items-center gap-2 hover:scale-105 transition-all"
          aria-label="Book Your Stay"
        >
          <Calendar className="w-4 h-4" />
          <span className="hidden sm:inline">Book Room</span>
        </button>
      </div>

      {/* Interactive Reservation Drawer / Modal */}
      <BookingModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
        preSelectedRoomId={selectedRoomId}
        currency={currency}
      />

      {/* AI Concierge Drawer */}
      <AIConciergeDrawer
        isOpen={conciergeOpen}
        onClose={() => setConciergeOpen(false)}
        onOpenBooking={() => handleOpenBooking()}
      />

    </div>
  );
}
