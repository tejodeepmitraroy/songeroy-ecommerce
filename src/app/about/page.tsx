import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Compass, ShieldCheck, HeartHandshake, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "About Our Studio & Philosophy",
  description:
    "Discover KICKZ & CO. — crafted apparel, artisanal footwear, and intentional workspace essentials.",
};

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-16 sm:space-y-24">
      {/* Hero Editorial */}
      <div className="space-y-6 text-center max-w-3xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-widest text-[#F95721]">
          Our Story & Purpose
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-neutral-950 tracking-tight leading-tight">
          We build essentials that age with grace, not obsolescence.
        </h1>
        <p className="text-base sm:text-lg text-neutral-600 leading-relaxed">
          Founded in Bengaluru in 2024, KICKZ & CO. began with a quiet conviction: modern wardrobes are burdened with loud branding and fleeting trends. We design enduring pieces rooted in timeless proportions, tactile textiles, and uncompromising utility.
        </p>
      </div>

      {/* Editorial Image Banner */}
      <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full rounded-3xl overflow-hidden bg-neutral-100 shadow-md">
        <Image
          src="https://images.unsplash.com/photo-1550995694-3f5f4a7e1ed2?w=1600&auto=format&fit=crop&q=85"
          alt="Studio Workshop and Craftsmanship"
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 1024px"
          className="object-cover"
        />
      </div>

      {/* Narrative Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-neutral-900 tracking-tight">
            The Philosophy of Everyday Objects
          </h2>
          <p className="text-sm text-neutral-600 leading-relaxed">
            Every garment and accessory we develop undergoes months of refinement. We test weight, tensile strength, drape, and stitch longevity before a silhouette ever reaches your hands.
          </p>
          <p className="text-sm text-neutral-600 leading-relaxed">
            Whether it’s our 280 GSM heavyweight organic cotton tees, our Okayama selvedge denim, or our hand-stitched Italian leather sneakers, our goal is simple: an object you will reach for day after day for years to come.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-neutral-900 tracking-tight">
            Direct Artisanal Partnerships
          </h2>
          <p className="text-sm text-neutral-600 leading-relaxed">
            We bypass middlemen, speculative distributor markups, and artificial seasonal cycles. By partnering directly with multigenerational family workshops in Tirupur, Tuscany, and Okayama, we pay fair living wages while keeping prices sensible.
          </p>
          <p className="text-sm text-neutral-600 leading-relaxed">
            The result is luxury craft made accessible to individuals who appreciate nuance, clean lines, and honest materials.
          </p>
        </div>
      </div>

      {/* 4 Pillars Grid */}
      <div className="pt-10 border-t border-neutral-200">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[#F95721]">
            Our Guiding Standards
          </span>
          <h3 className="text-2xl font-extrabold text-neutral-900 mt-1">
            Principles We Refuse to Compromise
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-neutral-200/80 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-orange-50 text-[#F95721] flex items-center justify-center">
              <Compass className="h-5 w-5" />
            </div>
            <h4 className="font-bold text-sm text-neutral-900">Intentional Form</h4>
            <p className="text-xs text-neutral-500 leading-relaxed">
              Every seam, pocket, and button serves an ergonomic and aesthetic function. Zero superfluous decoration.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-neutral-200/80 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Leaf className="h-5 w-5" />
            </div>
            <h4 className="font-bold text-sm text-neutral-900">Pure Fibers</h4>
            <p className="text-xs text-neutral-500 leading-relaxed">
              Prioritizing GOTS-certified organic cotton, unadulterated European linen, and vegetable-tanned hides.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-neutral-200/80 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <HeartHandshake className="h-5 w-5" />
            </div>
            <h4 className="font-bold text-sm text-neutral-900">Dignified Labor</h4>
            <p className="text-xs text-neutral-500 leading-relaxed">
              Collaborating strictly with certified ethical suppliers that guarantee safe environments and living wages.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-neutral-200/80 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h4 className="font-bold text-sm text-neutral-900">Lifetime Support</h4>
            <p className="text-xs text-neutral-500 leading-relaxed">
              Dedicated client assistance, complimentary repairs on hardware, and transparent return policies.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Box */}
      <div className="rounded-3xl bg-neutral-900 text-white p-8 sm:p-12 text-center space-y-6">
        <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          Experience the Difference of Real Quality
        </h3>
        <p className="text-sm text-neutral-400 max-w-md mx-auto">
          Explore our seasonal drops or read answers to common questions about materials, sizing, and care.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button asChild variant="primary" size="lg" className="font-bold gap-2">
            <Link href="/shop">
              <span>Explore The Catalog</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="border-neutral-700 bg-neutral-800 text-white hover:bg-neutral-700">
            <Link href="/faq">Read Common Questions</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

