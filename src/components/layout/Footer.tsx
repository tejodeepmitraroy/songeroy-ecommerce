"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, ShieldAlert, Check } from "lucide-react";
import { STORE_SETTINGS } from "@/data/store";
import { CATEGORIES } from "@/data/categories";

export function Footer() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && email.includes("@")) {
      setIsSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="bg-[#111111] text-white pt-16 pb-12 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-neutral-800/80">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#F95721] flex items-center justify-center text-white font-black text-lg">
                K
              </div>
              <span className="font-extrabold tracking-tight text-xl text-white">
                KICKZ & CO.
              </span>
            </Link>
            <p className="text-sm text-neutral-400 max-w-sm leading-relaxed">
              {STORE_SETTINGS.description}
            </p>

            <div className="pt-2">
              <div className="inline-flex items-center gap-2 rounded-lg bg-neutral-900 border border-neutral-800 px-3 py-2 text-xs text-neutral-300">
                <ShieldAlert className="h-4 w-4 text-[#F95721] shrink-0" />
                <span>Simulated Sandbox Environment (INR ₹)</span>
              </div>
            </div>
          </div>

          {/* Catalog Col */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold tracking-widest text-neutral-200 uppercase">
              Collections
            </h4>
            <ul className="space-y-2 text-sm text-neutral-400">
              <li>
                <Link href="/shop" className="hover:text-white transition-colors">
                  All Catalog
                </Link>
              </li>
              {CATEGORIES.map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/categories/${cat.slug}`}
                    className="hover:text-white transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help & Support Col */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold tracking-widest text-neutral-200 uppercase">
              Client Service
            </h4>
            <ul className="space-y-2 text-sm text-neutral-400">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  Our Philosophy
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact Support
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white transition-colors">
                  FAQ & Guide
                </Link>
              </li>
              <li>
                <Link href="/shipping-policy" className="hover:text-white transition-colors">
                  Shipping Rates
                </Link>
              </li>
              <li>
                <Link href="/return-policy" className="hover:text-white transition-colors">
                  Returns & Exchanges
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Col */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold tracking-widest text-neutral-200 uppercase">
              Stay Informed
            </h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Curated drop notifications, editorial essays, and private seasonal previews.
            </p>

            {isSubscribed ? (
              <div className="flex items-center gap-2 rounded-lg bg-emerald-950/60 border border-emerald-800/80 p-3 text-xs text-emerald-300">
                <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>Thank you for subscribing to our dispatch.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-10 px-3.5 pr-10 rounded-lg bg-neutral-900 border border-neutral-800 text-xs text-white placeholder:text-neutral-500 focus:outline-none focus:border-neutral-500 transition-colors"
                  />
                  <button
                    type="submit"
                    className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1.5 text-neutral-400 hover:text-white transition-colors"
                    aria-label="Subscribe to newsletter"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
                <p className="text-[10px] text-neutral-500">
                  By subscribing, you agree to our privacy policy.
                </p>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
          <p>
            © {new Date().getFullYear()} {STORE_SETTINGS.name}. Built with Next.js App Router & Tailwind CSS.
          </p>

          <div className="flex flex-wrap items-center gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Notice
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Use
            </Link>
            <Link href="/shipping-policy" className="hover:text-white transition-colors">
              Shipping
            </Link>
            <Link href="/return-policy" className="hover:text-white transition-colors">
              Returns
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

