export interface Testimonial {
  id: string;
  name: string;
  role: string;
  location: string;
  avatar: string;
  rating: number;
  content: string;
  productName: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "test-1",
    name: "Arjun Mehta",
    role: "Architect & Creative Director",
    location: "Bengaluru, India",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80",
    rating: 5,
    content: "The craftsmanship on the Air Rise 1 and Japanese workwear overshirt is remarkable. Clean packaging, lightning-fast delivery to Bengaluru, and silhouettes that easily hold up to international boutique quality.",
    productName: "Air Rise 1 Retro High",
  },
  {
    id: "test-2",
    name: "Priya Sengupta",
    role: "Senior Product Designer",
    location: "Mumbai, India",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80",
    rating: 5,
    content: "I've been wearing the Kensho pleated pants for weeks now. The drape is architectural yet relaxed enough for humid Mumbai summers. The aesthetic attention to detail across the whole store is refreshing.",
    productName: "Kensho Pleated Relaxed Trousers",
  },
  {
    id: "test-3",
    name: "Kabir Sharma",
    role: "Software Engineer",
    location: "New Delhi, India",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80",
    rating: 5,
    content: "The Typist 75 mechanical keyboard completely elevated my workspace acoustics. Smooth switches right out of the box with zero ping. Truly thoughtful curation across every department.",
    productName: "Typist 75 Gasket Mechanical Keyboard",
  },
  {
    id: "test-4",
    name: "Ananya Roy",
    role: "Visual Artist",
    location: "Kolkata, India",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80",
    rating: 5,
    content: "The essential 280 GSM tees are the holy grail of minimalist t-shirts. No shrinkage, collar stays sharp, and the earth tone palette matches everything in my wardrobe.",
    productName: "Essential Heavyweight Crewneck Tee",
  },
];

