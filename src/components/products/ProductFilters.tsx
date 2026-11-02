"use client";

import React from "react";
import { RotateCcw } from "lucide-react";
import { CATEGORIES } from "@/data/categories";
import { formatCurrency } from "@/lib/currency";

export interface FilterState {
  category: string;
  minPrice: number;
  maxPrice: number;
  inStockOnly: boolean;
  search: string;
}

interface ProductFiltersProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  onReset: () => void;
  maxPossiblePrice?: number;
}

export function ProductFilters({
  filters,
  onChange,
  onReset,
  maxPossiblePrice = 15000,
}: ProductFiltersProps) {
  const handleCategorySelect = (slug: string) => {
    onChange({
      ...filters,
      category: filters.category === slug ? "" : slug,
    });
  };

  const handlePriceChange = (
    field: "minPrice" | "maxPrice",
    value: number
  ) => {
    onChange({
      ...filters,
      [field]: Math.max(0, value),
    });
  };

  const handleInStockToggle = () => {
    onChange({
      ...filters,
      inStockOnly: !filters.inStockOnly,
    });
  };

  const hasActiveFilters =
    filters.category !== "" ||
    filters.minPrice > 0 ||
    filters.maxPrice < maxPossiblePrice ||
    filters.inStockOnly ||
    filters.search !== "";

  return (
    <div className="space-y-6">
      {/* Header with Clear button */}
      <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
        <h3 className="text-sm font-bold text-neutral-900 uppercase tracking-wider">
          Filter Products
        </h3>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={onReset}
            className="flex items-center gap-1 text-xs font-semibold text-[#F95721] hover:underline"
          >
            <RotateCcw className="h-3 w-3" />
            <span>Reset</span>
          </button>
        )}
      </div>

      {/* Categories */}
      <div className="space-y-2.5">
        <h4 className="text-xs font-bold text-neutral-800 uppercase tracking-wider">
          Category
        </h4>
        <div className="space-y-1">
          <button
            type="button"
            onClick={() => handleCategorySelect("")}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors text-left ${
              filters.category === ""
                ? "bg-neutral-900 text-white font-semibold"
                : "text-neutral-700 hover:bg-neutral-100"
            }`}
          >
            <span>All Categories</span>
          </button>
          {CATEGORIES.map((cat) => {
            const isSelected = filters.category === cat.slug;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleCategorySelect(cat.slug)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors text-left ${
                  isSelected
                    ? "bg-neutral-900 text-white font-semibold"
                    : "text-neutral-700 hover:bg-neutral-100"
                }`}
              >
                <span>{cat.name}</span>
                <span
                  className={`text-[10px] ${
                    isSelected ? "text-neutral-300" : "text-neutral-400"
                  }`}
                >
                  {cat.itemCount}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Price Range */}
      <div className="space-y-3 pt-3 border-t border-neutral-200">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold text-neutral-800 uppercase tracking-wider">
            Price Range (INR)
          </h4>
          <span className="text-xs font-semibold text-neutral-900">
            Up to {formatCurrency(filters.maxPrice)}
          </span>
        </div>

        <input
          type="range"
          min={500}
          max={maxPossiblePrice}
          step={200}
          value={filters.maxPrice}
          onChange={(e) => handlePriceChange("maxPrice", Number(e.target.value))}
          className="w-full accent-neutral-900 cursor-pointer"
        />

        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="space-y-1">
            <span className="text-[10px] text-neutral-500 font-medium">Min Price</span>
            <input
              type="number"
              min={0}
              max={filters.maxPrice}
              value={filters.minPrice}
              onChange={(e) => handlePriceChange("minPrice", Number(e.target.value))}
              className="w-full h-8 px-2.5 rounded-lg border border-neutral-200 text-xs text-neutral-800 focus:outline-none focus:border-neutral-800"
            />
          </div>
          <div className="space-y-1">
            <span className="text-[10px] text-neutral-500 font-medium">Max Price</span>
            <input
              type="number"
              min={filters.minPrice}
              max={maxPossiblePrice}
              value={filters.maxPrice}
              onChange={(e) => handlePriceChange("maxPrice", Number(e.target.value))}
              className="w-full h-8 px-2.5 rounded-lg border border-neutral-200 text-xs text-neutral-800 focus:outline-none focus:border-neutral-800"
            />
          </div>
        </div>
      </div>

      {/* Stock Availability */}
      <div className="space-y-2 pt-3 border-t border-neutral-200">
        <h4 className="text-xs font-bold text-neutral-800 uppercase tracking-wider mb-2">
          Availability
        </h4>
        <label className="flex items-center gap-2.5 cursor-pointer text-xs font-medium text-neutral-800 select-none">
          <input
            type="checkbox"
            checked={filters.inStockOnly}
            onChange={handleInStockToggle}
            className="w-4 h-4 rounded text-neutral-900 accent-neutral-900 cursor-pointer"
          />
          <span>In Stock Only</span>
        </label>
      </div>
    </div>
  );
}

