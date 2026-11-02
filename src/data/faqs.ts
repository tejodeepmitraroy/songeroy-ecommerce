export interface FAQItem {
  id: string;
  category: "orders" | "shipping" | "returns" | "payments" | "products";
  question: string;
  answer: string;
}

export const FAQ_ITEMS: FAQItem[] = [
  // Orders
  {
    id: "faq-ord-1",
    category: "orders",
    question: "How do I track my order status?",
    answer: "Once your order is processed, you will receive an email and SMS confirmation containing a real-time tracking number. You can also view simulated delivery updates directly from your order confirmation page.",
  },
  {
    id: "faq-ord-2",
    category: "orders",
    question: "Can I cancel or modify my order after placing it?",
    answer: "Orders are prepared quickly in our fulfillment hubs. If you need to modify your shipping address or cancel an item, please notify our team within 2 hours of placement via our contact portal.",
  },

  // Shipping
  {
    id: "faq-ship-1",
    category: "shipping",
    question: "What are the shipping charges and free delivery thresholds?",
    answer: "We offer Free Express Shipping on all orders above ₹1,999 anywhere across India. For orders below ₹1,999, a flat standard delivery fee of ₹99 is applied at checkout.",
  },
  {
    id: "faq-ship-2",
    category: "shipping",
    question: "How long does standard delivery take?",
    answer: "Metro deliveries (Bengaluru, Mumbai, Delhi-NCR, Hyderabad, Chennai, Kolkata) arrive within 2–4 business days. Regional and tier-2 locations typically take 4–6 business days.",
  },

  // Returns
  {
    id: "faq-ret-1",
    category: "returns",
    question: "What is your return and exchange policy?",
    answer: "We offer a hassle-free 14-day return window from the day of delivery. Items must remain in unworn, unwashed condition with original tags and packaging intact. Reverse pickup is scheduled right from your doorstep.",
  },
  {
    id: "faq-ret-2",
    category: "returns",
    question: "How long do refunds take to process?",
    answer: "Once returned merchandise passes quality inspection at our warehouse (typically 48 hours from receipt), your refund is immediately initiated back to your original source of payment within 3–5 working days.",
  },

  // Payments
  {
    id: "faq-pay-1",
    category: "payments",
    question: "Which payment options are supported in this store?",
    answer: "This is a demonstration store equipped with a simulated payment gateway. You can test transactions using demo credit/debit cards, demo UPI (Google Pay, PhonePe, Paytm), or simulated Cash on Delivery. No actual funds are charged.",
  },
  {
    id: "faq-pay-2",
    category: "payments",
    question: "Are coupon codes case-sensitive?",
    answer: "You can enter coupon codes in any case. Try applying WELCOME10 for 10% off or KICKZ20 for 20% off during checkout to see the discount calculation in real time.",
  },

  // Products
  {
    id: "faq-prod-1",
    category: "products",
    question: "How do your apparel sizes run?",
    answer: "Our apparel leans toward a modern relaxed silhouette. If you prefer a fitted look, we recommend sizing down one size. A detailed size chart with chest, waist, and length measurements is available on each product page.",
  },
  {
    id: "faq-prod-2",
    category: "products",
    question: "Where are your materials sourced?",
    answer: "We prioritize natural, ethical, and certified materials—including GOTS-certified organic cotton from Coimbatore, pure French linen, Italian vegetable-tanned leather, and Japanese Okayama selvedge denim.",
  },
];

