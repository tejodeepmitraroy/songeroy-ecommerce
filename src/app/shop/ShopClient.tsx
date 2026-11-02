"use client";

import React, { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { SlidersHorizontal, PackageX, Search, RotateCcw } from "lucide-react";
import { PRODUCTS } from "@/data/products";
import { ProductGrid } from "@/components/products/ProductGrid";
import {
  ProductFilters,
  FilterState,
} from "@/components/products/ProductFilters";
import { SortDropdown, SortOption } from "@/components/products/SortDropdown";
import { Breadcrumbs } from "@/components/products/Breadcrumbs";
import { Sheet } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

export function ShopClient() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "";
  const initialSearch = searchParams.get("search") || "";

  const [filters, setFilters] = useState<FilterState>({
    category: initialCategory,
    minPrice: 0,
    maxPrice: 15000,
    inStockOnly: false,
    search: initialSearch,
  });

  const [sort, setSort] = useState<SortOption>("featured");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(12);

  const resetFilters = () => {
    setFilters({
      category: "",
      minPrice: 0,
      maxPrice: 15000,
      inStockOnly: false,
      search: "",
    });
    setVisibleCount(12);
  };

  // Filter products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category filter
      if (filters.category && product.category !== filters.category) {
        return false;
      }

      // Search query
      if (filters.search) {
        const query = filters.search.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesDesc = product.description.toLowerCase().includes(query);
        const matchesCategory = product.category.toLowerCase().includes(query);
        if (!matchesName && !matchesDesc && !matchesCategory) {
          return false;
        }
      }

      // Price filter
      if (product.price < filters.minPrice || product.price > filters.maxPrice) {
        return false;
      }

      // In stock filter
      if (filters.inStockOnly && product.stock <= 0) {
        return false;
      }

      return true;
    });
  }, [filters]);

  // Sort products
  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];
    switch (sort) {
      case "price-asc":
        return list.sort((a, b) => a.price - b.price);
      case "price-desc":
        return list.sort((a, b) => b.price - a.price);
      case "newest":
        return list.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      case "rating":
        return list.sort((a, b) => b.rating - a.rating);
      case "featured":
      default:
        return list.sort((a, b) => {
          if (a.featured === b.featured) return b.reviewCount - a.reviewCount;
          return a.featured ? -1 : 1;
        });
    }
  }, [filteredProducts, sort]);

  const displayedProducts = sortedProducts.slice(0, visibleCount);
  const hasMore = visibleCount < sortedProducts.length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ label: "Shop All Products" }]} />

      {/* Page Title & Search Bar Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-4 mb-6 border-b border-neutral-200">
        <div>
          <h1 className="text-3xl font-extrabold text-neutral-900 tracking-tight">
            Curated Catalog
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 mt-1">
            Showing {filteredProducts.length} of {PRODUCTS.length} minimalist essentials
          </p>
        </div>

        {/* Search input in shop */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-72">
            <input
              type="text"
              placeholder="Search by keyword, item..."
              value={filters.search}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, search: e.target.value }))
              }
              className="w-full h-10 pl-9 pr-4 rounded-xl border border-neutral-200 bg-white text-xs text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-900"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-neutral-400" />
          </div>

          {/* Mobile Filter Button */}
          <Button
            variant="outline"
            size="default"
            onClick={() => setMobileFiltersOpen(true)}
            className="lg:hidden gap-2 text-xs font-semibold shrink-0"
          >
            <SlidersHorizontal className="h-3.5 w-3.5" />
            <span>Filters</span>
          </Button>

          {/* Sort Dropdown */}
          <SortDropdown value={sort} onChange={setSort} />
        </div>
      </div>

      {/* Main Grid & Sidebar Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        {/* Desktop Sidebar Filters */}
        <div className="hidden lg:block lg:col-span-1 rounded-2xl bg-white p-5 border border-neutral-200/80 shadow-xs sticky top-24">
          <ProductFilters
            filters={filters}
            onChange={setFilters}
            onReset={resetFilters}
            maxPossiblePrice={15000}
          />
        </div>

        {/* Mobile Filter Sheet */}
        <Sheet
          open={mobileFiltersOpen}
          onOpenChange={setMobileFiltersOpen}
          side="left"
          title="Filter Products"
          description="Narrow down items by category, price & availability"
        >
          <div className="py-2">
            <ProductFilters
              filters={filters}
              onChange={setFilters}
              onReset={resetFilters}
              maxPossiblePrice={15000}
            />
            <div className="pt-6">
              <Button
                variant="primary"
                onClick={() => setMobileFiltersOpen(false)}
                className="w-full"
              >
                Show {filteredProducts.length} Results
              </Button>
            </div>
          </div>
        </Sheet>

        {/* Products Grid Content */}
        <div className="lg:col-span-3">
          {filteredProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-2xl border border-dashed border-neutral-200 p-8">
              <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-400 mb-4">
                <PackageX className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-bold text-neutral-900 mb-1">
                No matching products found
              </h3>
              <p className="text-xs sm:text-sm text-neutral-500 max-w-sm mb-6">
                We couldn&apos;t find any items matching your selected criteria. Try adjusting your filters or resetting your search.
              </p>
              <Button
                variant="primary"
                onClick={resetFilters}
                className="gap-2"
              >
                <RotateCcw className="h-4 w-4" /> Reset Filters
              </Button>
            </div>
          ) : (
            <div className="space-y-8">
              <ProductGrid products={displayedProducts} columns={3} />

              {/* Load More Button */}
              {hasMore && (
                <div className="text-center pt-6">
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => setVisibleCount((prev) => prev + 6)}
                    className="font-semibold text-xs border-neutral-300"
                  >
                    Load More Items ({sortedProducts.length - visibleCount} remaining)
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

