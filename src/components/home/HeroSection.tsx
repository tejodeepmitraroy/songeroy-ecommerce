"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles, ShieldCheck, Truck, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#F5F4F0] border-b border-neutral-200">
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-radial from-transparent to-neutral-200/30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-28 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Typography & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-xs font-semibold text-neutral-800 border border-neutral-200/80 shadow-xs">
              <Sparkles className="h-3.5 w-3.5 text-[#F95721]" />
              <span>Autumn / Winter &apos;26 Minimal Capsule Drop</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-neutral-950 leading-[1.1]">
              Essential Design.{" "}
              <span className="text-neutral-500 font-normal">Uncompromised Craft.</span>
            </h1>

            <p className="text-base sm:text-lg text-neutral-600 max-w-xl leading-relaxed">
              Thoughtfully curated apparel, artisanal footwear, and intentional workspace accessories engineered with quiet luxury and enduring materials.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Button
                asChild
                variant="primary"
                size="lg"
                className="gap-2 shadow-sm font-semibold"
              >
                <Link href="/shop">
                  Explore Catalog <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="font-medium bg-white/80 hover:bg-white"
              >
                <Link href="/categories/clothing">
                  Shop Apparel
                </Link>
              </Button>
              <Button
                asChild
                variant="ghost"
                size="lg"
                className="font-medium text-neutral-700"
              >
                <Link href="/categories/footwear">
                  Footwear Collection
                </Link>
              </Button>
            </div>

            {/* Value Props Bar */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-neutral-200/70 text-xs text-neutral-600">
              <div className="flex items-center gap-2">
                <Truck className="h-4 w-4 text-[#F95721] shrink-0" />
                <span>Free delivery over ₹1,999</span>
              </div>
              <div className="flex items-center gap-2">
                <RefreshCw className="h-4 w-4 text-[#F95721] shrink-0" />
                <span>14-day easy returns</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-[#F95721] shrink-0" />
                <span>Simulated payment test</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual - Inspired by Reference 2 (Ugmonk hanging garments) */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/4.8] w-full rounded-3xl overflow-hidden shadow-2xl border border-white/60 bg-white">
              <Image
                src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1200&auto=format&fit=crop&q=85"
                alt="Air Rise 1 Retro High Sneaker"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover transition-transform duration-700 hover:scale-105"
              />

              {/* Floating Product Tag */}
              <div className="absolute bottom-5 left-5 right-5 rounded-2xl bg-white/95 backdrop-blur-md p-4 shadow-lg border border-neutral-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#F95721]">
                    Featured Silhouette
                  </span>
                  <h3 className="text-sm font-bold text-neutral-900">
                    Air Rise 1 Retro High
                  </h3>
                  <p className="text-xs text-neutral-500">
                    White / Orange / Black Edition
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-neutral-900 block">
                    ₹6,499.00
                  </span>
                  <Link
                    href="/products/air-rise-1-retro"
                    className="text-[11px] font-semibold text-[#F95721] hover:underline"
                  >
                    View Drop →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

