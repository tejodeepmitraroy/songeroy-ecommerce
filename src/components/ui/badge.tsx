import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-neutral-900 text-white",
        secondary:
          "border-transparent bg-neutral-100 text-neutral-800",
        outline:
          "border border-neutral-300 text-neutral-800",
        discount:
          "border-transparent bg-emerald-50 text-emerald-700 font-semibold",
        accent:
          "border-transparent bg-[#FFF0EB] text-[#F95721] font-semibold",
        warning:
          "border-transparent bg-amber-50 text-amber-700",
        destructive:
          "border-transparent bg-red-50 text-red-600",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };

