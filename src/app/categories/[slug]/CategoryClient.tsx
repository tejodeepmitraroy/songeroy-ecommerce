"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { SlidersHorizontal, PackageX, RotateCcw } from "lucide-react";
import { Category } from "@/types/product";
import { getProductsByCategory } from "@/data/products";
import { ProductGrid } from "@/components/products/ProductGrid";
import {
  ProductFilters,
  FilterState,
} from "@/components/products/ProductFilters";
import { SortDropdown, SortOption } from "@/components/products/SortDropdown";
import { Breadcrumbs } from "@/components/products/Breadcrumbs";
import { Sheet } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

interface CategoryClientProps {
  category: Category;
}

export function CategoryClient({ category }: CategoryClientProps) {
  const categoryProducts = useMemo(
    () => getProductsByCategory(category.slug),
    [category.slug]
  );

  const [filters, setFilters] = useState<FilterState>({
    category: category.slug,
    minPrice: 0,
    maxPrice: 15000,
    inStockOnly: false,
    search: "",
  });

  const [sort, setSort] = useState<SortOption>("featured");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const resetFilters = () => {
    setFilters({
      category: category.slug,
      minPrice: 0,
      maxPrice: 15000,
      inStockOnly: false,
      search: "",
    });
  };

  const filteredProducts = useMemo(() => {
    return categoryProducts.filter((product) => {
      if (product.price < filters.minPrice || product.price > filters.maxPrice) {
        return false;
      }
      if (filters.inStockOnly && product.stock <= 0) {
        return false;
      }
      if (filters.search) {
        const q = filters.search.toLowerCase();
        return (
          product.name.toLowerCase().includes(q) ||
          product.description.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [categoryProducts, filters]);

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
        return list.sort((a, b) => (b.featured ? 1 : -1));
    }
  }, [filteredProducts, sort]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: "Shop", href: "/shop" },
          { label: category.name },
        ]}
      />

      {/* Category Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-neutral-900 text-white my-6 shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-12 items-center">
          <div className="md:col-span-8 p-8 sm:p-12 space-y-3 z-10">
            <span className="text-xs font-bold uppercase tracking-widest text-[#F95721]">
              Department Line
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              {category.name}
            </h1>
            <p className="text-sm text-neutral-300 max-w-xl leading-relaxed">
              {category.description}
            </p>
            <p className="text-xs text-neutral-400 font-semibold pt-2">
              {categoryProducts.length} curated items available
            </p>
          </div>
          <div className="md:col-span-4 relative h-48 md:h-full min-h-[220px]">
            <Image
              src={category.image}
              alt={category.name}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover opacity-70"
            />
          </div>
        </div>
      </div>

      {/* Bar with Filters & Sorting */}
      <div className="flex items-center justify-between pb-6 border-b border-neutral-200">
        <p className="text-xs sm:text-sm text-neutral-600 font-medium">
          Showing {sortedProducts.length} items in {category.name}
        </p>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="default"
            onClick={() => setMobileFiltersOpen(true)}
            className="lg:hidden gap-2 text-xs font-semibold"
          >
            <SlidersHorizontal className="h-3.5 w-3.5" />
            <span>Filters</span>
          </Button>

          <SortDropdown value={sort} onChange={setSort} />
        </div>
      </div>

      {/* Grid with Optional Desktop Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start pt-6">
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
          title={`Filter ${category.name}`}
          description="Narrow down items by price & stock"
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
                Show Results
              </Button>
            </div>
          </div>
        </Sheet>

        <div className="lg:col-span-3">
          {sortedProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-2xl border border-dashed border-neutral-200 p-8">
              <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-400 mb-4">
                <PackageX className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-bold text-neutral-900 mb-1">
                No matching products
              </h3>
              <p className="text-xs text-neutral-500 mb-4">
                Try widening your price range or clearing availability filters.
              </p>
              <Button variant="primary" onClick={resetFilters} className="gap-2">
                <RotateCcw className="h-4 w-4" /> Reset Filters
              </Button>
            </div>
          ) : (
            <ProductGrid products={sortedProducts} columns={3} />
          )}
        </div>
      </div>
    </div>
  );
}

