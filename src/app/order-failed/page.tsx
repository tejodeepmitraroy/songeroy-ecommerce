import { Suspense } from "react";
import type { Metadata } from "next";
import { OrderFailedClient } from "./OrderFailedClient";
import { Skeleton } from "@/components/ui/skeleton";

export const metadata: Metadata = {
  title: "Payment Declined",
  description: "Payment transaction could not be authorized.",
};

export default function OrderFailedPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
          <Skeleton className="w-16 h-16 rounded-full mx-auto" />
          <Skeleton className="h-8 w-64 mx-auto" />
          <Skeleton className="h-24 w-full rounded-2xl" />
        </div>
      }
    >
      <OrderFailedClient />
    </Suspense>
  );
}

