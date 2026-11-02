"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  CheckCircle2,
  Printer,
  AlertTriangle,
  ArrowRight,
} from "lucide-react";
import { Order } from "@/types/order";
import { getDemoOrderById } from "@/services/demo-orders";
import { getProductById } from "@/data/products";
import { formatCurrency } from "@/lib/currency";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function OrderSuccessClient({ orderId }: { orderId: string }) {
  const [order, setOrder] = useState<Order | null | undefined>(undefined);

  useEffect(() => {
    queueMicrotask(() => {
      const found = getDemoOrderById(orderId);
      setOrder(found || null);
    });
  }, [orderId]);

  if (order === undefined) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center text-sm text-neutral-500">
        Verifying order record...
      </div>
    );
  }

  // Security check: Must exist and have paymentStatus === 'success'
  if (!order || order.paymentStatus !== "success") {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
          <AlertTriangle className="h-8 w-8" />
        </div>
        <h1 className="text-xl font-bold text-neutral-900">
          Invalid or Incomplete Order
        </h1>
        <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed">
          Order <strong>&quot;{orderId}&quot;</strong> could not be verified as a successful transaction. Manually entered or pending orders cannot access this confirmation.
        </p>
        <div className="pt-2">
          <Button asChild variant="primary">
            <Link href="/shop">Return to Shop Catalog</Link>
          </Button>
        </div>
      </div>
    );
  }

  const orderDate = new Date(order.createdAt).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const estimatedDelivery = new Date(
    new Date(order.createdAt).getTime() + 4 * 24 * 60 * 60 * 1000
  ).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      {/* Success Hero Header */}
      <div className="text-center space-y-3 mb-10">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-2 shadow-sm animate-in zoom-in-75">
          <CheckCircle2 className="h-9 w-9" />
        </div>
        <span className="text-xs font-bold uppercase tracking-widest text-emerald-600">
          Simulated Payment Authorized
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-950 tracking-tight">
          Thank you for your order!
        </h1>
        <p className="text-sm text-neutral-500 max-w-md mx-auto">
          Your order has been placed in our demo system. A simulated receipt has been dispatched to{" "}
          <strong className="text-neutral-900">{order.shippingAddress.email}</strong>.
        </p>
      </div>

      {/* Main Order Details Card */}
      <div className="bg-white rounded-3xl border border-neutral-200/90 shadow-sm overflow-hidden space-y-6 p-6 sm:p-8">
        {/* Meta Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pb-6 border-b border-neutral-100 text-xs">
          <div>
            <span className="text-neutral-400 block mb-0.5">Order Number</span>
            <strong className="text-neutral-900 text-sm font-extrabold">{order.id}</strong>
          </div>
          <div>
            <span className="text-neutral-400 block mb-0.5">Order Date</span>
            <span className="text-neutral-800 font-medium">{orderDate}</span>
          </div>
          <div>
            <span className="text-neutral-400 block mb-0.5">Payment Status</span>
            <Badge variant="discount" className="text-[11px] font-bold">
              ✓ Paid (Demo)
            </Badge>
          </div>
          <div>
            <span className="text-neutral-400 block mb-0.5">Estimated Delivery</span>
            <span className="text-neutral-800 font-semibold">{estimatedDelivery}</span>
          </div>
        </div>

        {/* Transaction ID if available */}
        {order.transactionId && (
          <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-100 flex items-center justify-between text-xs text-neutral-600">
            <span>Gateway Transaction Reference:</span>
            <code className="font-mono text-neutral-900 font-semibold">{order.transactionId}</code>
          </div>
        )}

        {/* Purchased Items List */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-neutral-900 uppercase tracking-wider">
            Items Purchased
          </h3>
          <div className="divide-y divide-neutral-100">
            {order.items.map((item, idx) => {
              const product = getProductById(item.productId);
              return (
                <div key={idx} className="py-3.5 flex gap-4 items-center">
                  <div className="relative w-14 h-16 rounded-lg bg-neutral-100 overflow-hidden shrink-0 border border-neutral-100">
                    {product && (
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        sizes="60px"
                        className="object-cover"
                      />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-neutral-900 line-clamp-1">
                      {product?.name || item.productId}
                    </h4>
                    <div className="text-[11px] text-neutral-500 mt-0.5 space-x-1">
                      <span>Qty: {item.quantity}</span>
                      {item.selectedColor && <span>• {item.selectedColor}</span>}
                      {item.selectedSize && <span>• {item.selectedSize}</span>}
                    </div>
                  </div>
                  <div className="text-xs font-bold text-neutral-900">
                    {product ? formatCurrency(product.price * item.quantity) : "—"}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Delivery Address & Summary Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-neutral-100 text-xs">
          <div>
            <h4 className="font-bold text-neutral-900 uppercase tracking-wider mb-2">
              Delivery Address
            </h4>
            <div className="text-neutral-600 space-y-1">
              <p className="font-semibold text-neutral-900">{order.shippingAddress.fullName}</p>
              <p>{order.shippingAddress.address}</p>
              {order.shippingAddress.apartment && <p>{order.shippingAddress.apartment}</p>}
              <p>
                {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.postalCode}
              </p>
              <p>{order.shippingAddress.country}</p>
              <p className="text-neutral-400 pt-1">Phone: {order.shippingAddress.phone}</p>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-neutral-900 uppercase tracking-wider mb-2">
              Payment Breakdown
            </h4>
            <div className="space-y-1.5 text-neutral-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatCurrency(order.subtotal)}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-emerald-600">
                  <span>Discount</span>
                  <span>-{formatCurrency(order.discount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>
                  {order.shipping === 0 ? "FREE" : formatCurrency(order.shipping)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>GST Tax (18%)</span>
                <span>{formatCurrency(order.tax)}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-neutral-200 text-sm font-bold text-neutral-950">
                <span>Total Amount</span>
                <span>{formatCurrency(order.total)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-6 border-t border-neutral-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <Button
            type="button"
            variant="outline"
            size="default"
            onClick={() => window.print()}
            className="w-full sm:w-auto gap-2 text-xs font-semibold"
          >
            <Printer className="h-4 w-4" />
            <span>Print Order Receipt</span>
          </Button>

          <Button asChild variant="primary" size="lg" className="w-full sm:w-auto font-bold gap-2">
            <Link href="/shop">
              <span>Continue Shopping</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

