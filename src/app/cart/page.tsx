"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  Tag,
  ShieldCheck,
  Truck,
  Sparkles,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatCurrency } from "@/lib/currency";
import { FREE_SHIPPING_THRESHOLD } from "@/lib/pricing";
import { Button } from "@/components/ui/button";
import { Breadcrumbs } from "@/components/products/Breadcrumbs";

export default function CartPage() {
  const router = useRouter();
  const {
    enrichedItems,
    pricing,
    couponCode,
    applyCoupon,
    removeCoupon,
    updateQuantity,
    removeFromCart,
    clearCart,
    getCartItemCount,
    isHydrated,
  } = useCart();

  const [inputCoupon, setInputCoupon] = useState("");
  const [couponError, setCouponError] = useState("");

  const itemCount = isHydrated ? getCartItemCount() : 0;
  const progressPercent = Math.min(
    100,
    Math.round((pricing.subtotal / FREE_SHIPPING_THRESHOLD) * 100)
  );

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError("");
    if (!inputCoupon.trim()) return;

    const res = applyCoupon(inputCoupon);
    if (!res.success) {
      setCouponError("Invalid promo code. Try WELCOME10 or KICKZ20");
    } else {
      setInputCoupon("");
    }
  };

  if (!isHydrated) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center text-sm text-neutral-500">
        Loading shopping bag...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      <Breadcrumbs items={[{ label: "Shopping Bag" }]} />

      <div className="flex flex-col sm:flex-row items-baseline justify-between gap-2 pb-6 border-b border-neutral-200 mt-2">
        <h1 className="text-3xl font-extrabold text-neutral-900 tracking-tight">
          Your Shopping Bag
        </h1>
        <span className="text-xs sm:text-sm font-semibold text-neutral-500">
          {itemCount} {itemCount === 1 ? "item" : "items"}
        </span>
      </div>

      {enrichedItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-3xl border border-dashed border-neutral-200 mt-8 p-8">
          <div className="w-20 h-20 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-400 mb-4">
            <ShoppingBag className="h-10 w-10" />
          </div>
          <h2 className="text-xl font-bold text-neutral-900 mb-2">
            Your shopping bag is empty
          </h2>
          <p className="text-sm text-neutral-500 max-w-sm mb-6 leading-relaxed">
            Explore our curated collections of minimal clothing, artisanal footwear, and lifestyle objects.
          </p>
          <Button asChild variant="primary" size="lg" className="font-semibold gap-2">
            <Link href="/shop">
              Explore Collections <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mt-8 items-start">
          {/* Items Table / Column (8 cols) */}
          <div className="lg:col-span-8 space-y-4">
            {/* Free shipping bar */}
            <div className="bg-white rounded-2xl p-4 border border-neutral-200/80 shadow-xs">
              <div className="flex items-center justify-between text-xs mb-2">
                {pricing.amountNeededForFreeShipping > 0 ? (
                  <span className="text-neutral-700">
                    Add{" "}
                    <strong className="text-neutral-900 font-bold">
                      {formatCurrency(pricing.amountNeededForFreeShipping)}
                    </strong>{" "}
                    more to unlock <strong>Free Express Shipping</strong>
                  </span>
                ) : (
                  <span className="text-emerald-700 font-bold flex items-center gap-1.5">
                    <Sparkles className="h-4 w-4 text-emerald-600" />
                    Unlocked! Free Express Shipping on this order.
                  </span>
                )}
                <span className="font-bold text-neutral-500">{progressPercent}%</span>
              </div>
              <div className="h-2 w-full bg-neutral-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${
                    progressPercent >= 100 ? "bg-emerald-500" : "bg-[#F95721]"
                  }`}
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Item Cards */}
            <div className="bg-white rounded-2xl border border-neutral-200/80 divide-y divide-neutral-100 shadow-xs overflow-hidden">
              {enrichedItems.map((item) => (
                <div
                  key={`${item.productId}-${item.selectedColor || "c"}-${
                    item.selectedSize || "s"
                  }`}
                  className="p-4 sm:p-6 flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center"
                >
                  {/* Thumbnail */}
                  <div className="relative w-24 h-28 sm:w-28 sm:h-32 rounded-xl overflow-hidden bg-neutral-100 shrink-0 border border-neutral-100">
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fill
                      sizes="120px"
                      className="object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                          {item.product.category.replace("-", " & ")}
                        </span>
                        <Link
                          href={`/products/${item.product.slug}`}
                          className="text-base font-bold text-neutral-900 hover:underline block leading-snug"
                        >
                          {item.product.name}
                        </Link>
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          removeFromCart(
                            item.productId,
                            item.selectedColor,
                            item.selectedSize
                          )
                        }
                        className="text-neutral-400 hover:text-rose-600 p-1 transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>

                    {/* Variant tags */}
                    <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-500 mt-2">
                      {item.selectedColor && (
                        <span className="inline-flex items-center gap-1 bg-neutral-50 px-2 py-0.5 rounded-md border border-neutral-200/60">
                          Color: <strong className="text-neutral-800">{item.selectedColor}</strong>
                        </span>
                      )}
                      {item.selectedSize && (
                        <span className="inline-flex items-center gap-1 bg-neutral-50 px-2 py-0.5 rounded-md border border-neutral-200/60">
                          Size: <strong className="text-neutral-800">{item.selectedSize}</strong>
                        </span>
                      )}
                      <span className="text-neutral-400">
                        Unit: {formatCurrency(item.product.price)}
                      </span>
                    </div>

                    {/* Stepper & Line Price */}
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center border border-neutral-300 rounded-lg bg-white">
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(
                              item.productId,
                              item.quantity - 1,
                              item.selectedColor,
                              item.selectedSize
                            )
                          }
                          className="px-2.5 py-1 text-neutral-600 hover:text-neutral-900"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="px-3 text-xs font-bold text-neutral-900 min-w-8 text-center">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(
                              item.productId,
                              item.quantity + 1,
                              item.selectedColor,
                              item.selectedSize
                            )
                          }
                          disabled={item.quantity >= item.product.stock}
                          className="px-2.5 py-1 text-neutral-600 hover:text-neutral-900 disabled:opacity-40"
                          aria-label="Increase quantity"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="text-base font-extrabold text-neutral-950">
                          {formatCurrency(item.lineTotal)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Clear Cart / Continue Shopping Buttons */}
            <div className="flex justify-between items-center pt-2">
              <Link
                href="/shop"
                className="text-xs font-semibold text-neutral-600 hover:text-neutral-900 underline underline-offset-4"
              >
                ← Continue Shopping
              </Link>
              <button
                type="button"
                onClick={clearCart}
                className="text-xs text-neutral-400 hover:text-rose-600 transition-colors"
              >
                Clear Entire Bag
              </button>
            </div>
          </div>

          {/* Order Summary Column (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Promo code input */}
            <div className="bg-white rounded-2xl p-5 border border-neutral-200/80 shadow-xs">
              <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-900 mb-3 flex items-center gap-1.5">
                <Tag className="h-3.5 w-3.5 text-[#F95721]" />
                Promo / Coupon Code
              </h3>

              {couponCode ? (
                <div className="flex items-center justify-between rounded-xl bg-emerald-50 border border-emerald-200 p-3 text-xs">
                  <div>
                    <span className="font-bold text-emerald-900">
                      {couponCode} Applied!
                    </span>
                    <p className="text-emerald-700 text-[11px]">
                      {pricing.discount > 0 && `You saved ${formatCurrency(pricing.discount)}`}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={removeCoupon}
                    className="text-emerald-800 hover:text-emerald-950 font-semibold underline text-xs"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="space-y-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="e.g. WELCOME10"
                      value={inputCoupon}
                      onChange={(e) => {
                        setInputCoupon(e.target.value);
                        setCouponError("");
                      }}
                      className="flex-1 h-10 px-3 rounded-lg border border-neutral-300 text-xs uppercase text-neutral-900 focus:outline-none focus:border-neutral-900"
                    />
                    <Button type="submit" variant="outline" size="sm" className="h-10 px-4 text-xs font-semibold">
                      Apply
                    </Button>
                  </div>
                  {couponError && (
                    <p className="text-[11px] text-rose-600 font-medium">{couponError}</p>
                  )}
                  <p className="text-[10px] text-neutral-400">
                    Try demo coupon <strong>WELCOME10</strong> (10% off) or <strong>KICKZ20</strong> (20% off).
                  </p>
                </form>
              )}
            </div>

            {/* Price Breakdown */}
            <div className="bg-white rounded-2xl p-6 border border-neutral-200/80 shadow-xs space-y-4">
              <h3 className="text-sm font-bold text-neutral-900 uppercase tracking-wider pb-3 border-b border-neutral-100">
                Order Summary
              </h3>

              <div className="space-y-2.5 text-xs text-neutral-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-neutral-900">
                    {formatCurrency(pricing.subtotal)}
                  </span>
                </div>

                {pricing.discount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-semibold">
                    <span>Discount ({pricing.discountCode})</span>
                    <span>-{formatCurrency(pricing.discount)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Estimated Delivery</span>
                  <span className="font-semibold text-neutral-900">
                    {pricing.shipping === 0 ? (
                      <span className="text-emerald-600 uppercase font-bold text-[11px]">
                        FREE
                      </span>
                    ) : (
                      formatCurrency(pricing.shipping)
                    )}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Estimated Tax (18% GST)</span>
                  <span className="font-semibold text-neutral-900">
                    {formatCurrency(pricing.tax)}
                  </span>
                </div>
              </div>

              <div className="pt-3 border-t border-neutral-200 flex justify-between items-baseline">
                <div>
                  <span className="text-base font-bold text-neutral-950 block">
                    Estimated Total
                  </span>
                  <span className="text-[10px] text-neutral-400">
                    Calculated in INR (₹)
                  </span>
                </div>
                <span className="text-2xl font-black text-neutral-950">
                  {formatCurrency(pricing.total)}
                </span>
              </div>

              <Button
                variant="primary"
                size="lg"
                onClick={() => router.push("/checkout")}
                className="w-full font-bold text-sm gap-2 rounded-xl shadow-md"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="h-4 w-4" />
              </Button>

              {/* Guarantees */}
              <div className="pt-3 space-y-2 text-[11px] text-neutral-500 border-t border-neutral-100">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>Secure demo SSL encrypted checkout</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="h-4 w-4 text-[#F95721] shrink-0" />
                  <span>Dispatch within 24 hours from Bengaluru hub</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

