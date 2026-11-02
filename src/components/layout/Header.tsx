"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  ShoppingBag,
  Menu,
  User,
  Heart,
  X,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { STORE_SETTINGS } from "@/data/store";

interface HeaderProps {
  onOpenMobileMenu?: () => void;
}

export function Header({ onOpenMobileMenu }: HeaderProps) {
  const router = useRouter();
  const { getCartItemCount, setIsDrawerOpen, isHydrated } = useCart();
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const searchInputRef = React.useRef<HTMLInputElement>(null);

  const itemCount = isHydrated ? getCartItemCount() : 0;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  React.useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-neutral-200/80 bg-white/90 backdrop-blur-md transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-18 items-center justify-between gap-4">
          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden">
            <button
              type="button"
              onClick={onOpenMobileMenu}
              className="rounded-lg p-2 text-neutral-700 hover:bg-neutral-100 transition-colors"
              aria-label="Open navigation menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>

          {/* Brand Logo - Inspired by Reference 1 KICKZ */}
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-lg bg-[#F95721] flex items-center justify-center text-white font-black text-lg tracking-tighter shadow-sm group-hover:scale-105 transition-transform">
                K
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold tracking-tight text-xl text-neutral-900 group-hover:text-neutral-700 transition-colors">
                  KICKZ
                </span>
                <span className="text-[9px] tracking-widest text-neutral-400 font-semibold uppercase -mt-1">
                  STUDIO
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-7">
              {STORE_SETTINGS.navigation.slice(0, 6).map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm font-medium text-neutral-600 hover:text-neutral-950 transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-neutral-950 hover:after:w-full after:transition-all"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Search Bar (Desktop inline or expandable) */}
          <div className="hidden md:flex flex-1 max-w-xs mx-4">
            <form onSubmit={handleSearchSubmit} className="relative w-full">
              <input
                type="text"
                placeholder="Search apparel, shoes, essentials..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-10 pl-9 pr-4 rounded-full bg-neutral-100 border border-transparent text-xs text-neutral-900 placeholder:text-neutral-400 focus:bg-white focus:border-neutral-300 focus:outline-none focus:ring-1 focus:ring-neutral-400 transition-all"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-neutral-400" />
            </form>
          </div>

          {/* Action Icons */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Mobile Search Toggle */}
            <button
              type="button"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="md:hidden rounded-full p-2.5 text-neutral-700 hover:bg-neutral-100 transition-colors"
              aria-label="Search products"
            >
              <Search className="h-5 w-5" />
            </button>

            {/* Wishlist Link */}
            <Link
              href="/shop"
              className="hidden sm:flex rounded-full p-2.5 text-neutral-700 hover:bg-neutral-100 transition-colors relative"
              aria-label="Wishlist"
              title="Shop Catalog"
            >
              <Heart className="h-5 w-5" />
            </Link>

            {/* User Account / Demo Login Link */}
            <Link
              href="/login"
              className="rounded-full p-2.5 text-neutral-700 hover:bg-neutral-100 transition-colors"
              aria-label="Customer Account"
              title="Customer Login"
            >
              <User className="h-5 w-5" />
            </Link>

            {/* Shopping Cart Button */}
            <button
              type="button"
              onClick={() => setIsDrawerOpen(true)}
              className="relative flex items-center gap-2 rounded-full bg-neutral-900 hover:bg-neutral-800 text-white px-3.5 py-2 text-xs font-semibold shadow-sm transition-all active:scale-95"
              aria-label={`Shopping Cart with ${itemCount} items`}
            >
              <ShoppingBag className="h-4 w-4" />
              <span className="hidden sm:inline">Cart</span>
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#F95721] text-white px-1 text-[11px] font-bold">
                {itemCount}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Search Input Dropdown */}
        {isSearchOpen && (
          <div className="md:hidden py-3 border-t border-neutral-100 animate-in fade-in-50">
            <form onSubmit={handleSearchSubmit} className="relative flex items-center">
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search products, brands, categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-11 pl-10 pr-10 rounded-xl bg-neutral-100 border border-neutral-200 text-sm text-neutral-900 focus:bg-white focus:outline-none"
              />
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </form>
          </div>
        )}
      </div>
    </header>
  );
}

