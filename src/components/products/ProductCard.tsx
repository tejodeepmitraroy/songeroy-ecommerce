"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Star, ShoppingBag, Heart } from "lucide-react";
import { Product } from "@/types/product";
import { formatCurrency } from "@/lib/currency";
import { useCart } from "@/context/CartContext";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  className?: string;
  priority?: boolean;
}

export function ProductCard({
  product,
  className,
  priority = false,
}: ProductCardProps) {
  const { addToCart, setIsDrawerOpen } = useCart();
  const [isLiked, setIsLiked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);

  const discountPercent = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : 0;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    addToCart({
      productId: product.id,
      quantity: 1,
      selectedColor: product.variants?.colors?.[0],
      selectedSize: product.variants?.sizes?.[0],
    });
    setIsDrawerOpen(true);
  };

  const handleToggleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  // Switch image on hover if multiple images available
  const displayImage =
    isHovered && product.images.length > 1
      ? product.images[1]
      : product.images[0];

  return (
    <div
      className={cn(
        "group relative flex flex-col rounded-2xl bg-white border border-neutral-200/70 p-3 sm:p-3.5 transition-all duration-300 hover:shadow-lg hover:border-neutral-300/80",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image Container */}
      <Link
        href={`/products/${product.slug}`}
        className="relative block aspect-square sm:aspect-[4/4.5] w-full overflow-hidden rounded-xl bg-neutral-100"
      >
        <Image
          src={
            imageError
              ? "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80"
              : displayImage
          }
          alt={product.name}
          fill
          priority={priority}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          onError={() => setImageError(true)}
        />

        {/* Badges Overlay */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 z-10">
          {discountPercent > 0 && (
            <Badge variant="discount" className="shadow-xs font-bold text-[11px]">
              -{discountPercent}%
            </Badge>
          )}
          {product.bestseller && (
            <Badge variant="default" className="shadow-xs text-[10px] uppercase font-semibold">
              Bestseller
            </Badge>
          )}
          {product.stock <= 5 && product.stock > 0 && (
            <Badge variant="warning" className="shadow-xs text-[10px] font-semibold">
              Only {product.stock} left
            </Badge>
          )}
          {product.stock === 0 && (
            <Badge variant="destructive" className="shadow-xs text-[10px] font-semibold">
              Sold Out
            </Badge>
          )}
        </div>

        {/* Action Buttons Overlay */}
        <div className="absolute top-2.5 right-2.5 flex flex-col gap-1.5 z-10">
          <button
            type="button"
            onClick={handleToggleLike}
            className={cn(
              "h-8 w-8 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center transition-all shadow-xs active:scale-90",
              isLiked
                ? "text-rose-500 fill-rose-500"
                : "text-neutral-600 hover:text-neutral-950 hover:bg-white"
            )}
            aria-label="Save to favorites"
          >
            <Heart
              className={cn("h-4 w-4", isLiked && "fill-rose-500 text-rose-500")}
            />
          </button>
        </div>

        {/* Quick Add Overlay on Hover (Desktop) */}
        <div className="absolute inset-x-2.5 bottom-2.5 hidden sm:flex opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 z-10">
          <button
            type="button"
            onClick={handleQuickAdd}
            disabled={product.stock === 0}
            className="w-full h-10 rounded-lg bg-neutral-900/95 hover:bg-neutral-900 text-white text-xs font-semibold backdrop-blur-xs flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.98] disabled:opacity-50"
          >
            <ShoppingBag className="h-3.5 w-3.5" />
            <span>{product.stock === 0 ? "Out of Stock" : "Quick Add to Bag"}</span>
          </button>
        </div>
      </Link>

      {/* Product Details */}
      <div className="flex flex-col flex-1 pt-3">
        {/* Category & Rating */}
        <div className="flex items-center justify-between text-xs text-neutral-500 mb-1">
          <span className="capitalize font-medium text-[11px] text-neutral-400">
            {product.category.replace("-", " & ")}
          </span>
          <div className="flex items-center gap-1 text-[11px] font-semibold text-neutral-800">
            <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
            <span>{product.rating}</span>
            <span className="text-neutral-400 font-normal">
              ({product.reviewCount})
            </span>
          </div>
        </div>

        {/* Title */}
        <Link
          href={`/products/${product.slug}`}
          className="font-semibold text-sm text-neutral-900 line-clamp-1 hover:text-neutral-600 transition-colors"
        >
          {product.name}
        </Link>

        {/* Subtitle / Brief */}
        <p className="text-xs text-neutral-500 line-clamp-1 mt-0.5">
          {product.description}
        </p>

        {/* Color swatches preview if available */}
        {product.variants?.colors && product.variants.colors.length > 1 && (
          <div className="flex items-center gap-1.5 mt-2">
            <span className="text-[10px] text-neutral-400">
              {product.variants.colors.length} shades:
            </span>
            <div className="flex items-center gap-1">
              {product.variants.colors.slice(0, 3).map((col) => (
                <span
                  key={col}
                  title={col}
                  className="w-2.5 h-2.5 rounded-full border border-neutral-300 bg-neutral-400"
                />
              ))}
              {product.variants.colors.length > 3 && (
                <span className="text-[10px] text-neutral-400">
                  +{product.variants.colors.length - 3}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Price and Mobile Add Button */}
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-neutral-100">
          <div className="flex items-baseline gap-2">
            <span className="text-sm font-bold text-neutral-950">
              {formatCurrency(product.price)}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-xs text-neutral-400 line-through">
                {formatCurrency(product.originalPrice)}
              </span>
            )}
          </div>

          {/* Mobile Quick Add Button */}
          <button
            type="button"
            onClick={handleQuickAdd}
            disabled={product.stock === 0}
            className="sm:hidden h-8 w-8 rounded-full bg-neutral-900 text-white flex items-center justify-center shadow-xs active:scale-95 disabled:opacity-40"
            aria-label="Add to cart"
          >
            <ShoppingBag className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

