import { Product } from "@/types/product";

export const PRODUCTS: Product[] = [
  // 1. Footwear - Air Rise 1 (Featured in Reference 1)
  {
    id: "prod-foot-01",
    slug: "air-rise-1-retro",
    name: "Air Rise 1 Retro High",
    description: "The quintessential high-top crafted with premium tumbled leather panels, iconic color blocking, and encapsulated Air-sole cushioning for timeless comfort on and off the court.",
    price: 6499,
    originalPrice: 7999,
    category: "footwear",
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1000&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=1000&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=1000&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=1000&auto=format&fit=crop&q=80",
    ],
    rating: 4.9,
    reviewCount: 148,
    stock: 18,
    featured: true,
    bestseller: true,
    createdAt: "2026-01-15T08:00:00Z",
    variants: {
      colors: ["White / Orange / Black", "Triple White", "Varsity Black"],
      sizes: ["7 US", "8 US", "9 US", "10 US", "11 US"],
    },
    specifications: {
      "Upper Material": "Full-grain tumbled leather",
      "Sole Material": "Durable vulcanized rubber",
      "Cushioning": "Encapsulated Air unit in heel",
      "Closure": "Traditional lace-up with spare laces",
      "Origin": "Handcrafted in Vietnam",
    },
  },

  // 2. Clothing - Kensho Pleated Pants (Featured in Reference 3)
  {
    id: "prod-cloth-01",
    slug: "kensho-pleated-trousers",
    name: "Kensho Pleated Relaxed Trousers",
    description: "Architectural front pleats with an easy, tapered drape. Cut from breathable Japanese cotton-linen blend fabric, designed for casual sophistication in warm climates.",
    price: 3499,
    originalPrice: 4299,
    category: "clothing",
    images: [
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=1000&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1509551388413-e18d0ac5d495?w=1000&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1516826957135-700dedea698c?w=1000&auto=format&fit=crop&q=80",
    ],
    rating: 4.8,
    reviewCount: 64,
    stock: 24,
    featured: true,
    bestseller: true,
    createdAt: "2026-01-20T10:00:00Z",
    variants: {
      colors: ["Oatmeal Khaki", "Deep Forest", "Washed Charcoal", "Bone White"],
      sizes: ["S", "M", "L", "XL", "2XL"],
    },
    specifications: {
      "Fabric": "65% Long-staple Cotton, 35% Belgian Linen",
      "Fit": "Relaxed balloon taper",
      "Waist": "Elasticized back with hidden drawstring",
      "Pockets": "Two slanted side pockets, two welt back pockets",
      "Care": "Machine wash cold delicate, hang dry",
    },
  },

  // 3. Clothing - Men's Essential Heavyweight Tee (Reference 2 Ugmonk style)
  {
    id: "prod-cloth-02",
    slug: "essential-heavyweight-crewneck-tee",
    name: "Essential Heavyweight Crewneck Tee",
    description: "Crafted from 280 GSM combed organic cotton with a refined structured drape that holds its boxy form wash after wash without cling or distortion.",
    price: 1499,
    originalPrice: 1999,
    category: "clothing",
    images: [
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=1000&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=1000&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=1000&auto=format&fit=crop&q=80",
    ],
    rating: 4.9,
    reviewCount: 280,
    stock: 75,
    featured: true,
    bestseller: true,
    createdAt: "2026-02-01T12:00:00Z",
    variants: {
      colors: ["Port Red", "Deep Forest", "Bone White", "Charcoal Gray", "Washed Indigo", "Matte Black", "Olive Green"],
      sizes: ["XS", "S", "M", "L", "XL", "2XL"],
    },
    specifications: {
      "Material": "100% GOTS Certified Organic Cotton",
      "Weight": "280 GSM heavyweight jersey",
      "Collar": "1x1 ribbed reinforced collar band",
      "Stitching": "Twin-needle hem and sleeve finish",
      "Pre-shrunk": "Yes, zero wash shrinkage",
    },
  },

  // 4. Clothing - Japan Green Outer Overshirt (Reference 4 Wink style)
  {
    id: "prod-cloth-03",
    slug: "japan-green-minimal-outer",
    name: "Japan Minimalist Utility Overshirt",
    description: "An effortless transitional layer influenced by Japanese workwear, tailored with twin chest flap pockets, horn buttons, and a relaxed boxy cut.",
    price: 3999,
    originalPrice: 4999,
    category: "clothing",
    images: [
      "https://images.unsplash.com/photo-1544441893-675973e31985?w=1000&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?w=1000&auto=format&fit=crop&q=80",
    ],
    rating: 4.7,
    reviewCount: 42,
    stock: 14,
    featured: true,
    bestseller: false,
    createdAt: "2026-02-04T15:00:00Z",
    variants: {
      colors: ["Olive Moss", "Smoked Ash", "Midnight Navy"],
      sizes: ["S", "M", "L", "XL"],
    },
    specifications: {
      "Fabric": "100% Japanese Twill Cotton (320 GSM)",
      "Buttons": "Matte natural horn buttons",
      "Fit": "Oversized utility cut",
      "Origin": "Osaka, Japan",
    },
  },

  // 5. Clothing - Minimalist Soft Fleece Hoodie (Reference 4 style)
  {
    id: "prod-cloth-04",
    slug: "soft-cloud-fleece-hoodie",
    name: "Cloud Soft Loopback Hoodie",
    description: "Constructed with French terry loopback interior and clean exterior brushed cotton. Minimalist silhouette without gaudy logos or drawstring clutter.",
    price: 2799,
    originalPrice: 3499,
    category: "clothing",
    images: [
      "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=1000&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?w=1000&auto=format&fit=crop&q=80",
    ],
    rating: 4.8,
    reviewCount: 92,
    stock: 35,
    featured: false,
    bestseller: true,
    createdAt: "2026-02-05T09:30:00Z",
    variants: {
      colors: ["Sage Green", "Heather Gray", "Washed Cocoa", "Pitch Black"],
      sizes: ["S", "M", "L", "XL", "XXL"],
    },
    specifications: {
      "Fabric": "400 GSM 100% Combed Loopback Cotton",
      "Pocket": "Discreet concealed kangaroo pocket",
      "Hood": "Double-layered tailored hood",
      "Fit": "Relaxed drop shoulder",
    },
  },

  // 6. Clothing - Relaxed Linen Resort Shirt
  {
    id: "prod-cloth-05",
    slug: "relaxed-linen-resort-shirt",
    name: "Relaxed Linen Camp Collar Shirt",
    description: "Lightweight European flax linen woven loosely for maximum airflow on hot afternoons. Features an open camp collar and a clean straight hem.",
    price: 2299,
    originalPrice: 2899,
    category: "clothing",
    images: [
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=1000&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=1000&auto=format&fit=crop&q=80",
    ],
    rating: 4.6,
    reviewCount: 38,
    stock: 19,
    featured: false,
    bestseller: false,
    createdAt: "2026-02-10T14:10:00Z",
    variants: {
      colors: ["Crisp White", "Sand Dunes", "Sky Stripe"],
      sizes: ["S", "M", "L", "XL"],
    },
    specifications: {
      "Material": "100% Pure Normandy Linen",
      "Collar": "Cuban / Camp collar",
      "Buttons": "Mother-of-pearl accents",
      "Fit": "Relaxed resort fit",
    },
  },

  // 7. Clothing - Tailored Wool Blend Blazer
  {
    id: "prod-cloth-06",
    slug: "tailored-minimal-blazer",
    name: "Unstructured Minimal Wool Blazer",
    description: "Lightweight, unstructured tailoring with soft shoulders and half-canvas construction that marries casual comfort with boardroom refinement.",
    price: 7499,
    originalPrice: 9999,
    category: "clothing",
    images: [
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1000&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=1000&auto=format&fit=crop&q=80",
    ],
    rating: 4.9,
    reviewCount: 29,
    stock: 10,
    featured: true,
    bestseller: false,
    createdAt: "2026-02-12T11:00:00Z",
    variants: {
      colors: ["Charcoal Melange", "Deep Navy", "Olive Drab"],
      sizes: ["38R", "40R", "42R", "44R"],
    },
    specifications: {
      "Outer": "70% Virgin Wool, 30% Mulberry Silk",
      "Lining": "100% Bemberg Cupro (half-lined)",
      "Buttons": "Horn two-button stance",
      "Vent": "Dual side vents",
    },
  },

  // 8. Clothing - Japanese Selvedge Raw Denim
  {
    id: "prod-cloth-07",
    slug: "japanese-selvedge-raw-denim",
    name: "13.5oz Kuroki Selvedge Denim",
    description: "Woven on vintage shuttle looms in Okayama, Japan with custom red-line selvedge ID, pure indigo rope dye, and durable copper rivets.",
    price: 4999,
    originalPrice: 6200,
    category: "clothing",
    images: [
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=1000&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1542272604-780c96856592?w=1000&auto=format&fit=crop&q=80",
    ],
    rating: 4.9,
    reviewCount: 78,
    stock: 22,
    featured: false,
    bestseller: true,
    createdAt: "2026-02-14T16:00:00Z",
    variants: {
      colors: ["Raw Indigo", "Solid Black"],
      sizes: ["30x32", "32x32", "34x32", "36x32"],
    },
    specifications: {
      "Denim Mill": "Kuroki Mills (Okayama, Japan)",
      "Weight": "13.5 oz unsanforized selvedge",
      "Hardware": "Custom engraved copper rivets",
      "Fly": "Button fly with doughnut buttons",
    },
  },

  // 9. Footwear - Minimalist Calfskin Low Sneaker
  {
    id: "prod-foot-02",
    slug: "minimalist-calfskin-low-sneaker",
    name: "Court Low Calfskin Sneaker",
    description: "Understated luxury rendered in buttery Italian nappa calfskin, hand-stitched Margom rubber sole, and waxed cotton tonal laces.",
    price: 5299,
    originalPrice: 6999,
    category: "footwear",
    images: [
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=1000&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=1000&auto=format&fit=crop&q=80",
    ],
    rating: 4.8,
    reviewCount: 112,
    stock: 16,
    featured: true,
    bestseller: true,
    createdAt: "2026-01-25T13:40:00Z",
    variants: {
      colors: ["Pure White", "Off-White Chalk", "Monochrome Black"],
      sizes: ["7 US", "8 US", "9 US", "10 US", "11 US", "12 US"],
    },
    specifications: {
      "Leather": "Full-grain Italian Nappa calfskin",
      "Outsole": "Custom vulcanized Margom rubber",
      "Insole": "Ergonomic memory foam with calf lining",
      "Construction": "Stitched Strobel construction",
    },
  },

  // 10. Footwear - Urban Trail Runner Pro
  {
    id: "prod-foot-03",
    slug: "urban-trail-runner-pro",
    name: "AeroShield Trail Runner Pro",
    description: "Engineered ripstop mesh layered with water-repellent TPU film and aggressive lugged Vibram tread for all-terrain city and trail versatility.",
    price: 4499,
    originalPrice: 5499,
    category: "footwear",
    images: [
      "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=1000&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=1000&auto=format&fit=crop&q=80",
    ],
    rating: 4.7,
    reviewCount: 54,
    stock: 20,
    featured: false,
    bestseller: false,
    createdAt: "2026-02-03T18:00:00Z",
    variants: {
      colors: ["Slate Gray / Neon", "Desert Sand", "Triple Black"],
      sizes: ["8 US", "9 US", "10 US", "11 US"],
    },
    specifications: {
      "Upper": "Cordura ripstop + TPU reinforcements",
      "Outsole": "Vibram Megagrip lugged rubber",
      "Midsole": "High-rebound EVA foam",
      "Water Resistance": "DWR water-shedding coating",
    },
  },

  // 11. Footwear - Suede Chelsea Boot
  {
    id: "prod-foot-04",
    slug: "chelsea-boot-suede",
    name: "Classic Goodyear Welted Suede Chelsea",
    description: "Sleek tapered silhouette sculpted from water-resistant calf suede, fitted with flexible elastic side gussets and a sturdy crepe sole.",
    price: 6899,
    originalPrice: 8500,
    category: "footwear",
    images: [
      "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?w=1000&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=1000&auto=format&fit=crop&q=80",
    ],
    rating: 4.9,
    reviewCount: 46,
    stock: 12,
    featured: true,
    bestseller: false,
    createdAt: "2026-02-08T10:00:00Z",
    variants: {
      colors: ["Warm Snuff Suede", "Espresso Brown", "Midnight Black"],
      sizes: ["7 US", "8 US", "9 US", "10 US", "11 US"],
    },
    specifications: {
      "Upper": "Tuscan split calf suede",
      "Sole": "Natural plantation crepe rubber",
      "Welt": "360-degree Goodyear welted",
      "Pull Tab": "Woven reinforced grosgrain",
    },
  },

  // 12. Footwear - Slip-on Canvas Mule
  {
    id: "prod-foot-05",
    slug: "canvas-comfort-mule",
    name: "Studio Canvas Slip-On Mule",
    description: "An effortless slip-on made from 16oz washed cotton canvas with an ergonomic cork footbed and natural latex outsole for indoor-outdoor ease.",
    price: 2499,
    originalPrice: 2999,
    category: "footwear",
    images: [
      "https://images.unsplash.com/photo-1562183241-b937e95585b6?w=1000&auto=format&fit=crop&q=80",
    ],
    rating: 4.5,
    reviewCount: 31,
    stock: 25,
    featured: false,
    bestseller: false,
    createdAt: "2026-02-15T08:15:00Z",
    variants: {
      colors: ["Ecru Natural", "Charcoal Gray", "Army Olive"],
      sizes: ["7 US", "8 US", "9 US", "10 US"],
    },
    specifications: {
      "Upper": "16oz washed cotton duck canvas",
      "Footbed": "Anatomical molded cork with suede cover",
      "Sole": "Natural gum rubber",
    },
  },

  // 13. Footwear - High Performance Carbon Plate Racer
  {
    id: "prod-foot-06",
    slug: "carbon-propel-marathon-shoe",
    name: "HyperSpeed Carbon Plate Racer",
    description: "Built for breaking personal records with a full-length curved carbon fiber propulsion plate sandwiched between nitrogen-infused supercritical foam.",
    price: 8999,
    originalPrice: 10999,
    category: "footwear",
    images: [
      "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=1000&auto=format&fit=crop&q=80",
    ],
    rating: 5.0,
    reviewCount: 37,
    stock: 8,
    featured: false,
    bestseller: true,
    createdAt: "2026-02-18T12:00:00Z",
    variants: {
      colors: ["Electric Lime / White", "Pure Phantom"],
      sizes: ["8 US", "8.5 US", "9 US", "9.5 US", "10 US", "11 US"],
    },
    specifications: {
      "Plate": "100% full-length carbon composite",
      "Foam": "Supercritical Pebax foam (85% energy return)",
      "Drop": "8mm heel-to-toe drop",
      "Weight": "195g (Size 9 US)",
    },
  },

  // 14. Electronics - Studio ANC Wireless Headphones
  {
    id: "prod-elec-01",
    slug: "studio-anc-wireless-headphones",
    name: "Acoustic One Active Noise-Cancelling Headphones",
    description: "Precision-tuned 40mm beryllium drivers, hybrid active noise cancellation, lossless Bluetooth 5.3 LDAC, and 45 hours of continuous battery playback.",
    price: 12999,
    originalPrice: 15999,
    category: "electronics",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1000&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=1000&auto=format&fit=crop&q=80",
    ],
    rating: 4.9,
    reviewCount: 215,
    stock: 22,
    featured: true,
    bestseller: true,
    createdAt: "2026-01-10T09:00:00Z",
    variants: {
      colors: ["Matte Charcoal", "Silver Birch", "Desert Sand"],
    },
    specifications: {
      "Driver Unit": "40mm custom beryllium diaphragms",
      "Frequency Response": "10Hz - 40,000Hz (Hi-Res Audio)",
      "Battery Life": "45 hours (ANC on) / 60 hours (ANC off)",
      "Fast Charge": "10 min charge yields 5 hours playback",
      "Connectivity": "Bluetooth 5.3, Multipoint, 3.5mm AUX, USB-C Audio",
    },
  },

  // 15. Electronics - Custom Mechanical Keyboard 75%
  {
    id: "prod-elec-02",
    slug: "custom-mechanical-keyboard-75",
    name: "Typist 75 Gasket-Mounted Mechanical Keyboard",
    description: "CNC anodized aluminum chassis, south-facing RGB, factory-lubed pre-travel switches, and hot-swappable PCB designed for acoustic bliss.",
    price: 8499,
    originalPrice: 9999,
    category: "electronics",
    images: [
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=1000&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=1000&auto=format&fit=crop&q=80",
    ],
    rating: 4.9,
    reviewCount: 160,
    stock: 14,
    featured: true,
    bestseller: true,
    createdAt: "2026-01-18T11:00:00Z",
    variants: {
      colors: ["Space Gray", "Retro Cream", "Frosted Polycarbonate"],
    },
    specifications: {
      "Layout": "75% compact (82 keys + rotary knob)",
      "Switches": "Pre-lubed Linear Cream Yellow (45g)",
      "Keycaps": "PBT dye-sublimated cherry profile",
      "Battery": "4000mAh lithium battery (200 hours backlight off)",
    },
  },

  // 16. Electronics - Minimalist Desktop Bluetooth Speaker
  {
    id: "prod-elec-03",
    slug: "minimalist-desktop-speaker",
    name: "SoundBlock 360 Walnut Desktop Speaker",
    description: "Real American walnut casing enclosing dual passive radiators and a 30W neodymium full-range transducer for room-filling acoustic warmth.",
    price: 5499,
    originalPrice: 6999,
    category: "electronics",
    images: [
      "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=1000&auto=format&fit=crop&q=80",
    ],
    rating: 4.8,
    reviewCount: 77,
    stock: 17,
    featured: false,
    bestseller: false,
    createdAt: "2026-02-02T16:00:00Z",
    variants: {
      colors: ["Natural Walnut", "Nordic Ash", "Matte Black Ash"],
    },
    specifications: {
      "Power Output": "30W RMS (Peak 50W)",
      "Cabinet": "Solid CNC-milled walnut wood",
      "Battery": "18 hours battery with USB-C PD power bank output",
      "Waterproofing": "IPX5 splash resistant",
    },
  },

  // 17. Electronics - Smart Health & Sleep Tracker Ring
  {
    id: "prod-elec-04",
    slug: "smart-health-titanium-ring",
    name: "Aura Titanium Smart Health Ring",
    description: "Grade-5 aerospace titanium ring packed with clinical-grade infrared sensors monitoring sleep stages, HRV, body temperature, and daily recovery.",
    price: 11499,
    originalPrice: 13999,
    category: "electronics",
    images: [
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=1000&auto=format&fit=crop&q=80",
    ],
    rating: 4.7,
    reviewCount: 89,
    stock: 11,
    featured: true,
    bestseller: false,
    createdAt: "2026-02-07T14:30:00Z",
    variants: {
      colors: ["Stealth Black", "Brushed Silver", "Rose Gold"],
      sizes: ["Size 8", "Size 9", "Size 10", "Size 11", "Size 12"],
    },
    specifications: {
      "Material": "Aerospace Grade 5 Titanium + PVD coating",
      "Sensors": "Optical PPG, 3D accelerometer, NTC skin temperature",
      "Battery": "7 days battery life on a single 30-min charge",
      "Water Resistance": "100m water resistant (suitable for swimming)",
    },
  },

  // 18. Electronics - MagSafe 3-in-1 Charging Stand
  {
    id: "prod-elec-05",
    slug: "magsafe-3in1-charging-stand",
    name: "Architectural 3-in-1 Fast Wireless Stand",
    description: "Machined from solid aluminum with weighted zinc base. Powers your phone (15W Qi2), earbuds (5W), and smartwatch simultaneously with zero cable chaos.",
    price: 3499,
    originalPrice: 4499,
    category: "electronics",
    images: [
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=1000&auto=format&fit=crop&q=80",
    ],
    rating: 4.6,
    reviewCount: 52,
    stock: 30,
    featured: false,
    bestseller: false,
    createdAt: "2026-02-11T12:00:00Z",
    variants: {
      colors: ["Space Gray", "Chalk White"],
    },
    specifications: {
      "Input": "USB-C 45W PD (cable & adapter included)",
      "Wireless Output": "15W MagSafe Phone + 5W Watch + 5W Buds",
      "Safety": "Foreign object detection & thermal throttling",
    },
  },

  // 19. Accessories - Minimalist Leather Bifold Wallet
  {
    id: "prod-acc-01",
    slug: "minimal-bifold-leather-wallet",
    name: "Slim Horween Leather Bifold Wallet",
    description: "Crafted from legendary Horween Chromexcel pull-up leather. Holds 8 cards and folded bills with an ultra-slim 0.8cm profile.",
    price: 1999,
    originalPrice: 2499,
    category: "accessories",
    images: [
      "https://images.unsplash.com/photo-1627123424574-724758594e93?w=1000&auto=format&fit=crop&q=80",
    ],
    rating: 4.9,
    reviewCount: 190,
    stock: 45,
    featured: false,
    bestseller: true,
    createdAt: "2026-01-12T10:00:00Z",
    variants: {
      colors: ["Caramel Tan", "Espresso", "Midnight Black"],
    },
    specifications: {
      "Leather": "Full-grain Horween Chromexcel",
      "Card Capacity": "8-10 cards + central cash pocket",
      "Lining": "RFID-blocking woven microfiber",
      "Dimensions": "10.5cm x 7.8cm x 0.8cm",
    },
  },

  // 20. Accessories - Heavy Canvas Commuter Tote
  {
    id: "prod-acc-02",
    slug: "heavy-canvas-commuter-tote",
    name: "20oz Heavy Canvas Daily Commuter Tote",
    description: "Waxed 20oz duck canvas constructed to handle heavy laptops and groceries with bridle leather carry handles, brass hardware, and waterproof base.",
    price: 2999,
    originalPrice: 3899,
    category: "accessories",
    images: [
      "https://images.unsplash.com/photo-1544816155-12df9643f363?w=1000&auto=format&fit=crop&q=80",
    ],
    rating: 4.8,
    reviewCount: 94,
    stock: 28,
    featured: true,
    bestseller: true,
    createdAt: "2026-01-22T13:00:00Z",
    variants: {
      colors: ["Field Khaki", "Coal Black", "Navy Blue"],
    },
    specifications: {
      "Canvas": "20oz Martexin water-resistant waxed canvas",
      "Handles": "English bridle leather with hand-set copper rivets",
      "Compartment": "Padded 16\" laptop sleeve with security strap",
      "Volume": "22 Liters",
    },
  },

  // 21. Accessories - Titanium Polarized Sunglasses
  {
    id: "prod-acc-03",
    slug: "titanium-polarized-sunglasses",
    name: "Architect Titanium Aviator Sunglasses",
    description: "Ultra-featherweight Japanese beta-titanium frames weighing merely 18 grams, fitted with scratch-proof Carl Zeiss polarized lenses with AR coating.",
    price: 4999,
    originalPrice: 6500,
    category: "accessories",
    images: [
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=1000&auto=format&fit=crop&q=80",
    ],
    rating: 4.8,
    reviewCount: 68,
    stock: 19,
    featured: false,
    bestseller: false,
    createdAt: "2026-02-06T15:00:00Z",
    variants: {
      colors: ["Gunmetal / G15 Green", "Matte Gold / Amber", "Black / Smoke"],
    },
    specifications: {
      "Frame": "Japanese Beta-Titanium (Flexible memory alloy)",
      "Lenses": "Carl Zeiss CR-39 Polarized with 100% UV400",
      "Weight": "18.2 grams",
      "Case": "Collapsible vegan leather hardcase included",
    },
  },

  // 22. Accessories - Minimalist Automatic Watch 39mm
  {
    id: "prod-acc-04",
    slug: "minimalist-automatic-watch-39mm",
    name: "Bauhaus Automatic Dress Watch 39mm",
    description: "Clean dial typography influenced by 1930s Bauhaus design. Powered by a dependable Japanese Miyota 9015 automatic movement with 42-hour reserve.",
    price: 9999,
    originalPrice: 12499,
    category: "accessories",
    images: [
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=1000&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1000&auto=format&fit=crop&q=80",
    ],
    rating: 4.9,
    reviewCount: 110,
    stock: 9,
    featured: true,
    bestseller: false,
    createdAt: "2026-02-09T17:00:00Z",
    variants: {
      colors: ["White Dial / Tan Strap", "Black Dial / Black Strap", "Navy Dial / Steel Mesh"],
    },
    specifications: {
      "Movement": "Miyota 9015 Automatic (28,800 vph)",
      "Crystal": "Double-domed Sapphire with anti-reflective coating",
      "Case": "316L Stainless Steel (39mm diameter, 9.8mm thin)",
      "Water Resistance": "5 ATM / 50 meters",
    },
  },

  // 23. Accessories - Merino Wool Beanie
  {
    id: "prod-acc-05",
    slug: "merino-wool-ribbed-beanie",
    name: "100% Extra-Fine Merino Ribbed Beanie",
    description: "Spun in Italy from 19.5-micron extrafine merino wool that provides breathability without itchiness. Classic double-fold cuff silhouette.",
    price: 1299,
    originalPrice: 1699,
    category: "accessories",
    images: [
      "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=1000&auto=format&fit=crop&q=80",
    ],
    rating: 4.7,
    reviewCount: 83,
    stock: 50,
    featured: false,
    bestseller: true,
    createdAt: "2026-02-13T10:00:00Z",
    variants: {
      colors: ["Heather Gray", "Rust Terracotta", "Deep Navy", "Olive Drab"],
    },
    specifications: {
      "Fiber": "100% Extrafine Italian Merino Wool",
      "Knit": "7-gauge fisherman rib",
      "Origin": "Biella, Italy",
    },
  },

  // 24. Home & Living - Ceramic Pour-Over Set
  {
    id: "prod-home-01",
    slug: "matte-ceramic-pour-over-brewer",
    name: "Artisan Ceramic Pour-Over Coffee Set",
    description: "Handcrafted stoneware dripper with internal spiral extraction ribs paired with a heat-resistant borosilicate glass carafe for meditative morning brews.",
    price: 2499,
    originalPrice: 3200,
    category: "home-living",
    images: [
      "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=1000&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?w=1000&auto=format&fit=crop&q=80",
    ],
    rating: 4.8,
    reviewCount: 96,
    stock: 26,
    featured: true,
    bestseller: true,
    createdAt: "2026-01-16T12:00:00Z",
    variants: {
      colors: ["Matte Charcoal", "Sandstone Beige", "Speckled White"],
    },
    specifications: {
      "Material": "High-fire stoneware dripper + 600ml borosilicate pot",
      "Compatibility": "Standard 02 cone filters",
      "Care": "Dishwasher and microwave safe",
    },
  },

  // 25. Home & Living - Weighted Organic Wool Throw Blanket
  {
    id: "prod-home-02",
    slug: "weighted-wool-throw-blanket",
    name: "Scandinavian Wool & Cashmere Throw",
    description: "Woven in Lithuania from recycled lambswool and Mongolian cashmere with tactile fringed borders. Unrivaled warmth for cool evenings.",
    price: 3999,
    originalPrice: 5200,
    category: "home-living",
    images: [
      "https://images.unsplash.com/photo-1580301762395-21ce84d00bc6?w=1000&auto=format&fit=crop&q=80",
    ],
    rating: 4.9,
    reviewCount: 57,
    stock: 18,
    featured: false,
    bestseller: false,
    createdAt: "2026-01-28T16:00:00Z",
    variants: {
      colors: ["Oatmeal Herringbone", "Slate Check", "Forest Green"],
    },
    specifications: {
      "Composition": "85% Pure Lambswool, 15% Cashmere",
      "Size": "140cm x 200cm (including fringes)",
      "Origin": "Vilnius, Lithuania",
    },
  },

  // 26. Home & Living - Minimalist Matte Black Table Lamp
  {
    id: "prod-home-03",
    slug: "minimal-matte-black-desk-lamp",
    name: "Orbital Matte Brass & Steel Desk Lamp",
    description: "Sculptural silhouette with 360-degree dimmable warm ambient LED illumination (2700K), integrated touch slider, and weighted brass pedestal.",
    price: 4499,
    originalPrice: 5999,
    category: "home-living",
    images: [
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=1000&auto=format&fit=crop&q=80",
    ],
    rating: 4.7,
    reviewCount: 41,
    stock: 15,
    featured: true,
    bestseller: false,
    createdAt: "2026-02-16T11:00:00Z",
    variants: {
      colors: ["Matte Black / Brass", "Brushed Nickel"],
    },
    specifications: {
      "Light Source": "CRI 95+ Warm LED (2700K - 3000K stepless)",
      "Dimmer": "Smooth touch capacitive base control",
      "Dimensions": "42cm Height x 18cm Base Diameter",
      "Cord": "2m braided textile cord",
    },
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}

export function getFeaturedProducts(): Product[] {
  return PRODUCTS.filter((p) => p.featured);
}

export function getBestsellers(): Product[] {
  return PRODUCTS.filter((p) => p.bestseller);
}

export function getNewArrivals(limit = 8): Product[] {
  return [...PRODUCTS]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, limit);
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return PRODUCTS.filter((p) => p.category.toLowerCase() === categorySlug.toLowerCase());
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return PRODUCTS.filter(
    (p) => p.id !== product.id && p.category === product.category
  ).slice(0, limit);
}

