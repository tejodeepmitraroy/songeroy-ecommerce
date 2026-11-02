import { Suspense } from "react";
import type { Metadata } from "next";
import { PaymentClient } from "./PaymentClient";
import { Skeleton } from "@/components/ui/skeleton";

export const metadata: Metadata = {
  title: "Simulated Payment Gateway",
  description: "Demo payment processing environment.",
};

export default function PaymentPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-2xl mx-auto px-4 py-16 space-y-6">
          <Skeleton className="h-20 w-full rounded-2xl" />
          <Skeleton className="h-64 w-full rounded-3xl" />
        </div>
      }
    >
      <PaymentClient />
    </Suspense>
  );
}

