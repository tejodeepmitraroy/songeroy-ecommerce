import { Suspense } from "react";
import type { Metadata } from "next";
import { ShopClient } from "./ShopClient";
import { Skeleton } from "@/components/ui/skeleton";

export const metadata: Metadata = {
  title: "Shop All Collections",
  description:
    "Explore our complete collection of minimalist apparel, artisanal footwear, and intentional essentials.",
};

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 py-12 space-y-6">
          <Skeleton className="h-10 w-48" />
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <Skeleton className="h-96 rounded-2xl" />
            <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="aspect-[4/5] rounded-2xl" />
              ))}
            </div>
          </div>
        </div>
      }
    >
      <ShopClient />
    </Suspense>
  );
}

