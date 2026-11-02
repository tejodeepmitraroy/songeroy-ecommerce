"use client";

import React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { XCircle, RotateCcw, ShoppingBag, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function OrderFailedClient() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const reason =
    searchParams.get("reason") ||
    "Payment simulation declined: Card issuer returned authorization code 'ERR_SIMULATED_DECLINE_05'.";

  return (
    <div className="max-w-xl mx-auto px-4 sm:px-6 py-16 sm:py-24 text-center space-y-6">
      <div className="w-20 h-20 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto shadow-sm animate-in zoom-in-75">
        <XCircle className="h-10 w-10" />
      </div>

      <div className="space-y-2">
        <span className="text-xs font-bold uppercase tracking-widest text-rose-600">
          Payment Simulation Unsuccessful
        </span>
        <h1 className="text-3xl font-extrabold text-neutral-900 tracking-tight">
          Transaction Was Declined
        </h1>
        <p className="text-sm text-neutral-500 max-w-md mx-auto">
          We were unable to complete authorization through the simulated payment gateway. No funds were debited.
        </p>
      </div>

      {/* Failure reason card */}
      <div className="p-5 rounded-2xl bg-white border border-rose-200/90 shadow-xs text-left space-y-2 text-xs">
        <div className="flex justify-between items-center text-neutral-500">
          <span>Attempted Order:</span>
          <span className="font-mono font-bold text-neutral-900">{orderId || "Pending"}</span>
        </div>
        <div className="pt-2 border-t border-rose-100">
          <span className="font-semibold text-rose-800 block mb-1">
            Simulated Decline Reason:
          </span>
          <p className="text-rose-700 font-mono bg-rose-50/80 p-2.5 rounded-lg">
            {reason}
          </p>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
        {orderId ? (
          <Button asChild variant="primary" size="lg" className="w-full sm:w-auto font-bold gap-2">
            <Link href={`/payment?orderId=${orderId}`}>
              <RotateCcw className="h-4 w-4" />
              <span>Retry Payment</span>
            </Link>
          </Button>
        ) : (
          <Button asChild variant="primary" size="lg" className="w-full sm:w-auto font-bold gap-2">
            <Link href="/checkout">
              <RotateCcw className="h-4 w-4" />
              <span>Restart Checkout</span>
            </Link>
          </Button>
        )}

        <Button asChild variant="outline" size="lg" className="w-full sm:w-auto font-semibold gap-2">
          <Link href="/cart">
            <ShoppingBag className="h-4 w-4" />
            <span>Return to Shopping Bag</span>
          </Link>
        </Button>
      </div>

      <p className="text-xs text-neutral-400 pt-4 flex items-center justify-center gap-1">
        <HelpCircle className="h-3.5 w-3.5" />
        <span>Need guidance? Contact our client care team or explore the FAQ page.</span>
      </p>
    </div>
  );
}

