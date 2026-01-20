"use client";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { FALLBACK_PRODUCTS } from "@/data/fallbackData";

// 直接使用静态数据
const PRODUCTS = FALLBACK_PRODUCTS.map(product => ({
  id: product.id.toString(),
  name: product.name,
  category: typeof product.category === 'string' ? product.category : 'LED Display',
  description: product.description || '',
  image: product.image
}));

export default function FeaturedProducts() {
  return (
    <section className="py-32 bg-[#FAFBFD]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#0A1628] mb-4 tracking-tight">
            Featured Products
          </h2>
          <p className="text-[#64748B] text-lg max-w-xl mx-auto">
            Precision-engineered LED solutions for exceptional experiences
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PRODUCTS.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="group block"
            >
              {/* Image Container */}
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-white mb-5 shadow-sm group-hover:shadow-xl transition-shadow duration-500">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=800';
                  }}
                />
              </div>

              {/* Content */}
              <div className="space-y-2">
                <span className="text-xs font-medium text-[#2563EB] uppercase tracking-wider">
                  {product.category}
                </span>

                <h3 className="text-lg font-semibold text-[#0A1628] group-hover:text-[#2563EB] transition-colors">
                  {product.name}
                </h3>

                {product.description && (
                  <p className="text-[#64748B] text-sm line-clamp-2">
                    {product.description}
                  </p>
                )}

                <span className="inline-flex items-center text-sm font-medium text-[#2563EB] pt-1 group-hover:gap-2 transition-all">
                  Learn more
                  <ArrowRight size={14} className="ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* View All */}
        <div className="mt-16 text-center">
          <Link
            href="/products"
            className="inline-flex items-center px-8 py-4 border-2 border-[#0A1628] text-[#0A1628] font-medium rounded-full hover:bg-[#0A1628] hover:text-white transition-all duration-300"
          >
            View All Products
            <ArrowRight size={16} className="ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
}