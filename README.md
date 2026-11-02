# KICKZ & CO. — Modern Minimalist E-Commerce Platform

A production-grade, fully responsive e-commerce web application built with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, and **shadcn/ui** components. Designed with minimal, quiet-luxury aesthetics inspired by curated Japanese design, modern editorial typography, and high-conversion e-commerce UX.

---

## 📸 Design Inspiration & Reference Screens

The interface design incorporates key UI/UX elements inspired by premier minimalist stores:
1. **Streamlined 3-Step Checkout (`/checkout`)**: Inspired by the KICKZ checkout system featuring Contact Information, Shipping Address, order summary card, and security trust badges.
2. **Editorial Hero & Hanging Essentials (`/`)**: Inspired by Ugmonk's minimal warm apparel layouts, clean product cards, and uncluttered whitespace.
3. **Immersive Product Detail Page (`/products/[slug]`)**: Inspired by Clonify, featuring an interactive gallery with thumbnail carousel, live viewer counter, shade swatches, size selectors with stock limits, and specification tabs.
4. **Interactive Catalog (`/shop`)**: Inspired by Wink, with instant keyword search, responsive filter sidebar/sheet, multi-axis sorting, and quick-add actions.

---

## 🛠 Technology Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS v4 & custom design tokens
- **UI Component System**: shadcn/ui principles (Button, Input, Card, Badge, Sheet, Dialog, Tabs, Accordion, Separator, Skeleton, Toast)
- **Icons**: Lucide React
- **Global State**: React Context API (`CartContext`) with hydration safety
- **Form Management**: React Hook Form + Zod schema validation
- **Persistence**: Safe SSR-guarded `localStorage` for shopping bag & demo order records
- **Payments**: Decoupled simulated payment gateway service with deterministic scenarios (`success`, `failure`, `cancel`)

---

## 🚀 Key Features

### 🛍️ Product Catalog & Navigation
- **26 Handcrafted Products across 5 Departments**:
  - `Clothing` (Essential heavyweight tees, linen overshirts, Kensho pleated pants, selvedge denim)
  - `Footwear` (Air Rise 1 Retro High, calfskin low sneakers, suede Chelseas, carbon racers)
  - `Electronics` (Studio ANC headphones, Typist 75 mechanical keyboard, desktop speaker)
  - `Accessories` (Horween leather bifold, 20oz canvas tote, titanium sunglasses, automatic watch)
  - `Home & Living` (Ceramic pour-over set, wool throw blanket, brass desk lamp)
- **Search & Filters**:
  - Instant live search (`/search?q=...`)
  - Department filtering & active pill badges
  - Price range slider with dual numeric inputs (up to ₹15,000)
  - In-stock only filter
  - Multi-criteria sorting (Price Low/High, Newest, Highest Rated, Featured)
- **Responsive Navigation**: Sticky header with search, cart drawer trigger, and mobile drawer.

### 🛒 Shopping Bag (`/cart`) & Cart Drawer
- **Persistent State**: Automatically syncs with `localStorage` and hydrates without layout shift.
- **Authoritative Calculations**: Product prices, stock thresholds, and tax are calculated against trusted server data rather than mutable client payloads.
- **Free Shipping Meter**: Visual progress bar indicating how much more is required to unlock Free Express Shipping (Threshold: ₹1,999).
- **Demo Coupon Engine**:
  - `WELCOME10`: 10% off entire order
  - `KICKZ20`: 20% off VIP welcome discount
  - `FLAT500`: ₹500 flat discount on orders over ₹2,500
- **Toast Notifications**: Real-time accessible feedback on item additions, stock warnings, and coupon applications.

### 💳 Simulated Payment Gateway (`/payment`)
- **Clearly Labeled Demo Environment**:
  > *"DEMO PAYMENT ONLY — No real money will be charged. No actual payment provider is connected."*
- **Payment Methods Supported**:
  - **Credit / Debit Cards**: Pre-configured test profiles (`Visa 4242`, `Mastercard 5555`). Real card entry is disabled.
  - **UPI Simulation**: Instant demo buttons for Google Pay, PhonePe, Paytm with virtual handle `demo-user@okaxis`.
  - **Cash on Delivery (COD)**: Doorstep verification simulation.
- **Scenario Testing Matrix**:
  - **✓ Success**: 1.5s simulated network delay → generates unique transaction ID (e.g., `TXN-DEMO-XXXXX`) → clears bag → redirects to `/order-success/[orderId]`.
  - **✗ Failure**: Simulates bank decline error (`ERR_SIMULATED_DECLINE_05`) → records failed attempt → routes to `/order-failed` with retry trigger.
  - **⊘ Cancel**: Voluntary cancellation → returns gracefully to checkout without clearing the shopping bag.

### 📦 Order Confirmation & Security Verification
- **Verified Success Page (`/order-success/[orderId]`)**: Only loads for genuine demo orders that successfully transacted. Direct URL manipulation with arbitrary or unpaid IDs displays an "Order Not Found" safety boundary.
- **Printable Invoices**: Simulated receipt generation with breakdown of subtotal, discounts, shipping fees, 18% GST tax, and delivery address.

### 📄 Comprehensive Content & Legal Pages
- `/about`: Studio story, ethical direct partnerships, and 4 design pillars.
- `/contact`: Client care portal with validated form and Bangalore studio hours.
- `/faq`: Categorized accordion covering orders, shipping, returns, and sizing.
- `/login`, `/register`, `/forgot-password`: Frontend simulated authentication.
- `/privacy`, `/terms`, `/shipping-policy`, `/return-policy`: Complete policy documentation.
- `not-found.tsx`: Custom 404 page with navigation fallback.

---

## 💻 Getting Started

### 1. Prerequisites
- Node.js 18.17+ or 20+
- npm or pnpm

### 2. Installation
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Production Build Verification
```bash
npm run build
npm run start
```

---

## 🧪 Demo Credentials & Test Scenarios

| Feature | Input / Value | Result |
| :--- | :--- | :--- |
| **Demo Coupon** | `WELCOME10` | 10% discount deducted from subtotal |
| **Demo Coupon** | `KICKZ20` | 20% discount deducted from subtotal |
| **Demo Coupon** | `FLAT500` | ₹500 flat discount on orders over ₹2,500 |
| **Demo Login** | `demo@kickz-store.com` / `password123` | Quick-fill authentication test |
| **Free Delivery** | Add items totaling ≥ ₹1,999 | Shipping drops from ₹99 to ₹0 (Free) |
| **Payment Success** | Click "Success" scenario trigger | Confirms order & creates invoice |
| **Payment Failure** | Click "Failure" scenario trigger | Routes to retry failure screen |

---

## 📱 Responsive Testing
Verified across standard viewport breakpoints:
- **Mobile Phones**: 320px – 480px (Single-column layout, touch sheet navigation, mobile quick-add)
- **Tablets**: 768px – 1024px (2-column grids, collapsible filter sheet)
- **Laptops & Desktops**: 1200px – 1920px (4-column grid, sticky sidebar filters, large gallery)
