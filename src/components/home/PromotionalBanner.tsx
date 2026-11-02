import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";

export function PromotionalBanner() {
  return (
    <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-3xl bg-neutral-900 text-white shadow-xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
          {/* Content */}
          <div className="lg:col-span-7 p-8 sm:p-12 lg:p-16 space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1 text-xs font-semibold text-[#F95721] backdrop-blur-xs">
              <Tag className="h-3.5 w-3.5" />
              <span>Limited Drop Coupon: WELCOME10</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
              Quiet Luxury Meets Everyday Utility.
            </h2>

            <p className="text-sm sm:text-base text-neutral-300 max-w-lg leading-relaxed">
              Every piece in our collection is crafted with zero-compromise construction: 280 GSM heavyweight cottons, Italian vegetable-tanned leathers, and Japanese selvedge denim.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Button asChild variant="primary" size="lg" className="font-semibold">
                <Link href="/shop">
                  Shop The Lookbook <ArrowRight className="h-4 w-4 ml-1.5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-neutral-700 bg-neutral-800 text-white hover:bg-neutral-700">
                <Link href="/about">
                  Read Our Philosophy
                </Link>
              </Button>
            </div>
          </div>

          {/* Image */}
          <div className="lg:col-span-5 relative aspect-[4/3] lg:aspect-square w-full">
            <Image
              src="https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=1000&auto=format&fit=crop&q=80"
              alt="Minimalist Apparel Display"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover opacity-90"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

