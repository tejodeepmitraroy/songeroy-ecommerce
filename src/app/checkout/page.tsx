"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowLeft,
  Lock,
  ShieldCheck,
  Truck,
  RotateCcw,
  ArrowRight,
  AlertCircle,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import {
  checkoutShippingSchema,
  CheckoutShippingFormData,
} from "@/lib/validation";
import { formatCurrency } from "@/lib/currency";
import { createPendingDemoOrder } from "@/services/demo-orders";
import { setToStorage, getFromStorage } from "@/lib/storage";
import { Button } from "@/components/ui/button";

const SAVED_SHIPPING_KEY = "kickz_saved_shipping_info_v1";

const defaultValues: CheckoutShippingFormData = {
  fullName: "",
  email: "",
  phone: "",
  address: "",
  apartment: "",
  city: "Bengaluru",
  state: "Karnataka",
  postalCode: "560038",
  country: "India",
  saveInfo: true,
};

export default function CheckoutPage() {
  const router = useRouter();
  const { enrichedItems, pricing, isHydrated } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CheckoutShippingFormData>({
    resolver: zodResolver(checkoutShippingSchema),
    defaultValues,
  });

  // Pre-fill if previously saved
  useEffect(() => {
    const saved = getFromStorage<Partial<CheckoutShippingFormData>>(
      SAVED_SHIPPING_KEY,
      {}
    );
    if (saved && Object.keys(saved).length > 0) {
      reset({ ...defaultValues, ...saved });
    }
  }, [reset]);

  const onSubmit = (data: CheckoutShippingFormData) => {
    if (enrichedItems.length === 0) return;

    setIsSubmitting(true);

    if (data.saveInfo) {
      setToStorage(SAVED_SHIPPING_KEY, data);
    }

    // Create a pending demo order
    const order = createPendingDemoOrder({
      items: enrichedItems.map((i) => ({
        productId: i.productId,
        quantity: i.quantity,
        selectedColor: i.selectedColor,
        selectedSize: i.selectedSize,
      })),
      subtotal: pricing.subtotal,
      shipping: pricing.shipping,
      discount: pricing.discount,
      discountCode: pricing.discountCode,
      tax: pricing.tax,
      total: pricing.total,
      shippingAddress: {
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        address: data.address,
        apartment: data.apartment,
        city: data.city,
        state: data.state,
        postalCode: data.postalCode,
        country: data.country,
      },
    });

    // Store active order ID in session
    setToStorage("kickz_current_checkout_order_id", order.id);

    // Navigate to payment simulation page
    router.push(`/payment?orderId=${order.id}`);
  };

  if (!isHydrated) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center text-sm text-neutral-500">
        Loading checkout...
      </div>
    );
  }

  if (enrichedItems.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-neutral-900 mb-2">
          Your cart is empty
        </h2>
        <p className="text-sm text-neutral-500 mb-6">
          Please add items to your bag before proceeding to checkout.
        </p>
        <Button asChild variant="primary">
          <Link href="/shop">Browse Collections</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Top Bar with Back and Security */}
      <div className="flex items-center justify-between pb-6 border-b border-neutral-200">
        <Link
          href="/cart"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#F95721] hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Cart</span>
        </Link>

        <div className="flex items-center gap-1.5 text-xs font-medium text-neutral-600">
          <Lock className="h-3.5 w-3.5 text-neutral-500" />
          <span>Secure Checkout</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 mt-8 items-start">
        {/* Left Form (7 cols) - Matches Reference 1 */}
        <div className="lg:col-span-7 space-y-8">
          <div>
            <h1 className="text-3xl font-extrabold text-neutral-950 tracking-tight">
              Checkout
            </h1>

            {/* 3-Step Indicator matching Reference 1 */}
            <div className="flex items-center gap-4 mt-4 text-xs font-semibold">
              <div className="flex items-center gap-2 text-[#F95721]">
                <span className="w-5 h-5 rounded-full bg-[#F95721] text-white flex items-center justify-center text-[11px] font-bold">
                  1
                </span>
                <span>Shipping</span>
              </div>
              <div className="h-[1px] w-8 bg-neutral-200" />
              <div className="flex items-center gap-2 text-neutral-400">
                <span className="w-5 h-5 rounded-full border border-neutral-300 flex items-center justify-center text-[11px]">
                  2
                </span>
                <span>Payment</span>
              </div>
              <div className="h-[1px] w-8 bg-neutral-200" />
              <div className="flex items-center gap-2 text-neutral-400">
                <span className="w-5 h-5 rounded-full border border-neutral-300 flex items-center justify-center text-[11px]">
                  3
                </span>
                <span>Review</span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Contact Information */}
            <div className="space-y-4">
              <h2 className="text-base font-bold text-neutral-900">
                Contact Information
              </h2>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-neutral-600">
                  Email Address *
                </label>
                <input
                  type="email"
                  placeholder="youremail@example.com"
                  {...register("email")}
                  className={`w-full h-11 px-3.5 rounded-xl border bg-white text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none transition-colors ${
                    errors.email
                      ? "border-rose-400 focus:border-rose-500 ring-1 ring-rose-400"
                      : "border-neutral-200 focus:border-neutral-900"
                  }`}
                />
                {errors.email && (
                  <p className="text-xs text-rose-600 flex items-center gap-1 mt-1 font-medium">
                    <AlertCircle className="h-3 w-3" />
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>

            {/* Shipping Address */}
            <div className="space-y-4">
              <h2 className="text-base font-bold text-neutral-900">
                Shipping Address
              </h2>

              {/* Full Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-neutral-600">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    placeholder="First and last name"
                    {...register("fullName")}
                    className={`w-full h-11 px-3.5 rounded-xl border bg-white text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none transition-colors ${
                      errors.fullName
                        ? "border-rose-400 focus:border-rose-500 ring-1 ring-rose-400"
                        : "border-neutral-200 focus:border-neutral-900"
                    }`}
                  />
                  {errors.fullName && (
                    <p className="text-xs text-rose-600 flex items-center gap-1 mt-1 font-medium">
                      <AlertCircle className="h-3 w-3" />
                      {errors.fullName.message}
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-neutral-600">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    placeholder="10-digit mobile number"
                    {...register("phone")}
                    className={`w-full h-11 px-3.5 rounded-xl border bg-white text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none transition-colors ${
                      errors.phone
                        ? "border-rose-400 focus:border-rose-500 ring-1 ring-rose-400"
                        : "border-neutral-200 focus:border-neutral-900"
                    }`}
                  />
                  {errors.phone && (
                    <p className="text-xs text-rose-600 flex items-center gap-1 mt-1 font-medium">
                      <AlertCircle className="h-3 w-3" />
                      {errors.phone.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Address Line 1 */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-neutral-600">
                  Address Line 1 *
                </label>
                <input
                  type="text"
                  placeholder="House number, flat, street name"
                  {...register("address")}
                  className={`w-full h-11 px-3.5 rounded-xl border bg-white text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none transition-colors ${
                    errors.address
                      ? "border-rose-400 focus:border-rose-500 ring-1 ring-rose-400"
                      : "border-neutral-200 focus:border-neutral-900"
                  }`}
                />
                {errors.address && (
                  <p className="text-xs text-rose-600 flex items-center gap-1 mt-1 font-medium">
                    <AlertCircle className="h-3 w-3" />
                    {errors.address.message}
                  </p>
                )}
              </div>

              {/* Address Line 2 */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-neutral-600">
                  Address Line 2 (Optional)
                </label>
                <input
                  type="text"
                  placeholder="Apartment, suite, landmark, floor"
                  {...register("apartment")}
                  className="w-full h-11 px-3.5 rounded-xl border border-neutral-200 bg-white text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-900"
                />
              </div>

              {/* City & State */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-neutral-600">
                    City *
                  </label>
                  <input
                    type="text"
                    placeholder="City"
                    {...register("city")}
                    className={`w-full h-11 px-3.5 rounded-xl border bg-white text-sm text-neutral-900 focus:outline-none ${
                      errors.city ? "border-rose-400" : "border-neutral-200"
                    }`}
                  />
                  {errors.city && (
                    <p className="text-xs text-rose-600 font-medium">
                      {errors.city.message}
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-neutral-600">
                    State / Province *
                  </label>
                  <input
                    type="text"
                    placeholder="State"
                    {...register("state")}
                    className={`w-full h-11 px-3.5 rounded-xl border bg-white text-sm text-neutral-900 focus:outline-none ${
                      errors.state ? "border-rose-400" : "border-neutral-200"
                    }`}
                  />
                  {errors.state && (
                    <p className="text-xs text-rose-600 font-medium">
                      {errors.state.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Postal Code & Country */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-neutral-600">
                    ZIP / Postal Code *
                  </label>
                  <input
                    type="text"
                    placeholder="PIN Code"
                    {...register("postalCode")}
                    className={`w-full h-11 px-3.5 rounded-xl border bg-white text-sm text-neutral-900 focus:outline-none ${
                      errors.postalCode
                        ? "border-rose-400"
                        : "border-neutral-200"
                    }`}
                  />
                  {errors.postalCode && (
                    <p className="text-xs text-rose-600 font-medium">
                      {errors.postalCode.message}
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-neutral-600">
                    Country *
                  </label>
                  <select
                    {...register("country")}
                    className="w-full h-11 px-3.5 rounded-xl border border-neutral-200 bg-white text-sm text-neutral-900 focus:outline-none cursor-pointer"
                  >
                    <option value="India">India</option>
                    <option value="United States">United States</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Singapore">Singapore</option>
                    <option value="United Arab Emirates">United Arab Emirates</option>
                  </select>
                </div>
              </div>

              {/* Save info checkbox */}
              <div className="pt-2">
                <label className="flex items-center gap-2.5 text-xs font-medium text-neutral-700 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    {...register("saveInfo")}
                    className="w-4 h-4 rounded text-[#F95721] accent-[#F95721] cursor-pointer"
                  />
                  <span>Save this information for next time</span>
                </label>
              </div>
            </div>

            {/* Continue to Payment CTA matching Reference 1 */}
            <div className="pt-4">
              <Button
                type="submit"
                variant="primary"
                size="xl"
                disabled={isSubmitting}
                className="w-full font-bold text-base shadow-md gap-2"
              >
                <span>{isSubmitting ? "Proceeding..." : "Continue to Payment"}</span>
                <ArrowRight className="h-5 w-5" />
              </Button>
            </div>
          </form>
        </div>

        {/* Right Order Summary Card (5 cols) - Matches Reference 1 */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-7 border border-neutral-200/90 shadow-sm space-y-6">
          <h2 className="text-base font-bold text-neutral-950 pb-4 border-b border-neutral-100">
            Order Summary
          </h2>

          {/* Items breakdown list */}
          <div className="divide-y divide-neutral-100 max-h-72 overflow-y-auto pr-1">
            {enrichedItems.map((item) => (
              <div
                key={`${item.productId}-${item.selectedColor || "c"}-${
                  item.selectedSize || "s"
                }`}
                className="py-3.5 flex gap-4 items-center"
              >
                <div className="relative w-16 h-18 rounded-xl overflow-hidden bg-neutral-100 shrink-0 border border-neutral-100">
                  <Image
                    src={item.product.images[0]}
                    alt={item.product.name}
                    fill
                    sizes="70px"
                    className="object-cover"
                  />
                  <span className="absolute top-1 right-1 h-4 min-w-4 rounded-full bg-neutral-900 text-white text-[10px] font-bold flex items-center justify-center px-1">
                    {item.quantity}
                  </span>
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-neutral-900 line-clamp-1">
                    {item.product.name}
                  </h4>
                  <div className="text-[11px] text-neutral-500 mt-0.5 space-x-1">
                    {item.selectedColor && <span>{item.selectedColor}</span>}
                    {item.selectedSize && <span>/ {item.selectedSize}</span>}
                  </div>
                </div>

                <div className="text-xs font-bold text-neutral-900">
                  {formatCurrency(item.lineTotal)}
                </div>
              </div>
            ))}
          </div>

          {/* Pricing Totals */}
          <div className="space-y-3 pt-3 border-t border-neutral-100 text-xs text-neutral-600">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-semibold text-neutral-900">
                {formatCurrency(pricing.subtotal)}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Shipping</span>
              <span className="font-semibold text-neutral-900">
                {pricing.shipping === 0 ? (
                  <span className="text-emerald-600 font-bold uppercase text-[11px]">
                    ₹0.00
                  </span>
                ) : (
                  formatCurrency(pricing.shipping)
                )}
              </span>
            </div>

            {pricing.discount > 0 && (
              <div className="flex justify-between text-[#F95721] font-semibold">
                <span>Discount</span>
                <span>-{formatCurrency(pricing.discount)}</span>
              </div>
            )}

            <div className="flex justify-between">
              <span>Estimated Tax (18% GST)</span>
              <span className="font-semibold text-neutral-900">
                {formatCurrency(pricing.tax)}
              </span>
            </div>
          </div>

          {/* Final Total */}
          <div className="pt-4 border-t border-neutral-200 flex justify-between items-baseline">
            <span className="text-base font-bold text-neutral-950">Total</span>
            <span className="text-2xl font-black text-[#F95721]">
              {formatCurrency(pricing.total)}
            </span>
          </div>

          {/* Secure Checkout Badges matching Reference 1 */}
          <div className="grid grid-cols-3 gap-2 pt-6 border-t border-neutral-100 text-center text-[11px] text-neutral-600">
            <div className="flex flex-col items-center gap-1.5 p-2 rounded-xl bg-neutral-50">
              <ShieldCheck className="h-5 w-5 text-[#F95721]" />
              <span className="font-semibold leading-tight">Secure Checkout</span>
            </div>
            <div className="flex flex-col items-center gap-1.5 p-2 rounded-xl bg-neutral-50">
              <Truck className="h-5 w-5 text-[#F95721]" />
              <span className="font-semibold leading-tight">Free Shipping</span>
            </div>
            <div className="flex flex-col items-center gap-1.5 p-2 rounded-xl bg-neutral-50">
              <RotateCcw className="h-5 w-5 text-[#F95721]" />
              <span className="font-semibold leading-tight">Easy Returns</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

