"use client";

import * as React from "react";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/utils";

export function ToastContainer() {
  const { toasts, dismissToast } = useCart();

  if (toasts.length === 0) return null;

  return (
    <div
      className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none"
      role="region"
      aria-live="polite"
      aria-label="Notifications"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={cn(
            "pointer-events-auto flex items-start gap-3 rounded-xl p-4 shadow-xl border text-sm backdrop-blur-md transition-all duration-300 animate-in slide-in-from-bottom-5",
            toast.type === "success" &&
              "bg-white/95 border-emerald-200 text-neutral-900 shadow-emerald-500/5",
            toast.type === "error" &&
              "bg-white/95 border-rose-200 text-neutral-900 shadow-rose-500/5",
            toast.type === "info" &&
              "bg-white/95 border-neutral-200 text-neutral-900 shadow-neutral-500/5"
          )}
        >
          {toast.type === "success" && (
            <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600 mt-0.5" />
          )}
          {toast.type === "error" && (
            <AlertCircle className="h-5 w-5 shrink-0 text-rose-600 mt-0.5" />
          )}
          {toast.type === "info" && (
            <Info className="h-5 w-5 shrink-0 text-neutral-600 mt-0.5" />
          )}

          <div className="flex-1 text-sm font-medium leading-snug">
            {toast.message}
          </div>

          <button
            type="button"
            onClick={() => dismissToast(toast.id)}
            className="text-neutral-400 hover:text-neutral-700 transition-colors -mr-1 -mt-1 p-1 rounded-md"
            aria-label="Dismiss notification"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ))}
    </div>
  );
}

