export interface StoreInfo {
  name: string;
  tagline: string;
  description: string;
  announcement: string;
  supportEmail: string;
  supportPhone: string;
  address: string;
  workingHours: string;
  socials: {
    instagram: string;
    twitter: string;
    pinterest: string;
    github: string;
  };
  navigation: {
    label: string;
    href: string;
    badge?: string;
  }[];
}

export const STORE_SETTINGS: StoreInfo = {
  name: "KICKZ & CO.",
  tagline: "Essential Minimalist Design for Everyday Life",
  description: "Crafted apparel, artisanal footwear, and conscious workspace essentials. Designed with intention, made with timeless integrity.",
  announcement: "Complimentary Express Delivery on orders over ₹1,999 • Use code WELCOME10 for 10% off",
  supportEmail: "support@kickz-store.demo",
  supportPhone: "+91 (080) 4120-8899",
  address: "128 Indiranagar 100ft Road, 4th Block, Bengaluru, KA 560038, India",
  workingHours: "Monday – Saturday: 10:00 AM – 8:00 PM IST",
  socials: {
    instagram: "https://instagram.com",
    twitter: "https://twitter.com",
    pinterest: "https://pinterest.com",
    github: "https://github.com",
  },
  navigation: [
    { label: "Shop All", href: "/shop" },
    { label: "Clothing", href: "/categories/clothing" },
    { label: "Footwear", href: "/categories/footwear" },
    { label: "Electronics", href: "/categories/electronics" },
    { label: "Accessories", href: "/categories/accessories" },
    { label: "Home", href: "/categories/home-living" },
    { label: "About", href: "/about" },
    { label: "FAQ", href: "/faq" },
  ],
};

