import React, { useState } from 'react';
import { X, Sparkles, Send, Bot, User, RefreshCw, Compass, MapPin, Coffee, HelpCircle } from 'lucide-react';
import { HOTEL_DETAILS } from '../data/hotelData';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface AIConciergeDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenBooking: () => void;
}

export const AIConciergeDrawer: React.FC<AIConciergeDrawerProps> = ({
  isOpen,
  onClose,
  onOpenBooking,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: `Selamat Datang to Reno Hotel Ipoh! I am your personal virtual luxury concierge. How may I assist your stay in Ipoh today? Ask me about room amenities, local Ipoh gastronomy, heritage cave tours, or reservation policies.`
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const quickPrompts = [
    {
      label: "Best Dim Sum & White Coffee",
      text: "What are the top recommended dim sum restaurants and white coffee cafes near Reno Hotel Ipoh?"
    },
    {
      label: "Heritage Cave & Lake Attractions",
      text: "What are the must-visit natural limestone caves and cultural attractions in Ipoh?"
    },
    {
      label: "Suite Amenities & Check-in",
      text: "What are the check-in times and luxury amenities included in the Royal Executive Suite?"
    },
    {
      label: "Airport & Transport Tips",
      text: "How far is the hotel from Ipoh Railway Station and Sultan Azlan Shah Airport?"
    }
  ];

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim() || loading) return;

    const userMsg: Message = { role: 'user', content: query };
    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/concierge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          history: messages.map((m) => ({ role: m.role, content: m.content }))
        })
      });

      const data = await response.json();
      if (data.reply) {
        setMessages((prev) => [...prev, { role: 'assistant', content: data.reply }]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content: `I am delighted to assist you. Reno Hotel Ipoh is located at 10, Lorong Lahat, Ipoh, Perak (+60 5-246 0678). Standard check-in is 3 PM and check-out is 12 PM. Our concierge desk is also available 24/7.`
          }
        ]);
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: `Thank you for your inquiry! Reno Hotel Ipoh offers bespoke 5-star boutique hospitality at 10, Lorong Lahat, Ipoh. For immediate reservations, call +60 5-246 0678 or use our online booking system.`
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-md bg-[#120621] border-l border-amber-500/30 h-full flex flex-col shadow-2xl text-purple-100">
        
        {/* Header */}
        <div className="p-4 bg-[#1a0a30] border-b border-purple-800/40 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-amber-400/20 border border-amber-400/50 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
            </div>
            <div>
              <h3 className="font-serif text-base font-bold text-white leading-tight">
                Ipoh AI Concierge
              </h3>
              <p className="text-[11px] text-amber-300">Reno Hotel Personal Assistant</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-purple-300 hover:text-white hover:bg-purple-900/40 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Suggested Quick Prompts */}
        <div className="p-3 bg-[#17092c] border-b border-purple-900/40 space-y-1.5">
          <span className="text-[11px] text-purple-300 font-medium block">Quick Concierge Suggestions:</span>
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
            {quickPrompts.map((p, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(p.text)}
                className="shrink-0 bg-purple-900/40 border border-purple-700/40 hover:border-amber-400/60 text-purple-200 text-[11px] px-2.5 py-1 rounded-full transition-colors whitespace-nowrap"
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-2.5 ${
                msg.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {msg.role === 'assistant' && (
                <div className="w-7 h-7 rounded-full bg-amber-400/20 border border-amber-400/40 flex items-center justify-center shrink-0 mt-0.5">
                  <Bot className="w-3.5 h-3.5 text-amber-400" />
                </div>
              )}

              <div
                className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-amber-400 text-purple-950 font-medium rounded-tr-none'
                    : 'bg-[#1e0c38] border border-purple-800/60 text-purple-100 rounded-tl-none whitespace-pre-line'
                }`}
              >
                {msg.content}
              </div>

              {msg.role === 'user' && (
                <div className="w-7 h-7 rounded-full bg-purple-800/40 flex items-center justify-center shrink-0 mt-0.5">
                  <User className="w-3.5 h-3.5 text-purple-200" />
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2 text-xs text-amber-300/80 p-2 bg-purple-950/40 rounded-lg w-max">
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              <span>Consulting concierge knowledgebase...</span>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-[#18092d] border-t border-purple-800/40 space-y-2">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Ask about food, tours, rooms..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-[#220d3f] border border-purple-700/60 rounded-xl px-3 py-2 text-xs text-white placeholder-purple-400/60 focus:outline-none focus:border-amber-400"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="p-2.5 bg-amber-400 text-purple-950 rounded-xl disabled:opacity-50 hover:bg-amber-300 transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

          <div className="flex items-center justify-between text-[10px] text-purple-300/70 pt-1">
            <span>Direct Desk: {HOTEL_DETAILS.phone}</span>
            <button
              onClick={() => {
                onClose();
                onOpenBooking();
              }}
              className="text-amber-300 hover:underline font-semibold"
            >
              Book Room Now →
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
