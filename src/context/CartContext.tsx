"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { CartItem, EnrichedCartItem, CartPricingSummary } from "@/types/cart";
import { getProductById } from "@/data/products";
import { calculateCartPricing } from "@/lib/pricing";
import { getFromStorage, setToStorage } from "@/lib/storage";

const CART_STORAGE_KEY = "kickz_cart_items_v1";
const COUPON_STORAGE_KEY = "kickz_cart_coupon_v1";

interface CartToast {
  id: string;
  message: string;
  type: "success" | "error" | "info";
}

interface CartContextType {
  items: CartItem[];
  enrichedItems: EnrichedCartItem[];
  pricing: CartPricingSummary;
  couponCode: string;
  isHydrated: boolean;
  isDrawerOpen: boolean;
  toasts: CartToast[];
  setIsDrawerOpen: (open: boolean) => void;
  addToCart: (item: {
    productId: string;
    quantity?: number;
    selectedColor?: string;
    selectedSize?: string;
  }) => { success: boolean; message: string };
  removeFromCart: (
    productId: string,
    selectedColor?: string,
    selectedSize?: string
  ) => void;
  updateQuantity: (
    productId: string,
    quantity: number,
    selectedColor?: string,
    selectedSize?: string
  ) => void;
  clearCart: () => void;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  getCartSubtotal: () => number;
  getCartItemCount: () => number;
  dismissToast: (id: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [couponCode, setCouponCode] = useState<string>("");
  const [isHydrated, setIsHydrated] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [toasts, setToasts] = useState<CartToast[]>([]);

  // Hydrate cart from localStorage on mount
  useEffect(() => {
    queueMicrotask(() => {
      const savedCart = getFromStorage<CartItem[]>(CART_STORAGE_KEY, []);
      const savedCoupon = getFromStorage<string>(COUPON_STORAGE_KEY, "");
      setItems(savedCart);
      setCouponCode(savedCoupon);
      setIsHydrated(true);
    });
  }, []);

  // Save cart to localStorage whenever items change
  useEffect(() => {
    if (isHydrated) {
      setToStorage(CART_STORAGE_KEY, items);
    }
  }, [items, isHydrated]);

  // Save coupon code to localStorage
  useEffect(() => {
    if (isHydrated) {
      setToStorage(COUPON_STORAGE_KEY, couponCode);
    }
  }, [couponCode, isHydrated]);

  const addToast = useCallback(
    (message: string, type: "success" | "error" | "info" = "success") => {
      const id = `${Date.now()}-${Math.random()}`;
      setToasts((prev) => [...prev, { id, message, type }]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 3500);
    },
    []
  );

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Enrich cart items with authoritative product data
  const enrichedItems = useMemo<EnrichedCartItem[]>(() => {
    const enriched: EnrichedCartItem[] = [];
    for (const item of items) {
      const product = getProductById(item.productId);
      if (product) {
        enriched.push({
          ...item,
          product,
          lineTotal: product.price * item.quantity,
        });
      }
    }
    return enriched;
  }, [items]);

  const subtotal = useMemo(() => {
    return enrichedItems.reduce((acc, item) => acc + item.lineTotal, 0);
  }, [enrichedItems]);

  const pricing = useMemo(() => {
    return calculateCartPricing(subtotal, couponCode);
  }, [subtotal, couponCode]);

  const getCartSubtotal = useCallback(() => subtotal, [subtotal]);

  const getCartItemCount = useCallback(() => {
    return items.reduce((acc, item) => acc + item.quantity, 0);
  }, [items]);

  const addToCart = useCallback(
    (params: {
      productId: string;
      quantity?: number;
      selectedColor?: string;
      selectedSize?: string;
    }) => {
      const qtyToAdd = params.quantity && params.quantity > 0 ? params.quantity : 1;
      const product = getProductById(params.productId);

      if (!product) {
        addToast("Product not found.", "error");
        return { success: false, message: "Product not found" };
      }

      if (product.stock <= 0) {
        addToast("Sorry, this item is currently out of stock.", "error");
        return { success: false, message: "Out of stock" };
      }

      let finalQty = qtyToAdd;

      setItems((prevItems) => {
        const existingIndex = prevItems.findIndex(
          (i) =>
            i.productId === params.productId &&
            i.selectedColor === params.selectedColor &&
            i.selectedSize === params.selectedSize
        );

        if (existingIndex >= 0) {
          const newQty = prevItems[existingIndex].quantity + qtyToAdd;
          if (newQty > product.stock) {
            finalQty = product.stock;
            addToast(
              `Maximum stock available (${product.stock}) reached for this item.`,
              "info"
            );
          } else {
            finalQty = newQty;
          }

          const copy = [...prevItems];
          copy[existingIndex] = {
            ...copy[existingIndex],
            quantity: finalQty,
          };
          return copy;
        } else {
          const qty = Math.min(qtyToAdd, product.stock);
          return [
            ...prevItems,
            {
              productId: params.productId,
              quantity: qty,
              selectedColor: params.selectedColor,
              selectedSize: params.selectedSize,
            },
          ];
        }
      });

      addToast(`Added "${product.name}" to your cart.`, "success");
      return { success: true, message: "Added to cart" };
    },
    [addToast]
  );

  const removeFromCart = useCallback(
    (productId: string, selectedColor?: string, selectedSize?: string) => {
      setItems((prevItems) => {
        const itemToRemove = prevItems.find(
          (i) =>
            i.productId === productId &&
            i.selectedColor === selectedColor &&
            i.selectedSize === selectedSize
        );
        if (itemToRemove) {
          const prod = getProductById(productId);
          addToast(`Removed "${prod?.name || "Item"}" from cart.`, "info");
        }
        return prevItems.filter(
          (i) =>
            !(
              i.productId === productId &&
              i.selectedColor === selectedColor &&
              i.selectedSize === selectedSize
            )
        );
      });
    },
    [addToast]
  );

  const updateQuantity = useCallback(
    (
      productId: string,
      quantity: number,
      selectedColor?: string,
      selectedSize?: string
    ) => {
      if (quantity <= 0) {
        removeFromCart(productId, selectedColor, selectedSize);
        return;
      }

      const product = getProductById(productId);
      if (!product) return;

      const safeQuantity = Math.min(Math.max(1, quantity), product.stock);

      setItems((prevItems) =>
        prevItems.map((item) => {
          if (
            item.productId === productId &&
            item.selectedColor === selectedColor &&
            item.selectedSize === selectedSize
          ) {
            return { ...item, quantity: safeQuantity };
          }
          return item;
        })
      );
    },
    [removeFromCart]
  );

  const clearCart = useCallback(() => {
    setItems([]);
    setCouponCode("");
  }, []);

  const applyCoupon = useCallback(
    (code: string) => {
      const trimmed = code.trim().toUpperCase();
      const testPricing = calculateCartPricing(subtotal, trimmed);
      if (testPricing.discount > 0) {
        setCouponCode(trimmed);
        addToast(`Coupon "${trimmed}" applied successfully!`, "success");
        return { success: true, message: "Coupon applied" };
      } else {
        addToast("Invalid or expired coupon code. Try WELCOME10 or KICKZ20.", "error");
        return { success: false, message: "Invalid coupon" };
      }
    },
    [subtotal, addToast]
  );

  const removeCoupon = useCallback(() => {
    setCouponCode("");
    addToast("Coupon removed.", "info");
  }, [addToast]);

  return (
    <CartContext.Provider
      value={{
        items,
        enrichedItems,
        pricing,
        couponCode,
        isHydrated,
        isDrawerOpen,
        toasts,
        setIsDrawerOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        applyCoupon,
        removeCoupon,
        getCartSubtotal,
        getCartItemCount,
        dismissToast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

