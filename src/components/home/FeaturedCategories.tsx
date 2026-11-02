import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { CATEGORIES } from "@/data/categories";

export function FeaturedCategories() {
  return (
    <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row items-baseline justify-between mb-8 pb-4 border-b border-neutral-200">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#F95721]">
            Curated Lines
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 mt-1">
            Shop by Department
          </h2>
        </div>
        <Link
          href="/shop"
          className="text-xs font-semibold text-neutral-600 hover:text-neutral-950 inline-flex items-center gap-1 mt-2 sm:mt-0 transition-colors"
        >
          View Full Catalog <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {CATEGORIES.map((cat) => (
          <Link
            key={cat.id}
            href={`/categories/${cat.slug}`}
            className="group relative flex flex-col overflow-hidden rounded-2xl bg-white border border-neutral-200/80 transition-all duration-300 hover:shadow-md hover:border-neutral-300"
          >
            <div className="relative aspect-[4/4.5] w-full overflow-hidden bg-neutral-100">
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                sizes="(max-width: 640px) 50vw, 20vw"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <h3 className="font-bold text-sm sm:text-base leading-tight">
                  {cat.name}
                </h3>
                <span className="text-[11px] text-neutral-300 font-medium">
                  {cat.itemCount} Items
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

