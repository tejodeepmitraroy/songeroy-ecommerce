"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  ShieldAlert,
  CreditCard,
  Smartphone,
  Banknote,
  Loader2,
  AlertTriangle,
  ArrowLeft,
  Lock,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatCurrency } from "@/lib/currency";
import { simulatePayment } from "@/services/fake-payment";
import {
  getDemoOrderById,
  updateDemoOrderStatus,
} from "@/services/demo-orders";
import { PaymentMethodType, PaymentScenario } from "@/types/payment";
import { Button } from "@/components/ui/button";

export function PaymentClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const { clearCart } = useCart();

  const [order, setOrder] = useState(() =>
    orderId ? getDemoOrderById(orderId) : undefined
  );

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>("card");
  const [scenario, setScenario] = useState<PaymentScenario>("success");
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Demo Card fields
  const [selectedDemoCard, setSelectedDemoCard] = useState("4242");

  // Demo UPI fields
  const [selectedUpiApp, setSelectedUpiApp] = useState("gpay");

  useEffect(() => {
    if (orderId) {
      queueMicrotask(() => {
        const found = getDemoOrderById(orderId);
        if (found) {
          setOrder(found);
        }
      });
    }
  }, [orderId]);

  if (!order) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
          <AlertTriangle className="h-8 w-8" />
        </div>
        <h2 className="text-xl font-bold text-neutral-900">
          No Pending Order Found
        </h2>
        <p className="text-xs sm:text-sm text-neutral-500">
          We couldn&apos;t locate an active order to pay for. Please restart the checkout process.
        </p>
        <Button asChild variant="primary">
          <Link href="/cart">Return to Bag</Link>
        </Button>
      </div>
    );
  }

  const handleProcessPayment = async () => {
    setIsProcessing(true);
    setErrorMessage(null);

    try {
      const result = await simulatePayment(order.total, scenario, {
        orderId: order.id,
        paymentMethod,
        delayMs: 1600,
      });

      if (result.status === "success") {
        updateDemoOrderStatus(order.id, "success", result.transactionId);
        // Clear cart only upon verified payment success
        clearCart();
        router.push(`/order-success/${order.id}`);
      } else if (result.status === "failed") {
        updateDemoOrderStatus(order.id, "failed", result.transactionId);
        router.push(
          `/order-failed?orderId=${order.id}&reason=${encodeURIComponent(
            result.message
          )}`
        );
      } else {
        // Cancelled
        updateDemoOrderStatus(order.id, "cancelled");
        setErrorMessage("Payment simulation was cancelled. You may retry or return to checkout.");
        setIsProcessing(false);
      }
    } catch {
      setErrorMessage("Unexpected demo payment service fault.");
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Back button */}
      <div className="mb-6">
        <Link
          href={`/checkout`}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-600 hover:text-neutral-900"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Cancel & Return to Checkout</span>
        </Link>
      </div>

      {/* Mandatory Demo Warning Banner */}
      <div className="rounded-2xl bg-amber-500/10 border-2 border-amber-500/30 p-5 mb-8 flex items-start gap-4">
        <ShieldAlert className="h-6 w-6 text-amber-600 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <h3 className="text-sm font-bold text-amber-900 uppercase tracking-wide">
            DEMO PAYMENT ONLY — SIMULATED SANDBOX
          </h3>
          <p className="text-xs text-amber-800 leading-relaxed font-medium">
            &quot;DEMO PAYMENT ONLY — No real money will be charged. No actual payment provider is connected.&quot;
          </p>
          <p className="text-[11px] text-amber-700">
            You can test the checkout workflow freely by switching test scenarios below (Success, Failure, Cancel).
          </p>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-neutral-200/90 shadow-sm p-6 sm:p-8 space-y-8">
        {/* Order amount overview */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-neutral-100 gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
              Order Reference
            </span>
            <h1 className="text-xl font-extrabold text-neutral-900">
              {order.id}
            </h1>
            <p className="text-xs text-neutral-500">
              Deliver to: {order.shippingAddress.fullName} • {order.shippingAddress.city}
            </p>
          </div>

          <div className="text-left sm:text-right">
            <span className="text-xs text-neutral-500 block">Payable Amount</span>
            <span className="text-3xl font-black text-[#F95721]">
              {formatCurrency(order.total)}
            </span>
          </div>
        </div>

        {/* Payment Method Selector */}
        <div className="space-y-4">
          <label className="text-xs font-bold text-neutral-900 uppercase tracking-wider block">
            Select Payment Method
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Card */}
            <button
              type="button"
              disabled={isProcessing}
              onClick={() => setPaymentMethod("card")}
              className={`p-4 rounded-2xl border text-left flex flex-col gap-2 transition-all cursor-pointer ${
                paymentMethod === "card"
                  ? "border-neutral-950 bg-neutral-900 text-white shadow-sm"
                  : "border-neutral-200 bg-white hover:border-neutral-400 text-neutral-800"
              }`}
            >
              <CreditCard className="h-5 w-5" />
              <div>
                <span className="text-sm font-bold block">Credit / Debit Card</span>
                <span className={`text-[10px] ${paymentMethod === "card" ? "text-neutral-300" : "text-neutral-400"}`}>
                  Visa, Mastercard, RuPay
                </span>
              </div>
            </button>

            {/* UPI */}
            <button
              type="button"
              disabled={isProcessing}
              onClick={() => setPaymentMethod("upi")}
              className={`p-4 rounded-2xl border text-left flex flex-col gap-2 transition-all cursor-pointer ${
                paymentMethod === "upi"
                  ? "border-neutral-950 bg-neutral-900 text-white shadow-sm"
                  : "border-neutral-200 bg-white hover:border-neutral-400 text-neutral-800"
              }`}
            >
              <Smartphone className="h-5 w-5" />
              <div>
                <span className="text-sm font-bold block">Instant UPI</span>
                <span className={`text-[10px] ${paymentMethod === "upi" ? "text-neutral-300" : "text-neutral-400"}`}>
                  GPay, PhonePe, Paytm
                </span>
              </div>
            </button>

            {/* COD */}
            <button
              type="button"
              disabled={isProcessing}
              onClick={() => setPaymentMethod("cod")}
              className={`p-4 rounded-2xl border text-left flex flex-col gap-2 transition-all cursor-pointer ${
                paymentMethod === "cod"
                  ? "border-neutral-950 bg-neutral-900 text-white shadow-sm"
                  : "border-neutral-200 bg-white hover:border-neutral-400 text-neutral-800"
              }`}
            >
              <Banknote className="h-5 w-5" />
              <div>
                <span className="text-sm font-bold block">Cash on Delivery</span>
                <span className={`text-[10px] ${paymentMethod === "cod" ? "text-neutral-300" : "text-neutral-400"}`}>
                  Simulated doorstep cash
                </span>
              </div>
            </button>
          </div>
        </div>

        {/* Method Detail Subsections */}
        {paymentMethod === "card" && (
          <div className="p-5 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-4 animate-in fade-in">
            <h4 className="text-xs font-bold text-neutral-900 uppercase tracking-wider">
              Demo Card Selection
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <label
                className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer ${
                  selectedDemoCard === "4242"
                    ? "border-neutral-900 bg-white font-semibold shadow-xs"
                    : "border-neutral-200 bg-neutral-100/60"
                }`}
              >
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="cardSelection"
                    checked={selectedDemoCard === "4242"}
                    onChange={() => setSelectedDemoCard("4242")}
                    className="accent-neutral-900"
                  />
                  <span>Test Visa •••• 4242</span>
                </div>
                <span className="text-[10px] text-neutral-400">Exp 12/28</span>
              </label>

              <label
                className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer ${
                  selectedDemoCard === "5555"
                    ? "border-neutral-900 bg-white font-semibold shadow-xs"
                    : "border-neutral-200 bg-neutral-100/60"
                }`}
              >
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="cardSelection"
                    checked={selectedDemoCard === "5555"}
                    onChange={() => setSelectedDemoCard("5555")}
                    className="accent-neutral-900"
                  />
                  <span>Demo Mastercard •••• 5555</span>
                </div>
                <span className="text-[10px] text-neutral-400">Exp 08/29</span>
              </label>
            </div>
            <p className="text-[10px] text-neutral-500">
              Pre-filled sandbox credentials. Never enter real credit or debit cards.
            </p>
          </div>
        )}

        {paymentMethod === "upi" && (
          <div className="p-5 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-4 animate-in fade-in">
            <h4 className="text-xs font-bold text-neutral-900 uppercase tracking-wider">
              Demo UPI App
            </h4>
            <div className="grid grid-cols-3 gap-2 text-xs font-medium">
              {[
                { id: "gpay", label: "Google Pay" },
                { id: "phonepe", label: "PhonePe" },
                { id: "paytm", label: "Paytm UPI" },
              ].map((app) => (
                <button
                  key={app.id}
                  type="button"
                  onClick={() => setSelectedUpiApp(app.id)}
                  className={`py-2.5 px-3 rounded-xl border text-center transition-all ${
                    selectedUpiApp === app.id
                      ? "border-neutral-900 bg-white font-bold shadow-xs text-neutral-900"
                      : "border-neutral-200 bg-neutral-100/70 text-neutral-600"
                  }`}
                >
                  {app.label}
                </button>
              ))}
            </div>
            <div className="pt-1">
              <span className="text-xs text-neutral-600">Simulated VPA: </span>
              <code className="text-xs bg-neutral-200 px-2 py-0.5 rounded text-neutral-800">
                demo-user@okaxis
              </code>
            </div>
          </div>
        )}

        {paymentMethod === "cod" && (
          <div className="p-5 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-2 animate-in fade-in text-xs text-neutral-600">
            <p className="font-semibold text-neutral-900">
              Cash on Delivery Simulation
            </p>
            <p>
              Pay exactly {formatCurrency(order.total)} in cash or UPI QR at your doorstep upon parcel receipt.
            </p>
          </div>
        )}

        {/* Demo Scenario Tester Selector (Success / Failure / Cancel) */}
        <div className="p-5 rounded-2xl bg-neutral-900 text-white space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#F95721]">
              Gateway Simulator Trigger
            </span>
            <span className="text-[11px] text-neutral-400">
              Select outcome to simulate:
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              disabled={isProcessing}
              onClick={() => setScenario("success")}
              className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all ${
                scenario === "success"
                  ? "bg-emerald-500 text-white shadow-md scale-102"
                  : "bg-neutral-800 text-neutral-300 hover:bg-neutral-700"
              }`}
            >
              ✓ Success
            </button>
            <button
              type="button"
              disabled={isProcessing}
              onClick={() => setScenario("failure")}
              className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all ${
                scenario === "failure"
                  ? "bg-rose-500 text-white shadow-md scale-102"
                  : "bg-neutral-800 text-neutral-300 hover:bg-neutral-700"
              }`}
            >
              ✗ Failure
            </button>
            <button
              type="button"
              disabled={isProcessing}
              onClick={() => setScenario("cancel")}
              className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all ${
                scenario === "cancel"
                  ? "bg-amber-500 text-white shadow-md scale-102"
                  : "bg-neutral-800 text-neutral-300 hover:bg-neutral-700"
              }`}
            >
              ⊘ Cancel
            </button>
          </div>
        </div>

        {/* Error Notification */}
        {errorMessage && (
          <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-xs font-medium text-rose-700 animate-in fade-in">
            {errorMessage}
          </div>
        )}

        {/* Process Button */}
        <div className="space-y-3">
          <Button
            type="button"
            variant="primary"
            size="xl"
            disabled={isProcessing}
            onClick={handleProcessPayment}
            className="w-full text-base font-bold shadow-md"
          >
            {isProcessing ? (
              <span className="flex items-center gap-2">
                <Loader2 className="h-5 w-5 animate-spin" />
                Contacting Demo Banking Gateway...
              </span>
            ) : (
              `Authorize & Complete Payment (${formatCurrency(order.total)})`
            )}
          </Button>

          <p className="text-center text-[11px] text-neutral-400 flex items-center justify-center gap-1.5">
            <Lock className="h-3 w-3" />
            <span>256-bit simulated end-to-end encryption. No real banking network is involved.</span>
          </p>
        </div>
      </div>
    </div>
  );
}

