"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Star,
  Check,
  ShieldCheck,
  Truck,
  RotateCcw,
  ShoppingBag,
  Zap,
  Users,
  Heart,
  Minus,
  Plus,
} from "lucide-react";
import { Product } from "@/types/product";
import { formatCurrency } from "@/lib/currency";
import { useCart } from "@/context/CartContext";
import { ProductGallery } from "@/components/products/ProductGallery";
import { ProductGrid } from "@/components/products/ProductGrid";
import { Breadcrumbs } from "@/components/products/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

interface ProductDetailClientProps {
  product: Product;
  relatedProducts: Product[];
}

export function ProductDetailClient({
  product,
  relatedProducts,
}: ProductDetailClientProps) {
  const router = useRouter();
  const { addToCart, setIsDrawerOpen } = useCart();

  const [selectedColor, setSelectedColor] = useState<string>(
    product.variants?.colors?.[0] || ""
  );
  const [selectedSize, setSelectedSize] = useState<string>(
    product.variants?.sizes?.[0] || ""
  );
  const [quantity, setQuantity] = useState(1);
  const [isLiked, setIsLiked] = useState(false);
  const [variantError, setVariantError] = useState<string | null>(null);

  const discountPercent = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : 0;

  const handleAddToCart = () => {
    // Validate variants if required
    if (product.variants?.colors && !selectedColor) {
      setVariantError("Please select a color");
      return;
    }
    if (product.variants?.sizes && !selectedSize) {
      setVariantError("Please select a size");
      return;
    }

    setVariantError(null);
    const result = addToCart({
      productId: product.id,
      quantity,
      selectedColor: selectedColor || undefined,
      selectedSize: selectedSize || undefined,
    });

    if (result.success) {
      setIsDrawerOpen(true);
    }
  };

  const handleBuyNow = () => {
    if (product.variants?.colors && !selectedColor) {
      setVariantError("Please select a color");
      return;
    }
    if (product.variants?.sizes && !selectedSize) {
      setVariantError("Please select a size");
      return;
    }

    setVariantError(null);
    addToCart({
      productId: product.id,
      quantity,
      selectedColor: selectedColor || undefined,
      selectedSize: selectedSize || undefined,
    });
    router.push("/checkout");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: "Shop", href: "/shop" },
          {
            label: product.category.replace("-", " & "),
            href: `/categories/${product.category}`,
          },
          { label: product.name },
        ]}
      />

      {/* Main Product Layout (Inspired by Reference 3 Clonify) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mt-6">
        {/* Left Gallery (7 cols on desktop) */}
        <div className="lg:col-span-7">
          <ProductGallery
            images={product.images}
            productName={product.name}
            discountPercent={discountPercent}
          />
        </div>

        {/* Right Info Panel (5 cols on desktop) */}
        <div className="lg:col-span-5 flex flex-col space-y-6">
          {/* Category & Title */}
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#F95721]">
              {product.category.replace("-", " & ")}
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight leading-tight">
              {product.name}
            </h1>

            {/* Ratings & Social Proof */}
            <div className="flex items-center gap-3 text-xs pt-1">
              <div className="flex items-center gap-1 text-amber-500">
                <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                <span className="font-bold text-neutral-900">{product.rating}</span>
                <span className="text-neutral-500 font-normal">
                  ({product.reviewCount} customer reviews)
                </span>
              </div>
              <span className="text-neutral-300">•</span>
              <div className="flex items-center gap-1 text-neutral-500">
                <Users className="h-3.5 w-3.5 text-neutral-400" />
                <span>32 people viewing this now</span>
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="flex items-baseline gap-3 py-2 border-y border-neutral-100">
            <span className="text-3xl font-black text-neutral-950">
              {formatCurrency(product.price)}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-base text-neutral-400 line-through">
                {formatCurrency(product.originalPrice)}
              </span>
            )}
            {discountPercent > 0 && (
              <Badge variant="discount" className="text-xs font-bold">
                Save {discountPercent}%
              </Badge>
            )}
          </div>

          {/* Description */}
          <p className="text-sm text-neutral-600 leading-relaxed">
            {product.description}
          </p>

          {/* Variant Error if user forgot to pick */}
          {variantError && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 font-semibold animate-in fade-in">
              {variantError}
            </div>
          )}

          {/* Color Selector */}
          {product.variants?.colors && product.variants.colors.length > 0 && (
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-neutral-900 uppercase tracking-wider">
                  Color: <span className="font-normal text-neutral-600">{selectedColor}</span>
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.variants.colors.map((color) => {
                  const isSelected = selectedColor === color;
                  return (
                    <button
                      key={color}
                      type="button"
                      onClick={() => {
                        setSelectedColor(color);
                        setVariantError(null);
                      }}
                      className={cn(
                        "px-3.5 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer",
                        isSelected
                          ? "border-neutral-900 bg-neutral-900 text-white shadow-xs"
                          : "border-neutral-200 bg-white text-neutral-700 hover:border-neutral-400"
                      )}
                    >
                      {color}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Size Selector */}
          {product.variants?.sizes && product.variants.sizes.length > 0 && (
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-neutral-900 uppercase tracking-wider">
                  Size: <span className="font-normal text-neutral-600">{selectedSize}</span>
                </span>
                <Link
                  href="/faq"
                  className="text-neutral-500 hover:text-neutral-900 underline underline-offset-2"
                >
                  Size Guide
                </Link>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.variants.sizes.map((size) => {
                  const isSelected = selectedSize === size;
                  return (
                    <button
                      key={size}
                      type="button"
                      onClick={() => {
                        setSelectedSize(size);
                        setVariantError(null);
                      }}
                      className={cn(
                        "h-10 min-w-10 px-3 rounded-lg text-xs font-bold border transition-all cursor-pointer flex items-center justify-center",
                        isSelected
                          ? "border-neutral-900 bg-neutral-900 text-white shadow-xs"
                          : "border-neutral-200 bg-white text-neutral-700 hover:border-neutral-400"
                      )}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Quantity & Stock Availability */}
          <div className="space-y-2 pt-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-neutral-900 uppercase tracking-wider">
                Quantity
              </span>
              <span className="font-medium text-emerald-600 flex items-center gap-1">
                <Check className="h-3.5 w-3.5" />
                {product.stock > 10 ? "In Stock & Ready to Ship" : `Only ${product.stock} items left!`}
              </span>
            </div>

            <div className="flex items-center gap-3">
              {/* Stepper */}
              <div className="flex items-center border border-neutral-300 rounded-xl bg-white h-12">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  disabled={quantity <= 1}
                  className="px-3.5 h-full text-neutral-600 hover:text-neutral-900 disabled:opacity-40"
                  aria-label="Decrease quantity"
                >
                  <Minus className="h-3.5 w-3.5" />
                </button>
                <span className="w-10 text-center text-sm font-bold text-neutral-900">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    setQuantity((q) => Math.min(product.stock, q + 1))
                  }
                  disabled={quantity >= product.stock}
                  className="px-3.5 h-full text-neutral-600 hover:text-neutral-900 disabled:opacity-40"
                  aria-label="Increase quantity"
                >
                  <Plus className="h-3.5 w-3.5" />
                </button>
              </div>

              {/* Add to Cart button */}
              <Button
                variant="default"
                size="lg"
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="flex-1 h-12 gap-2 text-sm font-semibold rounded-xl"
              >
                <ShoppingBag className="h-4 w-4" />
                <span>Add to Bag</span>
              </Button>

              {/* Wishlist button */}
              <button
                type="button"
                onClick={() => setIsLiked(!isLiked)}
                className="h-12 w-12 rounded-xl border border-neutral-200 bg-white flex items-center justify-center text-neutral-700 hover:bg-neutral-50 transition-all shrink-0 active:scale-95"
                aria-label="Save to favorites"
              >
                <Heart
                  className={cn(
                    "h-5 w-5",
                    isLiked ? "fill-rose-500 text-rose-500" : "text-neutral-600"
                  )}
                />
              </button>
            </div>

            {/* Buy Now Direct Button */}
            <Button
              variant="primary"
              size="lg"
              onClick={handleBuyNow}
              disabled={product.stock === 0}
              className="w-full h-12 gap-2 text-sm font-bold rounded-xl shadow-md"
            >
              <Zap className="h-4 w-4 fill-white" />
              <span>Buy Now — Instant Checkout</span>
            </Button>
          </div>

          {/* Perks Bar */}
          <div className="rounded-2xl bg-neutral-50 p-4 border border-neutral-100 space-y-3 text-xs text-neutral-700">
            <div className="flex items-center gap-3">
              <Truck className="h-4 w-4 text-[#F95721] shrink-0" />
              <span>Complimentary shipping on orders exceeding ₹1,999.</span>
            </div>
            <div className="flex items-center gap-3">
              <RotateCcw className="h-4 w-4 text-[#F95721] shrink-0" />
              <span>14-day hassle-free return and exchange guarantee.</span>
            </div>
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-4 w-4 text-[#F95721] shrink-0" />
              <span>Authenticity verified and backed by KICKZ studio warranty.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section: Description, Specifications, Reviews (Reference 3) */}
      <div className="mt-16 pt-10 border-t border-neutral-200">
        <Tabs defaultValue="specs">
          <TabsList className="w-full sm:w-auto">
            <TabsTrigger value="specs">Specifications & Materials</TabsTrigger>
            <TabsTrigger value="description">Design Philosophy</TabsTrigger>
            <TabsTrigger value="reviews">
              Customer Reviews ({product.reviewCount})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="specs" className="mt-6">
            <div className="bg-white rounded-2xl border border-neutral-200/80 p-6 max-w-3xl">
              <h3 className="text-sm font-bold text-neutral-900 uppercase tracking-wider mb-4">
                Technical Specifications
              </h3>
              {product.specifications ? (
                <div className="divide-y divide-neutral-100 text-xs">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="py-2.5 grid grid-cols-3 gap-4">
                      <span className="font-semibold text-neutral-500">{key}</span>
                      <span className="col-span-2 text-neutral-900 font-medium">
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-neutral-500">
                  Standard specifications and sizing apply. Contact support for tailored sizing advice.
                </p>
              )}
            </div>
          </TabsContent>

          <TabsContent value="description" className="mt-6">
            <div className="bg-white rounded-2xl border border-neutral-200/80 p-6 max-w-3xl space-y-4 text-xs sm:text-sm text-neutral-600 leading-relaxed">
              <h3 className="text-sm font-bold text-neutral-900 uppercase tracking-wider">
                Craftsmanship & Provenance
              </h3>
              <p>
                Every stitch and seam in this piece has been carefully considered to maximize longevity, timeless appeal, and day-to-day tactile comfort.
              </p>
              <p>
                We collaborate directly with generational mills and artisanal workshops who respect fair trade standards and minimize manufacturing environmental waste.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="mt-6">
            <div className="bg-white rounded-2xl border border-neutral-200/80 p-6 max-w-3xl space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
                <div>
                  <h3 className="text-base font-bold text-neutral-900">
                    Average Customer Rating: {product.rating} / 5.0
                  </h3>
                  <p className="text-xs text-neutral-500">
                    Based on {product.reviewCount} verified purchases
                  </p>
                </div>
                <div className="flex gap-1 text-amber-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400" />
                  ))}
                </div>
              </div>

              <div className="space-y-4 text-xs">
                <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-100 space-y-1.5">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-neutral-900">Vikram S.</span>
                    <span className="text-neutral-400">Verified Buyer • 3 days ago</span>
                  </div>
                  <div className="flex gap-1 text-amber-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-3 w-3 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-neutral-700 leading-relaxed">
                    Exceeded my expectations in person. The materials feel solid and luxurious. Fit is true to size.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Related Products Carousel/Grid ("You Might Also Like" - Reference 3) */}
      {relatedProducts.length > 0 && (
        <div className="mt-20 pt-10 border-t border-neutral-200">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#F95721]">
                Complete The Look
              </span>
              <h2 className="text-2xl font-extrabold text-neutral-900 mt-1">
                You Might Also Like
              </h2>
            </div>
            <Link
              href={`/categories/${product.category}`}
              className="text-xs font-semibold text-neutral-600 hover:text-neutral-950"
            >
              Explore {product.category.replace("-", " & ")} →
            </Link>
          </div>

          <ProductGrid products={relatedProducts} columns={4} />
        </div>
      )}
    </div>
  );
}

