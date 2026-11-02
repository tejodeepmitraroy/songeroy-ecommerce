"use client";

import Link from "next/link";
import { Sheet } from "@/components/ui/sheet";
import { CATEGORIES } from "@/data/categories";
import { ArrowRight, ShieldCheck, Truck, RefreshCw } from "lucide-react";

interface MobileNavigationProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MobileNavigation({
  open,
  onOpenChange,
}: MobileNavigationProps) {
  const handleLinkClick = () => {
    onOpenChange(false);
  };

  return (
    <Sheet
      open={open}
      onOpenChange={onOpenChange}
      side="left"
      title="KICKZ & CO."
      description="Modern Minimalist Apparel & Lifestyle"
    >
      <div className="flex flex-col gap-6 py-2">
        {/* Navigation Categories */}
        <div className="flex flex-col gap-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 px-2 mb-1">
            Collections
          </span>
          <Link
            href="/shop"
            onClick={handleLinkClick}
            className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-semibold text-neutral-900 hover:bg-neutral-100 transition-colors"
          >
            <span>All Products</span>
            <ArrowRight className="h-4 w-4 text-neutral-400" />
          </Link>

          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href={`/categories/${cat.slug}`}
              onClick={handleLinkClick}
              className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900 transition-colors"
            >
              <span>{cat.name}</span>
              <span className="text-xs text-neutral-400">{cat.itemCount} items</span>
            </Link>
          ))}
        </div>

        <div className="h-[1px] bg-neutral-200/80" />

        {/* Company & Info Links */}
        <div className="flex flex-col gap-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 px-2 mb-1">
            Information
          </span>
          <Link
            href="/about"
            onClick={handleLinkClick}
            className="rounded-lg px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
          >
            Our Story & Craft
          </Link>
          <Link
            href="/contact"
            onClick={handleLinkClick}
            className="rounded-lg px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
          >
            Customer Care
          </Link>
          <Link
            href="/faq"
            onClick={handleLinkClick}
            className="rounded-lg px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
          >
            Frequently Asked Questions
          </Link>
          <Link
            href="/shipping-policy"
            onClick={handleLinkClick}
            className="rounded-lg px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
          >
            Shipping & Delivery
          </Link>
        </div>

        {/* Store Trust Perks */}
        <div className="rounded-xl bg-neutral-50 p-4 border border-neutral-100 mt-2 space-y-2.5 text-xs text-neutral-600">
          <div className="flex items-center gap-2">
            <Truck className="h-4 w-4 text-[#F95721]" />
            <span>Free Express shipping on orders ₹1,999+</span>
          </div>
          <div className="flex items-center gap-2">
            <RefreshCw className="h-4 w-4 text-[#F95721]" />
            <span>14-day doorstep return policy</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-[#F95721]" />
            <span>Simulated demo checkout environment</span>
          </div>
        </div>
      </div>
    </Sheet>
  );
}

