"use client";
import { useState, useMemo } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, Grid3X3, LayoutGrid } from 'lucide-react';
import Link from 'next/link';
import { FALLBACK_PRODUCTS } from '@/data/fallbackData';

// 每页显示数量
const ITEMS_PER_PAGE = 6;

// 产品数据
const ALL_PRODUCTS = FALLBACK_PRODUCTS.map(product => ({
  id: product.id.toString(),
  name: product.name,
  category: typeof product.category === 'string' ? product.category : 'LED Display',
  description: product.description || '',
  image: product.image,
  highlight: product.highlight || false
}));

// 提取分类
const CATEGORIES = ['All', ...new Set(ALL_PRODUCTS.map(p => p.category))];

export default function ProductsList() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<'grid' | 'featured'>('featured');

  // 筛选产品
  const filteredProducts = useMemo(() => {
    return selectedCategory === 'All'
      ? ALL_PRODUCTS
      : ALL_PRODUCTS.filter(product => product.category === selectedCategory);
  }, [selectedCategory]);

  // 分页计算
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // 重置页码
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  // 特色产品（第一个）
  const featuredProduct = paginatedProducts[0];
  const regularProducts = paginatedProducts.slice(1);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* 顶部工具栏 */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12">
          {/* 分类标签 */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map(category => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${selectedCategory === category
                    ? 'bg-[#0A1628] text-white shadow-lg shadow-[#0A1628]/20'
                    : 'bg-[#F1F5F9] text-[#64748B] hover:bg-[#E2E8F0]'
                  }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* 视图切换 */}
          <div className="flex items-center gap-2 bg-[#F1F5F9] p-1 rounded-lg">
            <button
              onClick={() => setViewMode('featured')}
              className={`p-2 rounded-md transition-all ${viewMode === 'featured' ? 'bg-white shadow-sm' : ''}`}
              title="Featured View"
            >
              <LayoutGrid size={18} className={viewMode === 'featured' ? 'text-[#0A1628]' : 'text-[#64748B]'} />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md transition-all ${viewMode === 'grid' ? 'bg-white shadow-sm' : ''}`}
              title="Grid View"
            >
              <Grid3X3 size={18} className={viewMode === 'grid' ? 'text-[#0A1628]' : 'text-[#64748B]'} />
            </button>
          </div>
        </div>

        {/* 产品展示区 */}
        {viewMode === 'featured' && featuredProduct ? (
          <>
            {/* 特色产品 - 大图展示 */}
            <Link
              href={`/products/${featuredProduct.id}`}
              className="group block mb-8"
            >
              <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#0A1628] to-[#1E3A5F]">
                <div className="grid md:grid-cols-2 gap-8">
                  {/* 左侧内容 */}
                  <div className="p-10 md:p-14 flex flex-col justify-center">
                    <span className="inline-block px-4 py-1.5 bg-[#2563EB] text-white text-xs font-semibold rounded-full mb-6 w-fit">
                      FEATURED
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                      {featuredProduct.name}
                    </h2>
                    <p className="text-white/70 text-lg mb-8 line-clamp-3">
                      {featuredProduct.description}
                    </p>
                    <span className="inline-flex items-center text-white font-medium group-hover:gap-3 transition-all">
                      Explore Product
                      <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>

                  {/* 右侧图片 */}
                  <div className="relative aspect-square md:aspect-auto">
                    <img
                      src={featuredProduct.image}
                      alt={featuredProduct.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=800';
                      }}
                    />
                    {/* 渐变遮罩 */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0A1628]/50 via-transparent to-transparent md:block hidden" />
                  </div>
                </div>
              </div>
            </Link>

            {/* 其他产品网格 - 交错布局 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularProducts.map((product, index) => (
                <Link
                  key={product.id}
                  href={`/products/${product.id}`}
                  className={`group block ${index === 0 && regularProducts.length >= 3 ? 'md:col-span-2 lg:col-span-1' : ''}`}
                >
                  <div className="relative rounded-2xl overflow-hidden bg-[#FAFBFD] border border-[#E2E8F0] hover:border-[#2563EB]/30 hover:shadow-xl hover:shadow-[#2563EB]/5 transition-all duration-500">
                    {/* 图片 */}
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=800';
                        }}
                      />
                    </div>

                    {/* 内容 */}
                    <div className="p-6">
                      <span className="text-xs font-semibold text-[#2563EB] uppercase tracking-wider">
                        {product.category}
                      </span>
                      <h3 className="text-xl font-bold text-[#0A1628] mt-2 mb-2 group-hover:text-[#2563EB] transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-[#64748B] text-sm line-clamp-2 mb-4">
                        {product.description}
                      </p>
                      <span className="inline-flex items-center text-sm font-medium text-[#2563EB]">
                        Learn More
                        <ArrowRight size={14} className="ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        ) : (
          /* 纯Grid视图 */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedProducts.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                className="group block"
              >
                <div className="relative rounded-2xl overflow-hidden bg-[#FAFBFD] border border-[#E2E8F0] hover:border-[#2563EB]/30 hover:shadow-xl hover:shadow-[#2563EB]/5 transition-all duration-500">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=800';
                      }}
                    />
                  </div>
                  <div className="p-6">
                    <span className="text-xs font-semibold text-[#2563EB] uppercase tracking-wider">
                      {product.category}
                    </span>
                    <h3 className="text-xl font-bold text-[#0A1628] mt-2 mb-2 group-hover:text-[#2563EB] transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-[#64748B] text-sm line-clamp-2 mb-4">
                      {product.description}
                    </p>
                    <span className="inline-flex items-center text-sm font-medium text-[#2563EB]">
                      Learn More
                      <ArrowRight size={14} className="ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* 分页器 */}
        {totalPages > 1 && (
          <div className="mt-12 flex items-center justify-center gap-2">
            {/* 上一页 */}
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${currentPage === 1
                  ? 'bg-[#F1F5F9] text-[#CBD5E0] cursor-not-allowed'
                  : 'bg-[#F1F5F9] text-[#64748B] hover:bg-[#0A1628] hover:text-white'
                }`}
            >
              <ChevronLeft size={18} />
            </button>

            {/* 页码 */}
            {Array.from({ length: totalPages }).map((_, index) => {
              const page = index + 1;
              const isActive = page === currentPage;
              const showPage = page === 1 || page === totalPages || Math.abs(page - currentPage) <= 1;
              const showEllipsis = (page === 2 && currentPage > 3) || (page === totalPages - 1 && currentPage < totalPages - 2);

              if (showEllipsis) {
                return <span key={page} className="w-10 h-10 flex items-center justify-center text-[#64748B]">...</span>;
              }

              if (!showPage && page !== 2 && page !== totalPages - 1) return null;

              return (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-medium transition-all ${isActive
                      ? 'bg-[#0A1628] text-white shadow-lg shadow-[#0A1628]/20'
                      : 'bg-[#F1F5F9] text-[#64748B] hover:bg-[#E2E8F0]'
                    }`}
                >
                  {page}
                </button>
              );
            })}

            {/* 下一页 */}
            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${currentPage === totalPages
                  ? 'bg-[#F1F5F9] text-[#CBD5E0] cursor-not-allowed'
                  : 'bg-[#F1F5F9] text-[#64748B] hover:bg-[#0A1628] hover:text-white'
                }`}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        )}

        {/* 产品统计 */}
        <div className="mt-6 text-center text-sm text-[#64748B]">
          Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} - {Math.min(currentPage * ITEMS_PER_PAGE, filteredProducts.length)} of {filteredProducts.length} products
        </div>

        {/* 空状态 */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-[#64748B] text-lg">No products found in this category</p>
          </div>
        )}

        {/* 底部CTA */}
        <div className="mt-20">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#0A1628] via-[#1E3A5F] to-[#0A1628] p-10 md:p-14 text-center">
            {/* 背景光效 */}
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-[#2563EB]/20 rounded-full blur-[100px]" />
            <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-[#2563EB]/20 rounded-full blur-[100px]" />

            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Need a Custom Solution?
              </h3>
              <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
                Our team can design the perfect LED display package tailored to your venue requirements.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center px-8 py-4 bg-white text-[#0A1628] font-semibold rounded-full hover:bg-[#F1F5F9] hover:shadow-xl transition-all"
              >
                Contact Our Team
                <ArrowRight size={18} className="ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}