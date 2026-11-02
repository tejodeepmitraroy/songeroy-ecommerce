"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ProductGalleryProps {
  images: string[];
  productName: string;
  discountPercent?: number;
}

export function ProductGallery({
  images,
  productName,
  discountPercent = 0,
}: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const safeImages = images.length > 0 ? images : [
    "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80"
  ];

  const handleNext = () => {
    setSelectedIndex((prev) => (prev + 1) % safeImages.length);
  };

  const handlePrev = () => {
    setSelectedIndex((prev) => (prev - 1 + safeImages.length) % safeImages.length);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Main Large Image */}
      <div className="relative aspect-[3/3.8] sm:aspect-[4/4.5] w-full overflow-hidden rounded-2xl bg-neutral-100 border border-neutral-200/80">
        <Image
          src={safeImages[selectedIndex]}
          alt={`${productName} view ${selectedIndex + 1}`}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover transition-all duration-300"
        />

        {/* Discount Badge */}
        {discountPercent > 0 && (
          <div className="absolute top-4 left-4 z-10">
            <Badge variant="discount" className="px-3 py-1 text-xs font-bold shadow-xs">
              -{discountPercent}%
            </Badge>
          </div>
        )}

        {/* Carousel controls if more than 1 image */}
        {safeImages.length > 1 && (
          <>
            <button
              type="button"
              onClick={handlePrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-white/90 backdrop-blur-xs text-neutral-800 flex items-center justify-center shadow-md hover:bg-white active:scale-95 transition-all"
              aria-label="Previous photo"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-white/90 backdrop-blur-xs text-neutral-800 flex items-center justify-center shadow-md hover:bg-white active:scale-95 transition-all"
              aria-label="Next photo"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails Row */}
      {safeImages.length > 1 && (
        <div className="grid grid-cols-4 gap-3">
          {safeImages.map((img, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setSelectedIndex(idx)}
              className={cn(
                "relative aspect-square rounded-xl overflow-hidden bg-neutral-100 border-2 transition-all cursor-pointer",
                selectedIndex === idx
                  ? "border-neutral-900 ring-2 ring-neutral-900/10"
                  : "border-transparent opacity-70 hover:opacity-100"
              )}
            >
              <Image
                src={img}
                alt={`${productName} thumbnail ${idx + 1}`}
                fill
                sizes="120px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

