"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";
import { Sheet } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { formatCurrency } from "@/lib/currency";
import { FREE_SHIPPING_THRESHOLD } from "@/lib/pricing";

export function CartDrawer() {
  const router = useRouter();
  const {
    isDrawerOpen,
    setIsDrawerOpen,
    enrichedItems,
    pricing,
    updateQuantity,
    removeFromCart,
    getCartItemCount,
  } = useCart();

  const itemCount = getCartItemCount();
  const progressPercent = Math.min(
    100,
    Math.round((pricing.subtotal / FREE_SHIPPING_THRESHOLD) * 100)
  );

  const handleCheckout = () => {
    setIsDrawerOpen(false);
    router.push("/checkout");
  };

  const handleViewCart = () => {
    setIsDrawerOpen(false);
    router.push("/cart");
  };

  return (
    <Sheet
      open={isDrawerOpen}
      onOpenChange={setIsDrawerOpen}
      side="right"
      title={`Your Bag (${itemCount})`}
      description="Review items before proceeding to checkout"
    >
      <div className="flex flex-col h-full justify-between">
        {/* Free Shipping Meter */}
        <div className="bg-neutral-50 rounded-xl p-3 border border-neutral-100 mb-4">
          <div className="flex items-center justify-between text-xs mb-1.5">
            {pricing.amountNeededForFreeShipping > 0 ? (
              <span className="text-neutral-700">
                Add{" "}
                <strong className="text-neutral-900 font-semibold">
                  {formatCurrency(pricing.amountNeededForFreeShipping)}
                </strong>{" "}
                for Free Express Delivery
              </span>
            ) : (
              <span className="text-emerald-700 font-semibold flex items-center gap-1">
                🎉 You qualified for Free Express Delivery!
              </span>
            )}
            <span className="text-neutral-400 font-medium">
              {progressPercent}%
            </span>
          </div>
          <div className="h-1.5 w-full bg-neutral-200 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-300 ${
                progressPercent >= 100 ? "bg-emerald-500" : "bg-[#F95721]"
              }`}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Cart Items List */}
        {enrichedItems.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center py-12 px-4">
            <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-400 mb-4">
              <ShoppingBag className="h-8 w-8" />
            </div>
            <h3 className="text-base font-semibold text-neutral-900 mb-1">
              Your bag is currently empty
            </h3>
            <p className="text-xs text-neutral-500 max-w-xs mb-6">
              Looks like you haven&apos;t added any essentials to your shopping bag yet.
            </p>
            <Button
              variant="default"
              onClick={() => {
                setIsDrawerOpen(false);
                router.push("/shop");
              }}
              className="gap-2"
            >
              Start Shopping <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto divide-y divide-neutral-100 pr-1 -mr-1">
            {enrichedItems.map((item) => (
              <div
                key={`${item.productId}-${item.selectedColor || "c"}-${
                  item.selectedSize || "s"
                }`}
                className="py-4 flex gap-4 items-start"
              >
                {/* Product Thumbnail */}
                <div className="relative w-20 h-24 rounded-lg overflow-hidden bg-neutral-100 shrink-0 border border-neutral-100">
                  <Image
                    src={item.product.images[0]}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </div>

                {/* Info & Quantity */}
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start gap-2">
                    <Link
                      href={`/products/${item.product.slug}`}
                      onClick={() => setIsDrawerOpen(false)}
                      className="text-sm font-semibold text-neutral-900 hover:underline line-clamp-1"
                    >
                      {item.product.name}
                    </Link>
                    <button
                      type="button"
                      onClick={() =>
                        removeFromCart(
                          item.productId,
                          item.selectedColor,
                          item.selectedSize
                        )
                      }
                      className="text-neutral-400 hover:text-rose-600 transition-colors p-1"
                      aria-label="Remove item"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  {/* Variant labels */}
                  {(item.selectedColor || item.selectedSize) && (
                    <div className="text-xs text-neutral-500 mt-0.5 space-x-2">
                      {item.selectedColor && (
                        <span>Color: {item.selectedColor}</span>
                      )}
                      {item.selectedSize && (
                        <span>Size: {item.selectedSize}</span>
                      )}
                    </div>
                  )}

                  <div className="text-xs font-semibold text-neutral-900 mt-1">
                    {formatCurrency(item.product.price)}
                  </div>

                  {/* Stepper */}
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center border border-neutral-200 rounded-md bg-white">
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(
                            item.productId,
                            item.quantity - 1,
                            item.selectedColor,
                            item.selectedSize
                          )
                        }
                        className="px-2 py-1 text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50 rounded-l-md"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="px-2 text-xs font-semibold text-neutral-900 min-w-6 text-center">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(
                            item.productId,
                            item.quantity + 1,
                            item.selectedColor,
                            item.selectedSize
                          )
                        }
                        disabled={item.quantity >= item.product.stock}
                        className="px-2 py-1 text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50 rounded-r-md disabled:opacity-40"
                        aria-label="Increase quantity"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>

                    <span className="text-xs font-bold text-neutral-900">
                      {formatCurrency(item.lineTotal)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer Actions & Summary */}
        {enrichedItems.length > 0 && (
          <div className="border-t border-neutral-200 pt-4 mt-4 space-y-3">
            <div className="space-y-1.5 text-xs text-neutral-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-neutral-900">
                  {formatCurrency(pricing.subtotal)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Shipping</span>
                <span className="font-semibold text-neutral-900">
                  {pricing.shipping === 0 ? (
                    <span className="text-emerald-600 uppercase font-bold text-[11px]">
                      FREE
                    </span>
                  ) : (
                    formatCurrency(pricing.shipping)
                  )}
                </span>
              </div>
            </div>

            <div className="flex justify-between items-baseline pt-2 border-t border-neutral-100">
              <span className="text-sm font-bold text-neutral-900">Total</span>
              <div className="text-right">
                <span className="text-base font-extrabold text-neutral-950">
                  {formatCurrency(pricing.total)}
                </span>
                <p className="text-[10px] text-neutral-400">
                  Includes demo GST taxes
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <Button
                variant="outline"
                size="default"
                onClick={handleViewCart}
                className="w-full text-xs font-semibold"
              >
                View Full Bag
              </Button>
              <Button
                variant="primary"
                size="default"
                onClick={handleCheckout}
                className="w-full text-xs font-semibold gap-1.5"
              >
                Checkout <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </Sheet>
  );
}

