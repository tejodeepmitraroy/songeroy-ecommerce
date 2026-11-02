"use client";

import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";
import { STORE_SETTINGS } from "@/data/store";

export function AnnouncementBar() {
  return (
    <aside aria-label="Store announcement" className="bg-[#111111] text-white text-xs py-2 px-4 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="hidden md:flex items-center gap-2 text-neutral-400">
          <span>Official Concept Store</span>
          <span>•</span>
          <span className="text-emerald-400 font-medium">Free Shipping above ₹1,999</span>
        </div>

        <div className="flex-1 text-center font-medium tracking-wide flex items-center justify-center gap-2">
          <Sparkles className="h-3.5 w-3.5 text-[#F95721] shrink-0" />
          <span>{STORE_SETTINGS.announcement}</span>
          <Link
            href="/shop"
            className="underline underline-offset-4 hover:text-[#F95721] transition-colors ml-1 hidden sm:inline-flex items-center gap-0.5"
          >
            Shop Now <ArrowRight className="h-3 w-3 inline" />
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-4 text-neutral-400 text-xs">
          <span className="font-semibold text-neutral-200">IN / INR (₹)</span>
          <Link href="/faq" className="hover:text-white transition-colors">
            Help
          </Link>
        </div>
      </div>
    </aside>
  );
}

