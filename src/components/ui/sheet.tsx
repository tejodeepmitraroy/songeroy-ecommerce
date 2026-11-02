"use client";

import * as React from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface SheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
  side?: "right" | "left";
  title?: string;
  description?: string;
}

export function Sheet({
  open,
  onOpenChange,
  children,
  side = "right",
  title,
  description,
}: SheetProps) {
  const [mounted, setMounted] = React.useState(open);
  const [visible, setVisible] = React.useState(open);

  React.useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    let rafId: number;

    if (open) {
      queueMicrotask(() => {
        setMounted(true);
      });
      rafId = requestAnimationFrame(() => {
        rafId = requestAnimationFrame(() => {
          setVisible(true);
        });
      });
    } else {
      queueMicrotask(() => {
        setVisible(false);
      });
      timer = setTimeout(() => {
        setMounted(false);
      }, 300);
    }

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(timer);
    };
  }, [open]);

  // Handle ESC key press
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        onOpenChange(false);
      }
    };
    if (open) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onOpenChange]);

  if (!mounted) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex overflow-hidden"
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop with fade animation */}
      <div
        className={cn(
          "fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity duration-300 ease-out",
          visible ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => onOpenChange(false)}
        aria-hidden="true"
      />

      {/* Sheet Content Panel with slide animation */}
      <div
        className={cn(
          "relative z-50 flex h-full w-full max-w-md flex-col bg-white shadow-2xl transition-transform duration-300 ease-out",
          side === "right" ? "ml-auto" : "mr-auto",
          side === "right"
            ? (visible ? "translate-x-0" : "translate-x-full")
            : (visible ? "translate-x-0" : "-translate-x-full")
        )}
        style={{ overscrollBehavior: "contain" }}
      >
        <div className="flex items-center justify-between border-b border-neutral-100 px-6 py-4 shrink-0">
          <div>
            {title && (
              <h2 className="text-base font-semibold text-neutral-900">{title}</h2>
            )}
            {description && (
              <p className="text-xs text-neutral-500 mt-0.5">{description}</p>
            )}
          </div>
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="rounded-full p-2 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-700 transition-colors cursor-pointer"
            aria-label="Close panel"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4 overscroll-contain">
          {children}
        </div>
      </div>
    </div>
  );
}

