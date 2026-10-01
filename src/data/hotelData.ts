export interface Room {
  id: string;
  name: string;
  tagline: string;
  priceMYR: number;
  size: string;
  capacity: string;
  bed: string;
  image: string;
  description: string;
  amenities: string[];
  featured?: boolean;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'rooms' | 'interior' | 'dining' | 'surroundings';
  image: string;
  caption: string;
}

export const HOTEL_DETAILS = {
  name: "Reno Hotel Ipoh",
  tagline: "A Sanctuary of Refined Boutique Luxury in Perak",
  phone: "+60 5-246 0678",
  phoneFormatted: "+60 5-246 0678",
  email: "reservations@renohotelipoh.com",
  address: "10, Lorong Lahat, Kampung Kuala Pari Hulu, 30200 Ipoh, Perak, Malaysia",
  checkIn: "3:00 PM",
  checkOut: "12:00 PM",
  rating: 4.9,
  reviewsCount: 328,
  coordinates: {
    lat: 4.5826,
    lng: 101.0772,
  },
};

export const ROOMS_DATA: Room[] = [
  {
    id: "royal-suite",
    name: "Royal Executive Suite",
    tagline: "Unrivaled luxury with private lounge area and master bath",
    priceMYR: 580,
    size: "65 m² / 700 ft²",
    capacity: "2 Adults + 1 Child",
    bed: "1 Super King Bed",
    image: "/src/assets/images/deluxe_suite_reno_1790847456833.jpg",
    description: "Designed for discerning travelers seeking peak elegance. The Royal Executive Suite features bespoke velvet furniture, a marble master bath with a deep soaking tub, and floor-to-ceiling windows overlooking Ipoh's verdant skyline.",
    amenities: [
      "Freestanding Soaking Tub",
      "Private Balcony & City View",
      "Espresso Coffee Bar",
      "Egyptian Cotton 800-Thread Linens",
      "Personalized Concierge Service",
      "Walk-in Rain Shower",
      "55-inch Smart OLED TV",
      "Complimentary Gourmet Breakfast"
    ],
    featured: true
  },
  {
    id: "ipoh-heritage",
    name: "Ipoh Heritage Suite",
    tagline: "Colonial charm blended with sleek modern boutique aesthetics",
    priceMYR: 420,
    size: "50 m² / 538 ft²",
    capacity: "2 Adults",
    bed: "1 Luxury King Bed",
    image: "/src/assets/images/hotel_lounge_reno_1790847468712.jpg",
    description: "Honoring Ipoh's historic legacy, this suite fuses handcrafted teakwood accents, custom brass fixtures, and soft mood lighting with cutting-edge comforts.",
    amenities: [
      "Teakwood Artisanal Furniture",
      "Artisanal Ipoh White Coffee Station",
      "Marble Rain Shower",
      "Smart Climate Control",
      "High-Speed Fiber Wi-Fi",
      "Soundproof Double-Glazed Windows"
    ],
    featured: true
  },
  {
    id: "deluxe-king",
    name: "Deluxe King Sanctuary",
    tagline: "Serene interior layout with refined purple velvet tones",
    priceMYR: 320,
    size: "38 m² / 409 ft²",
    capacity: "2 Adults",
    bed: "1 Plush King Bed",
    image: "/src/assets/images/executive_bath_reno_1790847480826.jpg",
    description: "A tranquil haven crafted with plush headboards, warm ambient cove illumination, and state-of-the-art acoustics for pure rejuvenation after exploring Ipoh.",
    amenities: [
      "Plush Pillow-Top Mattress",
      "Luxe Robes & Bath Slippers",
      "Dedicated Executive Workspace",
      "Stocked Gourmet Minibar",
      "Bluetooth Sound System"
    ],
    featured: true
  },
  {
    id: "boutique-family",
    name: "Boutique Family Residence",
    tagline: "Spacious dual-bedroom suite ideal for luxury group travel",
    priceMYR: 680,
    size: "80 m² / 860 ft²",
    capacity: "4 Adults + 1 Child",
    bed: "2 Queen Beds or 1 King + 2 Twin Beds",
    image: "/src/assets/images/hero_reno_hotel_1790847442817.jpg",
    description: "Designed specifically for family vacations or small groups wanting privacy without compromising on five-star luxury. Features dual vanity bathrooms and a central living salon.",
    amenities: [
      "Two Separate Bedrooms",
      "Spacious Living Room Salon",
      "Dual Vanity Bathrooms",
      "Child Amenities & Crib on Request",
      "Complimentary Valet Parking"
    ],
    featured: false
  },
  {
    id: "premier-twin",
    name: "Premier Twin Suite",
    tagline: "Modern sophistication with twin plush beds and quiet city outlook",
    priceMYR: 290,
    size: "35 m² / 376 ft²",
    capacity: "2 Adults",
    bed: "2 Twin Bed Systems",
    image: "/src/assets/images/deluxe_suite_reno_1790847456833.jpg",
    description: "Perfect for corporate guests or companions exploring Ipoh's vibrant culture, offering custom ergonomic beds and ultra-quiet room acoustics.",
    amenities: [
      "Ergonomic Twin Mattresses",
      "Rain Shower Spa",
      "In-Room Safe & Laptop Vault",
      "Filter Water Dispenser",
      "24/7 Room Service"
    ],
    featured: false
  }
];

export const GALLERY_DATA: GalleryItem[] = [
  {
    id: "g1",
    title: "Reno Hotel Grand Facade at Twilight",
    category: "surroundings",
    image: "/src/assets/images/hero_reno_hotel_1790847442817.jpg",
    caption: "The illuminated exterior displaying sophisticated purple and gold accents."
  },
  {
    id: "g2",
    title: "Royal Executive Bedroom Suite",
    category: "rooms",
    image: "/src/assets/images/deluxe_suite_reno_1790847456833.jpg",
    caption: "High thread-count linens, custom headboard, and ambient bedside lighting."
  },
  {
    id: "g3",
    title: "Violet Velvet Lounge & Tea Parlor",
    category: "dining",
    image: "/src/assets/images/hotel_lounge_reno_1790847468712.jpg",
    caption: "An intimate sanctuary for enjoying Ipoh White Coffee and afternoon high tea."
  },
  {
    id: "g4",
    title: "Marble Soaking Bath Sanctuary",
    category: "interior",
    image: "/src/assets/images/executive_bath_reno_1790847480826.jpg",
    caption: "Deep freestanding soaking tub with Italian marble and custom bronze fittings."
  },
  {
    id: "g5",
    title: "Bespoke Guest Lobby Reception",
    category: "interior",
    image: "/src/assets/images/hotel_lounge_reno_1790847468712.jpg",
    caption: "Personalized check-in experience with signature floral welcome elixir."
  },
  {
    id: "g6",
    title: "Ipoh Heritage Corridor",
    category: "surroundings",
    image: "/src/assets/images/hero_reno_hotel_1790847442817.jpg",
    caption: "Subtle architecture blending local Perak heritage with boutique modernism."
  }
];

export const EXPERIENCES = [
  {
    id: "exp-1",
    title: "Artisanal Ipoh Coffee & High Tea",
    description: "Savor world-renowned Ipoh white coffee brewed fresh alongside delicate French pastries in our Violet Lounge.",
    icon: "Coffee"
  },
  {
    id: "exp-2",
    title: "24/7 Bespoke Concierge",
    description: "Our dedicated team arranges private transportation, restaurant reservations at top Ipoh dim sum spots, and guided cave tours.",
    icon: "Concierge"
  },
  {
    id: "exp-3",
    title: "Spa & Aromatherapy Soaks",
    description: "Unwind with our signature lavender-infused essential oils, plush plush robes, and in-suite spa bath rituals.",
    icon: "Sparkles"
  },
  {
    id: "exp-4",
    title: "Prime Location in Perak",
    description: "Minutes away from Ipoh Railway Station, Old Town Heritage Trail, Concubine Lane, and limestone karst cave temples.",
    icon: "MapPin"
  }
];

export const FAQS = [
  {
    question: "What are the check-in and check-out times at Reno Hotel Ipoh?",
    answer: "Standard check-in begins at 3:00 PM, and check-out is by 12:00 PM (noon). Early check-in or late check-out can be requested subject to availability."
  },
  {
    question: "Is private parking available for hotel guests?",
    answer: "Yes, Reno Hotel Ipoh provides complimentary secure private parking with 24-hour surveillance for all registered in-house guests."
  },
  {
    question: "Is breakfast included in room reservations?",
    answer: "Gourmet daily breakfast is complimentary for guests staying in our Royal Executive Suite and Ipoh Heritage Suite, and can be added to any room booking."
  },
  {
    question: "How far is Reno Hotel Ipoh from Ipoh Old Town & Concubine Lane?",
    answer: "The hotel is conveniently situated approximately 5-8 minutes by car or taxi from Ipoh Old Town, Ipoh Railway Station, and Concubine Lane."
  },
  {
    question: "Can the hotel assist with airport transfers or local tours?",
    answer: "Absolutely. Our Concierge team can coordinate private transfers to/from Sultan Azlan Shah Airport (IPH) or Penang/KLIA, as well as customized Ipoh sightseeing itineraries."
  }
];
