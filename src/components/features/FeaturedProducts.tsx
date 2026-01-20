"use client";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { FALLBACK_PRODUCTS } from "@/data/fallbackData";
import { useState, useRef } from "react";

// 使用后6个产品，避免和 ProductShowcase 重复
const PRODUCTS = FALLBACK_PRODUCTS.slice(6, 12).length > 0
  ? FALLBACK_PRODUCTS.slice(6, 12)
  : FALLBACK_PRODUCTS.slice(0, 6);

const DISPLAY_PRODUCTS = PRODUCTS.map(product => ({
  id: product.id.toString(),
  name: product.name,
  category: typeof product.category === 'string' ? product.category : 'LED Display',
  image: product.image
}));

export default function FeaturedProducts() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-16 md:py-20 bg-[#FAFBFD]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-[#0A1628] tracking-tight">
            More Products
          </h2>

          <div className="flex items-center gap-3">
            <button
              onClick={() => scroll('left')}
              className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:border-gray-400 hover:text-gray-700 transition-colors"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:border-gray-400 hover:text-gray-700 transition-colors"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* 横向滚动 - 简洁卡片 */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide pb-2"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {DISPLAY_PRODUCTS.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="group flex-shrink-0 w-[220px]"
            >
              <div className="relative aspect-square rounded-xl overflow-hidden bg-white mb-3">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <p className="text-xs text-[#64748B] mb-1">{product.category}</p>
              <h3 className="text-sm font-medium text-[#0A1628] line-clamp-1 group-hover:text-[#2563EB] transition-colors">
                {product.name}
              </h3>
            </Link>
          ))}

          {/* View All Card */}
          <Link
            href="/products"
            className="flex-shrink-0 w-[220px] aspect-square rounded-xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-gray-400 hover:border-[#2563EB] hover:text-[#2563EB] transition-colors"
          >
            <ArrowRight size={24} className="mb-2" />
            <span className="text-sm font-medium">View All</span>
          </Link>
        </div>
      </div>
    </section>
  );
}