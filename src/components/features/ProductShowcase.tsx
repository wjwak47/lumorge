"use client";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { FALLBACK_PRODUCTS } from "@/data/fallbackData";

// 直接使用静态数据
const PRODUCTS = FALLBACK_PRODUCTS.slice(0, 3).map(product => ({
  id: product.id.toString(),
  name: product.name,
  description: product.description || 'Premium LED display solution.',
  imageUrl: product.image
}));

export default function ProductShowcase() {
  return (
    <section id="products" className="w-full py-32 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-[#0A1628] mb-4 tracking-tight">
            Premium Solutions
          </h2>
          <p className="text-[#64748B] text-lg max-w-xl mx-auto">
            LED display technology designed for world-class venues
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PRODUCTS.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="group block"
            >
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-[#FAFBFD] mb-5">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=800';
                  }}
                />
                {/* Subtle overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              <h3 className="text-xl font-semibold text-[#0A1628] mb-2 group-hover:text-[#2563EB] transition-colors">
                {product.name}
              </h3>

              <p className="text-[#64748B] text-sm line-clamp-2 mb-3">
                {product.description}
              </p>

              <span className="inline-flex items-center text-sm font-medium text-[#2563EB] group-hover:gap-2 transition-all">
                Explore
                <ArrowRight size={14} className="ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
              </span>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <Link
            href="/products"
            className="inline-flex items-center px-8 py-4 bg-[#0A1628] text-white font-medium rounded-full hover:bg-[#1E293B] transition-all duration-300 hover:shadow-lg"
          >
            View All Products
            <ArrowRight size={16} className="ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
}
