"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { Search as SearchIcon, PackageX, Sparkles } from "lucide-react";
import { PRODUCTS, getFeaturedProducts } from "@/data/products";
import { ProductGrid } from "@/components/products/ProductGrid";
import { SortDropdown, SortOption } from "@/components/products/SortDropdown";
import { Breadcrumbs } from "@/components/products/Breadcrumbs";
import { Button } from "@/components/ui/button";

export function SearchClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const queryParam = searchParams.get("q") || "";

  const [searchTerm, setSearchTerm] = useState(queryParam);
  const [sort, setSort] = useState<SortOption>("featured");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  const matchingProducts = useMemo(() => {
    if (!queryParam.trim()) return [];
    const q = queryParam.toLowerCase().trim();

    return PRODUCTS.filter((p) => {
      const matchName = p.name.toLowerCase().includes(q);
      const matchDesc = p.description.toLowerCase().includes(q);
      const matchCategory = p.category.toLowerCase().includes(q);
      return matchName || matchDesc || matchCategory;
    });
  }, [queryParam]);

  const sortedResults = useMemo(() => {
    const list = [...matchingProducts];
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
        return list;
    }
  }, [matchingProducts, sort]);

  const popularSuggestions = ["Air Rise", "Tee", "Keyboard", "Linen", "Horween", "Titanium"];
  const featuredFallback = getFeaturedProducts().slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      <Breadcrumbs items={[{ label: "Search" }]} />

      {/* Search Header Banner */}
      <div className="py-6 border-b border-neutral-200">
        <h1 className="text-3xl font-extrabold text-neutral-900 tracking-tight mb-4">
          Search Store
        </h1>

        <form onSubmit={handleSearchSubmit} className="max-w-xl flex gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search apparel, footwear, accessories..."
              className="w-full h-12 pl-11 pr-4 rounded-xl border border-neutral-300 bg-white text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-900 shadow-xs"
            />
            <SearchIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
          </div>
          <Button type="submit" variant="primary" size="lg" className="px-6 font-semibold">
            Search
          </Button>
        </form>

        {/* Popular Tags */}
        <div className="flex items-center gap-2 mt-4 text-xs text-neutral-500 flex-wrap">
          <span className="font-semibold text-neutral-700">Popular searches:</span>
          {popularSuggestions.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => {
                setSearchTerm(tag);
                router.push(`/search?q=${encodeURIComponent(tag)}`);
              }}
              className="px-2.5 py-1 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-700 transition-colors"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Results Controls */}
      {queryParam && (
        <div className="flex items-center justify-between py-6">
          <p className="text-sm text-neutral-700 font-medium">
            Found <strong>{matchingProducts.length}</strong> {matchingProducts.length === 1 ? "result" : "results"} for{" "}
            <span className="italic text-neutral-950">&quot;{queryParam}&quot;</span>
          </p>

          {matchingProducts.length > 0 && (
            <SortDropdown value={sort} onChange={setSort} />
          )}
        </div>
      )}

      {/* Results Content */}
      {matchingProducts.length > 0 ? (
        <ProductGrid products={sortedResults} columns={4} />
      ) : queryParam ? (
        <div className="py-16 text-center space-y-4 max-w-md mx-auto">
          <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-400 mx-auto">
            <PackageX className="h-8 w-8" />
          </div>
          <h2 className="text-xl font-bold text-neutral-900">
            No matches found for &quot;{queryParam}&quot;
          </h2>
          <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed">
            Check the spelling of your keywords, try broader terms, or browse our curated collections.
          </p>
          <div className="pt-2">
            <Button asChild variant="outline">
              <Link href="/shop">Browse All Products</Link>
            </Button>
          </div>

          {/* Recommended products */}
          <div className="pt-12 text-left">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="h-4 w-4 text-[#F95721]" />
              <h3 className="text-sm font-bold text-neutral-900 uppercase tracking-wider">
                Recommended For You
              </h3>
            </div>
            <ProductGrid products={featuredFallback} columns={2} />
          </div>
        </div>
      ) : (
        <div className="py-12 text-center text-neutral-500 text-sm">
          Type a search query above to explore our collections.
        </div>
      )}
    </div>
  );
}

