import { CartItem } from "./cart";
import { PaymentStatus, PaymentMethodType } from "./payment";

export interface ShippingAddress {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  apartment?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  discount: number;
  discountCode?: string;
  tax: number;
  total: number;
  paymentStatus: PaymentStatus;
  paymentMethod?: PaymentMethodType;
  transactionId?: string;
  shippingAddress: ShippingAddress;
  createdAt: string;
}

