import { Suspense } from "react";
import type { Metadata } from "next";
import { SearchClient } from "./SearchClient";
import { Skeleton } from "@/components/ui/skeleton";

export const metadata: Metadata = {
  title: "Search Catalog",
  description: "Search across minimalist clothing, shoes, audio gear, and home essentials.",
};

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 py-12 space-y-6">
          <Skeleton className="h-10 w-48" />
          <Skeleton className="h-12 w-full max-w-xl" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="aspect-[4/5] rounded-2xl" />
            ))}
          </div>
        </div>
      }
    >
      <SearchClient />
    </Suspense>
  );
}

