import { CartPricingSummary } from "@/types/cart";

export const FREE_SHIPPING_THRESHOLD = 1999;
export const STANDARD_SHIPPING_FEE = 99;
export const DEMO_TAX_RATE = 0.18; // 18% standard GST

export interface CouponDiscount {
  code: string;
  type: "percentage" | "fixed";
  value: number;
  description: string;
}

export const DEMO_COUPONS: Record<string, CouponDiscount> = {
  WELCOME10: {
    code: "WELCOME10",
    type: "percentage",
    value: 0.1, // 10%
    description: "10% off your entire order",
  },
  KICKZ20: {
    code: "KICKZ20",
    type: "percentage",
    value: 0.2, // 20%
    description: "20% off VIP welcome discount",
  },
  FLAT500: {
    code: "FLAT500",
    type: "fixed",
    value: 500,
    description: "₹500 flat discount on orders over ₹2,500",
  },
};

export function calculateDiscount(subtotal: number, couponCode?: string): number {
  if (!couponCode) return 0;
  const coupon = DEMO_COUPONS[couponCode.trim().toUpperCase()];
  if (!coupon) return 0;

  if (coupon.type === "percentage") {
    return Math.round(subtotal * coupon.value * 100) / 100;
  } else if (coupon.type === "fixed") {
    if (subtotal >= 2500) {
      return Math.min(coupon.value, subtotal);
    }
    return 0;
  }
  return 0;
}

export function calculateShipping(subtotalAfterDiscount: number): number {
  if (subtotalAfterDiscount <= 0) return 0;
  return subtotalAfterDiscount >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING_FEE;
}

export function calculateTax(taxableAmount: number): number {
  if (taxableAmount <= 0) return 0;
  return Math.round(taxableAmount * DEMO_TAX_RATE * 100) / 100;
}

export function calculateCartPricing(
  subtotal: number,
  couponCode?: string
): CartPricingSummary {
  const safeSubtotal = Math.max(0, subtotal);
  const discount = calculateDiscount(safeSubtotal, couponCode);
  const subtotalAfterDiscount = Math.max(0, safeSubtotal - discount);
  const shipping = safeSubtotal > 0 ? calculateShipping(subtotalAfterDiscount) : 0;
  const tax = calculateTax(subtotalAfterDiscount);
  const total = Math.round((subtotalAfterDiscount + shipping + tax) * 100) / 100;

  const amountNeededForFreeShipping = Math.max(
    0,
    FREE_SHIPPING_THRESHOLD - safeSubtotal
  );

  return {
    subtotal: safeSubtotal,
    shipping,
    discount,
    discountCode: discount > 0 ? couponCode?.toUpperCase() : undefined,
    tax,
    total: Math.max(0, total),
    freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
    amountNeededForFreeShipping,
  };
}

