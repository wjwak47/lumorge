"use client";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { FALLBACK_PRODUCTS } from "@/data/fallbackData";

// 直接使用静态数据 - 取6个产品
const PRODUCTS = FALLBACK_PRODUCTS.slice(0, 6).map(product => ({
  id: product.id.toString(),
  name: product.name,
  category: typeof product.category === 'string' ? product.category : 'LED Display',
  description: product.description || 'Premium LED display solution.',
  imageUrl: product.image
}));

export default function ProductShowcase() {
  return (
    <section id="products" className="w-full py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0A1628] mb-3 tracking-tight">
              Premium Solutions
            </h2>
            <p className="text-[#64748B] text-base max-w-xl">
              LED display technology designed for world-class venues
            </p>
          </div>
          <Link
            href="/products"
            className="inline-flex items-center text-[#2563EB] font-medium hover:gap-2 transition-all"
          >
            View all products
            <ArrowRight size={16} className="ml-1" />
          </Link>
        </div>

        {/* 2x3 等宽网格 - 简洁现代 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PRODUCTS.map((product, index) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="group block"
            >
              {/* 图片容器 */}
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#F8FAFC] mb-4">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=800';
                  }}
                />
                {/* 分类标签 */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1.5 bg-white/95 backdrop-blur-sm text-xs font-medium text-[#2563EB] rounded-full shadow-sm">
                    {product.category}
                  </span>
                </div>
              </div>

              {/* 内容 */}
              <h3 className="text-lg font-semibold text-[#0A1628] mb-1 group-hover:text-[#2563EB] transition-colors">
                {product.name}
              </h3>
              <p className="text-[#64748B] text-sm line-clamp-2 mb-2">
                {product.description}
              </p>
              <span className="inline-flex items-center text-sm font-medium text-[#2563EB] group-hover:gap-1.5 transition-all">
                Learn more
                <ArrowRight size={14} className="ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
