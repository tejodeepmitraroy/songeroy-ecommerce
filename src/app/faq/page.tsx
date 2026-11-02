"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Search, HelpCircle, Package, Truck, RotateCcw, CreditCard, Sparkles } from "lucide-react";
import { FAQ_ITEMS } from "@/data/faqs";
import { Accordion, AccordionItem } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { id: "all", label: "All Questions", icon: HelpCircle },
    { id: "orders", label: "Orders", icon: Package },
    { id: "shipping", label: "Shipping & Delivery", icon: Truck },
    { id: "returns", label: "Returns & Refunds", icon: RotateCcw },
    { id: "payments", label: "Payments & Coupons", icon: CreditCard },
    { id: "products", label: "Product & Sizing", icon: Sparkles },
  ];

  const filteredFaqs = useMemo(() => {
    return FAQ_ITEMS.filter((item) => {
      if (activeCategory !== "all" && item.category !== activeCategory) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        return (
          item.question.toLowerCase().includes(q) ||
          item.answer.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
      <div className="text-center space-y-4 mb-10">
        <span className="text-xs font-bold uppercase tracking-widest text-[#F95721]">
          Help & Frequently Asked Questions
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-950 tracking-tight">
          How Can We Assist You?
        </h1>
        <p className="text-sm text-neutral-500 max-w-lg mx-auto">
          Answers to common questions regarding delivery schedules, our 14-day return window, and simulated payments.
        </p>

        {/* Search Input */}
        <div className="max-w-md mx-auto pt-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search questions by topic or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-11 pl-10 pr-4 rounded-xl border border-neutral-200 bg-white text-xs text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-900 shadow-xs"
            />
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
          </div>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center justify-center gap-2 flex-wrap mb-10">
        {categories.map((cat) => {
          const isSelected = activeCategory === cat.id;
          const Icon = cat.icon;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                isSelected
                  ? "bg-neutral-900 text-white shadow-xs"
                  : "bg-white border border-neutral-200 text-neutral-600 hover:border-neutral-300"
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Accordion Questions List */}
      <div className="bg-white rounded-3xl border border-neutral-200/90 shadow-xs p-6 sm:p-8">
        {filteredFaqs.length === 0 ? (
          <div className="py-12 text-center text-xs text-neutral-500">
            No FAQs matched your search term &quot;{searchQuery}&quot;. Try a different keyword or reset filters.
          </div>
        ) : (
          <Accordion>
            {filteredFaqs.map((faq, index) => (
              <AccordionItem
                key={faq.id}
                title={faq.question}
                isOpenDefault={index === 0 && !searchQuery}
              >
                <p className="leading-relaxed">{faq.answer}</p>
              </AccordionItem>
            ))}
          </Accordion>
        )}
      </div>

      {/* Still need help callout */}
      <div className="mt-12 rounded-2xl bg-neutral-100 p-6 sm:p-8 text-center space-y-3">
        <h3 className="text-base font-bold text-neutral-900">
          Didn&apos;t find the answer you were looking for?
        </h3>
        <p className="text-xs text-neutral-500 max-w-sm mx-auto">
          Our concierge support team in Bengaluru is ready to assist you six days a week.
        </p>
        <div className="pt-2">
          <Button asChild variant="primary" size="default">
            <Link href="/contact">Contact Our Team</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

