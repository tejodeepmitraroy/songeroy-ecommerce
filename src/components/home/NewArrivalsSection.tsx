import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getNewArrivals } from "@/data/products";
import { ProductGrid } from "@/components/products/ProductGrid";

export function NewArrivalsSection() {
  const newArrivals = getNewArrivals(8);

  return (
    <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row items-baseline justify-between mb-8 pb-4 border-b border-neutral-200">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#F95721]">
            Just Released
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 mt-1">
            New Arrivals
          </h2>
        </div>
        <Link
          href="/shop"
          className="text-xs font-semibold text-neutral-600 hover:text-neutral-950 inline-flex items-center gap-1 mt-2 sm:mt-0 transition-colors"
        >
          View All New <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      <ProductGrid products={newArrivals} columns={4} />
    </section>
  );
}

