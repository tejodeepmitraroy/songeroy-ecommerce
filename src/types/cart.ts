import { Product } from "./product";

export interface CartItem {
  productId: string;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

export interface EnrichedCartItem extends CartItem {
  product: Product;
  lineTotal: number;
}

export interface CartPricingSummary {
  subtotal: number;
  shipping: number;
  discount: number;
  discountCode?: string;
  tax: number;
  total: number;
  freeShippingThreshold: number;
  amountNeededForFreeShipping: number;
}

