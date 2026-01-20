"use client";
import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { FALLBACK_PRODUCTS } from '@/data/fallbackData';

// 直接使用fallback数据
const ALL_PRODUCTS = FALLBACK_PRODUCTS.map(product => ({
  id: product.id.toString(),
  name: product.name,
  category: typeof product.category === 'string' ? product.category : 'LED Display',
  description: product.description || '',
  image: product.image
}));

// 从产品中提取分类
const CATEGORIES = ['All', ...new Set(ALL_PRODUCTS.map(p => p.category))];

export default function ProductsList() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  // 根据分类筛选产品
  const filteredProducts = selectedCategory === 'All'
    ? ALL_PRODUCTS
    : ALL_PRODUCTS.filter(product => product.category === selectedCategory);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* 极简分类标签 */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {CATEGORIES.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${selectedCategory === category
                  ? 'bg-[#0A1628] text-white'
                  : 'bg-[#F1F5F9] text-[#64748B] hover:bg-[#E2E8F0] hover:text-[#0A1628]'
                }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* 产品网格 - 极简卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="group block"
            >
              {/* 大图容器 - 70%高度 */}
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-[#FAFBFD] mb-5">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=800';
                  }}
                />
                {/* 微妙的底部渐变 */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* 产品信息 - 极简 */}
              <div className="space-y-2">
                <span className="text-xs font-medium text-[#2563EB] uppercase tracking-wider">
                  {product.category}
                </span>

                <h3 className="text-xl font-semibold text-[#0A1628] group-hover:text-[#2563EB] transition-colors">
                  {product.name}
                </h3>

                <p className="text-[#64748B] text-sm line-clamp-2">
                  {product.description}
                </p>

                <span className="inline-flex items-center text-sm font-medium text-[#2563EB] pt-2 group-hover:gap-2 transition-all">
                  View Details
                  <ArrowRight size={14} className="ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* 空状态 */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-[#64748B] text-lg">No products found in this category</p>
          </div>
        )}

        {/* 底部CTA */}
        <div className="mt-20 text-center">
          <div className="inline-block p-8 rounded-3xl bg-[#0A1628] text-white max-w-2xl">
            <h3 className="text-2xl font-bold mb-3">Need a Custom Solution?</h3>
            <p className="text-white/70 mb-6">
              Our team can design the perfect LED display package for your venue.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center px-8 py-3 bg-white text-[#0A1628] font-semibold rounded-full hover:bg-[#F1F5F9] transition-all"
            >
              Contact Us
              <ArrowRight size={16} className="ml-2" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}