import { GoogleGenAI } from '@google/genai';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message, history } = req.body || {};
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return res.status(500).json({ error: 'GEMINI_API_KEY is missing in server environment.' });
    }

    const ai = new GoogleGenAI({ apiKey });

    const systemInstruction = `You are the Virtual Luxury Concierge for Reno Hotel Ipoh, an exquisite boutique luxury hotel in Ipoh, Perak, Malaysia.
    Hotel Details:
    - Address: 10, Lorong Lahat, Kampung Kuala Pari Hulu, 30200 Ipoh, Perak, Malaysia
    - Phone: +60 5-246 0678
    - Rating: 4.9/5 stars (320+ luxury guest reviews)
    - Check-in: 3:00 PM | Check-out: 12:00 PM
    - Amenities: Free private parking, Wi-Fi, gourmet breakfast, Violet Tea Lounge & Coffee Bar, 24/7 concierge, luxury marble soaking tubs.
    
    Rooms available:
    1. Royal Executive Suite (RM 580/night) - Master bath, balcony, freestanding tub, king bed.
    2. Ipoh Heritage Suite (RM 420/night) - Colonial teakwood elegance, white coffee bar, rain shower.
    3. Deluxe King Sanctuary (RM 320/night) - Quiet luxury, plush mattress, executive workspace.
    4. Boutique Family Residence (RM 680/night) - 2 bedrooms, dual bathrooms, private living salon.
    5. Premier Twin Suite (RM 290/night) - Ergonomic twin beds, rain shower.

    Famous Nearby Attractions & Dining in Ipoh:
    - Ipoh White Coffee (Nam Heong, Sin Yoon Loong)
    - Ipoh Dim Sum (Foh San, Ming Court, Dynasty)
    - Bean Sprout Chicken & Salted Baked Chicken
    - Concubine Lane & Ipoh Old Town (5-8 mins away)
    - Cave Temples (Kek Lok Tong, Perak Cave Temple, Sam Poh Tong)
    - Tasik Cermin (Mirror Lake) & Qing Xin Ling Cultural Village
    
    Maintain a gracious, welcoming, luxurious tone at all times. Keep responses helpful, concise, and structured with bullet points where appropriate.`;

    const contents = [
      ...(history || []).map((h: { role: string; content: string }) => ({
        role: h.role === 'user' ? 'user' : 'model',
        parts: [{ text: h.content }],
      })),
      { role: 'user', parts: [{ text: message }] },
    ];

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const reply = response.text || "I am delighted to assist you with your stay at Reno Hotel Ipoh. How may I be of further service?";
    return res.status(200).json({ reply });
  } catch (err: any) {
    console.error('Concierge API error:', err);
    return res.status(500).json({ error: 'Failed to generate concierge response.' });
  }
}
