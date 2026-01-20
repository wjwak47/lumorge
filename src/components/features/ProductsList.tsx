"use client";
import { useState, useEffect, useMemo } from 'react';
import { ArrowRight, ChevronRight, ScanSearch, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { getIconComponent } from '@/data/products';
import { getProducts } from '@/utils/api';
import { CATEGORIES } from '@/data/products'; // 只导入分类数据
import { parseFeaturesString } from '@/utils/featureParser'; // Import the utility

// Number of products to display per page
const ITEMS_PER_PAGE = 3;

// 添加Product接口定义
interface Product {
  id: string | number;
  name: string;
  category?: string | { id: number, name: string };
  description?: string;
  image?: string;
  images?: string | string[]; // Allow images to be string or string[]
  features?: string | string[]; // Allow features to be string or string[] before parsing
  iconName?: string;
  highlight?: boolean;
  tags?: string | string[]; // Allow tags to be string or string[]
}

// 标签映射函数：将中文标签和其它可能的标签形式映射为正确的标签类型
const mapTagType = (tag: string): string => {
  const tagMap: Record<string, string> = {
    // 中文标签映射
    '新品': 'New',
    '热门': 'Hot',
    '促销': 'Sale',
    '推荐': 'Featured',
    '流行': 'Popular',
    '限量版': 'Limited',
    '畅销': 'Best Seller',
    '高评分': 'Top Rated',
    '高端': 'Premium',
    '专业级': 'Professional',
    '企业级': 'Enterprise',
    '特价': 'Special',
    '环保': 'Eco-friendly',
    '节能': 'Energy Efficient',
    '无线': 'Wireless',
    '智能': 'Smart',
    '高清': 'HD',
    '超高清': '4K',
    '便携式': 'Portable'
  };

  // 检查是否为已知中文标签，如果是则返回对应的英文
  if (tagMap[tag]) {
    return tagMap[tag];
  }
  
  // 如果以"产品系列："开头，返回Featured
  if (typeof tag === 'string' && tag.startsWith('产品系列：')) {
    return 'Featured';
  }
  
  return tag;
};

// 获取标签样式类
const getTagStyle = (tag: string): string => {
  const tagType = mapTagType(tag);
  
  switch (tagType) {
    case 'Popular':
      return 'bg-amber-500 text-white';
    case 'New':
      return 'bg-green-500 text-white';
    case 'Featured':
      return 'bg-purple-500 text-white';
    case 'Eco-friendly':
      return 'bg-teal-500 text-white';
    case 'Hot':
      return 'bg-red-500 text-white';
    default:
      return 'bg-blue-500 text-white';
  }
};

export default function ProductsList() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  
  // 定义默认图片映射
  const defaultImagesByCategory: Record<string, string> = {
    'display': 'https://images.unsplash.com/photo-1603190287605-e6ade32fa852?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80',
    'control': 'https://images.unsplash.com/photo-1581091226033-c6e0b0cf8d4c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80',
    'connectivity': 'https://images.unsplash.com/photo-1633526543814-9718c8922b7a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80',
    'analytics': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80',
    'security': 'https://images.unsplash.com/photo-1640622300930-6e8f6f3f3368?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80',
    'infrastructure': 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80',
    'default': 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80'
  };

  // 获取产品图片URL
  const getProductImageUrl = (product: Product): string => {
    if (product.image && typeof product.image === 'string' && product.image.trim() !== '') {
      return product.image;
    }

    if (product.images && Array.isArray(product.images) && product.images.length > 0) {
      const firstImage = product.images[0];
      if (typeof firstImage === 'string' && firstImage.trim() !== '') {
        return firstImage;
      }
    }

    // 根据分类选择默认图片
    let category = 'default';
    if (product.category) {
      if (typeof product.category === 'string') {
        category = product.category.toLowerCase();
      } else if (product.category.name) {
        category = product.category.name.toLowerCase();
      }
    }

    return defaultImagesByCategory[category] || defaultImagesByCategory.default;
  };
  
  // 获取产品数据
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await getProducts();
        setProducts(data || []);
      } catch (error) {
        console.error('Failed to fetch products:', error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, []);
  
  // 获取产品分类名称
  const getCategoryName = (category: string | { id: number, name: string } | undefined): string => {
    if (!category) return '';
    return typeof category === 'object' ? category.name : category;
  };
  
  // Filter products based on active category
  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => {
        const categoryName = getCategoryName(product.category);
        return categoryName === selectedCategory;
      });
  
  // Calculate total pages
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  
  // Reset to first page when filter changes
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };
  
  // Get products for current page
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );
  
  return (
    <section className="pt-0 pb-20 bg-gradient-to-b from-[#F8FAFC] to-white">
      <div className="container mx-auto px-4 max-w-[1200px]">
        {/* Categories Navigation */}
        <div className="flex flex-wrap justify-center mb-12 gap-2 pt-8">
          {CATEGORIES.map(category => (
            <button
              key={category.id}
              onClick={() => handleCategoryChange(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === category.id
                  ? 'bg-[#0052CC] text-white shadow-md'
                  : 'bg-white text-[#4A5568] border border-[#E2E8F0] hover:border-[#0052CC] hover:text-[#0052CC]'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
        
        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {paginatedProducts.map(product => {
            const IconComponent = getIconComponent(product.iconName || '');
            const productImageUrl = getProductImageUrl(product);
            console.log(`[ProductsList] Product ID: ${product.id}, Features RAW:`, JSON.stringify(product.features)); // Log raw features
            const displayedFeatures = parseFeaturesString(product.features);
            console.log(`[ProductsList] Product ID: ${product.id}, Features PARSED:`, displayedFeatures); // Log parsed features
            
            return (
              <div 
                key={product.id}
                className={`bg-white rounded-xl overflow-hidden border border-[#E2E8F0] transition-all duration-300 hover:shadow-xl group relative ${
                  product.highlight ? 'md:col-span-2 lg:col-span-1 ring-2 ring-[#0052CC]' : ''
                }`}
              >
                {/* Product Image */}
                <div className="h-48 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#0A1F44] to-[#0052CC] opacity-25" />
                  
                  {/* 实际产品图片 */}
                  <div className="absolute inset-0">
                    <Image 
                      src={productImageUrl}
                      alt={product.name}
                      fill
                      style={{ objectFit: 'cover' }}
                      className="group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  
                  {/* 技术网格背景 */}
                  <div className="absolute inset-0 opacity-20">
                    <div className="grid grid-cols-8 grid-rows-8 h-full w-full">
                      {Array.from({ length: 16 }).map((_, i) => (
                        <div key={i} className="border-[0.5px] border-white/10"></div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Tags */}
                  {product.tags && Array.isArray(product.tags) && product.tags.length > 0 && (
                    <div className="absolute top-4 left-4 flex gap-2">
                      {product.tags.map((tag: string, idx: number) => (
                        <span key={`${product.id}-${tag}-${idx}`} className={`
                          text-xs font-semibold px-2 py-1 rounded-full
                          ${getTagStyle(tag)}
                        `}>
                          {/* 显示标准化的英文标签名 */}
                          {mapTagType(tag)}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                
                {/* Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-[#0A1F44] group-hover:text-[#0052CC] transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-sm text-[#718096] mt-1 capitalize">
                        {typeof product.category === 'object' && product.category !== null
                          ? (product.category as {name: string}).name.replace('-', ' ')
                          : ((product.category as string) || '').replace('-', ' ')}
                      </p>
                    </div>
                    <div className="bg-[#0052CC10] rounded-full p-2 group-hover:bg-[#0052CC] transition-colors">
                      <ChevronRight size={18} className="text-[#0052CC] group-hover:text-white transition-colors" />
                    </div>
                  </div>
                  
                  <p className="text-[#4A5568] mb-6 line-clamp-2">
                    {product.description || 'No description available.'}
                  </p>
                  
                  {/* Features */}
                  <div className="grid grid-cols-2 gap-2 mb-6">
                    {displayedFeatures.map((feature: string, index: number) => (
                      <div key={index} className="flex items-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#0052CC] mr-2"></div>
                        <span className="text-sm text-[#4A5568]">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Link 
                    href={`/products/${product.id}`} 
                    className="inline-flex items-center text-[#0052CC] font-medium group-hover:text-[#0039A6] transition-colors"
                  >
                    Learn more <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* No Results */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <ScanSearch size={48} className="mx-auto text-[#0052CC] opacity-30 mb-4" />
            <h3 className="text-xl font-semibold text-[#0A1F44] mb-2">No products found</h3>
            <p className="text-[#4A5568]">Try selecting a different category</p>
          </div>
        )}
        
        {/* Pagination controls */}
        {filteredProducts.length > 0 && totalPages > 1 && (
          <div className="mt-12 flex items-center justify-center">
            <div className="flex items-center space-x-2">
              {/* Previous page button */}
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`flex items-center justify-center w-10 h-10 rounded-md border ${
                  currentPage === 1
                    ? 'border-[#E2E8F0] text-[#CBD5E0] cursor-not-allowed'
                    : 'border-[#E2E8F0] text-[#4A5568] hover:border-[#0052CC] hover:text-[#0052CC]'
                }`}
              >
                <ChevronLeft size={18} />
              </button>
              
              {/* Page numbers */}
              {Array.from({ length: totalPages }).map((_, index) => {
                const pageNumber = index + 1;
                // Show current page, first page, last page, and current page's neighbors
                const shouldShowPage = 
                  pageNumber === 1 || 
                  pageNumber === totalPages || 
                  (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1);
                
                // Show ellipsis
                if (!shouldShowPage) {
                  // Ensure ellipsis is shown only once
                  if (pageNumber === 2 || pageNumber === totalPages - 1) {
                    return (
                      <span key={pageNumber} className="w-10 h-10 flex items-center justify-center text-[#718096]">
                        ...
                      </span>
                    );
                  }
                  return null;
                }
                
                return (
                  <button
                    key={pageNumber}
                    onClick={() => setCurrentPage(pageNumber)}
                    className={`w-10 h-10 rounded-md ${
                      currentPage === pageNumber
                        ? 'bg-[#0052CC] text-white'
                        : 'border border-[#E2E8F0] text-[#4A5568] hover:border-[#0052CC] hover:text-[#0052CC]'
                    }`}
                  >
                    {pageNumber}
                  </button>
                );
              })}
              
              {/* Next page button */}
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className={`flex items-center justify-center w-10 h-10 rounded-md border ${
                  currentPage === totalPages
                    ? 'border-[#E2E8F0] text-[#CBD5E0] cursor-not-allowed'
                    : 'border-[#E2E8F0] text-[#4A5568] hover:border-[#0052CC] hover:text-[#0052CC]'
                }`}
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        )}
        
        {/* Contact CTA */}
        <div className="mt-20 bg-gradient-to-r from-[#0A1F44] to-[#0052CC] rounded-xl p-8 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="grid grid-cols-12 grid-rows-8 h-full w-full">
              {Array.from({ length: 24 }).map((_, i) => (
                <div key={i} className="border-[0.5px] border-white/10"></div>
              ))}
            </div>
          </div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold mb-2">Need a custom solution?</h3>
              <p className="text-white/80">
                Our team of experts can help you design the perfect technology package for your venue.
              </p>
            </div>
            <Link
              href="/contact"
              className="whitespace-nowrap bg-white text-[#0052CC] px-6 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all flex items-center"
            >
              Contact our team <ArrowRight size={18} className="ml-2" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
} 