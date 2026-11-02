"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
  isOpenDefault?: boolean;
  className?: string;
}

export function AccordionItem({
  title,
  children,
  isOpenDefault = false,
  className,
}: AccordionItemProps) {
  const [isOpen, setIsOpen] = React.useState(isOpenDefault);

  return (
    <div className={cn("border-b border-neutral-200 py-3", className)}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between py-2 text-left text-sm font-medium text-neutral-900 transition-all hover:text-neutral-600 select-none"
      >
        <span>{title}</span>
        <ChevronDown
          className={cn(
            "h-4 w-4 shrink-0 text-neutral-500 transition-transform duration-200",
            isOpen && "rotate-180 text-neutral-900"
          )}
        />
      </button>
      {isOpen && (
        <div className="pb-3 pt-1 text-sm text-neutral-600 leading-relaxed animate-in fade-in-50 duration-200">
          {children}
        </div>
      )}
    </div>
  );
}

export function Accordion({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn("w-full divide-y divide-neutral-200/80", className)}>{children}</div>;
}

