import { Order, ShippingAddress } from "@/types/order";
import { CartItem } from "@/types/cart";
import { PaymentStatus, PaymentMethodType } from "@/types/payment";
import { getFromStorage, setToStorage } from "@/lib/storage";

const ORDERS_STORAGE_KEY = "kickz_demo_orders_v1";

export function generateOrderId(): string {
  const num = Math.floor(100000 + Math.random() * 900000);
  return `KCK-${num}`;
}

export function getAllDemoOrders(): Order[] {
  return getFromStorage<Order[]>(ORDERS_STORAGE_KEY, []);
}

export function getDemoOrderById(id: string): Order | undefined {
  const orders = getAllDemoOrders();
  return orders.find((o) => o.id === id);
}

export function saveDemoOrder(order: Order): void {
  const orders = getAllDemoOrders();
  const existingIndex = orders.findIndex((o) => o.id === order.id);

  if (existingIndex >= 0) {
    orders[existingIndex] = order;
  } else {
    orders.unshift(order);
  }

  setToStorage(ORDERS_STORAGE_KEY, orders);
}

export function createPendingDemoOrder(params: {
  items: CartItem[];
  subtotal: number;
  shipping: number;
  discount: number;
  discountCode?: string;
  tax: number;
  total: number;
  shippingAddress: ShippingAddress;
  paymentMethod?: PaymentMethodType;
}): Order {
  const id = generateOrderId();
  const order: Order = {
    id,
    items: params.items,
    subtotal: params.subtotal,
    shipping: params.shipping,
    discount: params.discount,
    discountCode: params.discountCode,
    tax: params.tax,
    total: params.total,
    paymentStatus: "pending",
    paymentMethod: params.paymentMethod || "card",
    shippingAddress: params.shippingAddress,
    createdAt: new Date().toISOString(),
  };

  saveDemoOrder(order);
  return order;
}

export function updateDemoOrderStatus(
  orderId: string,
  status: PaymentStatus,
  transactionId?: string
): Order | undefined {
  const orders = getAllDemoOrders();
  const order = orders.find((o) => o.id === orderId);
  if (!order) return undefined;

  order.paymentStatus = status;
  if (transactionId) {
    order.transactionId = transactionId;
  }

  saveDemoOrder(order);
  return order;
}

