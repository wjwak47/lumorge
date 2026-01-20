"use client";
import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { RESOURCE_CATEGORIES, Resource } from '@/data/resources';
import { ArrowRight, Calendar, Clock, Search, Filter, X, ChevronLeft, ChevronRight, BookOpen, Newspaper } from 'lucide-react';
import PageHero from '@/components/features/PageHero';

// 每页显示的资源数量
const ITEMS_PER_PAGE = 9;

export default function ResourcesPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [items, setItems] = useState<any[]>([]);
  const [serverTotal, setServerTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchList = async () => {
      try {
        setLoading(true);
        const base = (process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3006/api');
        const resp = await fetch(`${base}/public/news?page=${currentPage}&limit=${ITEMS_PER_PAGE}`);
        const data = await resp.json();
        const assetBase = base.replace(/\/api$/, '');
        const toThumb = (src?: string) => {
          if (!src) return '';
          if (/^https?:\/\//i.test(src)) return src;
          if (src.startsWith('/uploads/')) return `${assetBase}${src}`;
          return src;
        };
        if (data?.success) {
          const mapped = (data.data?.items || []).map((n: any) => ({
            id: n.id,
            slug: n.slug,
            title: n.title,
            description: n.excerpt || '',
            date: n.publishDate ? new Date(n.publishDate).toLocaleDateString() : '',
            readTime: (n.readMinutes || 5) + ' min',
            type: 'news',
            thumbnail: toThumb(n.featuredImage)
          }));
          setItems(mapped);
          setServerTotal(data.data?.pagination?.total || mapped.length);
        } else {
          setItems([]);
          setServerTotal(0);
        }
      } catch {
        setItems([]);
        setServerTotal(0);
      } finally {
        setLoading(false);
      }
    };
    fetchList();
  }, [currentPage, selectedCategory]);

  const filteredResources: (Resource & { slug?: string })[] = useMemo(() => {
    const base = items as any[];
    const filteredByCategory = selectedCategory === 'all' ? base : base.filter(r => r.type === selectedCategory);
    if (!searchQuery) return filteredByCategory as any;
    const q = searchQuery.toLowerCase();
    return filteredByCategory.filter(r => (r.title || '').toLowerCase().includes(q) || (r.description || '').toLowerCase().includes(q)) as any;
  }, [items, selectedCategory, searchQuery]);

  const totalPages = Math.max(1, Math.ceil((serverTotal || filteredResources.length) / ITEMS_PER_PAGE));
  
  // 当筛选条件改变时，重置为第一页
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };
  
  // 当筛选条件清除时，重置为第一页
  const handleClearFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setCurrentPage(1);
  };
  
  // 获取当前页的资源（后端已分页，此处直接使用返回列表）
  const paginatedResources = filteredResources;
  
  return (
    <div className="min-h-screen pt-20">
      <PageHero
        title="Resources & News"
        subtitle="Stay updated with our latest news, blog posts, and case studies"
        background="bg-gradient-to-r from-[#0A1F44] to-[#0052CC]"
      />
      
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-[1200px]">
          {/* 筛选和搜索 */}
          <div className="mb-12 flex flex-col md:flex-row justify-between gap-6">
            {/* 类别筛选 */}
            <div className="flex flex-wrap gap-2">
              {RESOURCE_CATEGORIES.map(category => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryChange(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === category.id
                      ? category.id === 'blog' 
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'bg-[#0052CC] text-white shadow-sm'
                      : 'bg-white text-[#4A5568] border border-[#E2E8F0] hover:border-[#0052CC] hover:text-[#0052CC]'
                  }`}
                >
                  <span className="flex items-center">
                    {category.id === 'blog' && <BookOpen size={14} className="mr-1.5" />}
                    {category.id === 'news' && <Newspaper size={14} className="mr-1.5" />}
                    {category.name}
                  </span>
                </button>
              ))}
            </div>
            
            {/* 搜索 */}
            <div className="relative w-full md:w-64">
              <input
                type="text"
                placeholder="Search resources..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full py-2 pl-10 pr-10 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0052CC] focus:border-transparent"
              />
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#718096]" />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#718096] hover:text-[#0A1F44]"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </div>
          
          {/* 资源网格 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {paginatedResources.map((resource: any) => (
              <Link
                href={`/news/${resource.slug || resource.id}`}
                key={resource.id}
                className="block h-full"
              >
                <ResourceCard resource={resource} />
              </Link>
            ))}
          </div>
          
          {/* 无结果 */}
          {filteredResources.length === 0 && (
            <div className="text-center py-16">
              <Search size={48} className="mx-auto text-[#E2E8F0] mb-4" />
              <h3 className="text-xl font-semibold text-[#0A1F44] mb-2">No resources found</h3>
              <p className="text-[#718096] mb-6">Try changing your search or filter criteria</p>
              <button 
                onClick={handleClearFilters}
                className="inline-flex items-center justify-center text-[#0052CC] font-medium hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}
          
          {/* 分页控件 */}
          {filteredResources.length > 0 && totalPages > 1 && (
            <div className="mt-12 flex items-center justify-center">
              <div className="flex items-center space-x-2">
                {/* 上一页按钮 */}
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
                
                {/* 页码 */}
                {Array.from({ length: totalPages }).map((_, index) => {
                  const pageNumber = index + 1;
                  // 显示当前页、第一页、最后一页和当前页附近的页码
                  const shouldShowPage = 
                    pageNumber === 1 || 
                    pageNumber === totalPages || 
                    (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1);
                  
                  // 显示省略号
                  if (!shouldShowPage) {
                    // 确保只显示一次省略号
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
                
                {/* 下一页按钮 */}
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
        </div>
      </section>
    </div>
  );
}

// 资源卡片组件
function ResourceCard({ resource }: { resource: Resource }) {
  // 获取资源类型的背景色
  const getTypeBackground = () => {
    if (resource.type === 'blog') {
      return 'bg-[#EBF5FF]';
    } else {
      return 'bg-[#F8FAFC]';
    }
  };

  // 获取资源类型的阴影和悬停效果
  const getTypeEffect = () => {
    return resource.type === 'blog'
      ? 'shadow-sm hover:shadow-md hover:shadow-blue-100'
      : 'shadow-sm hover:shadow-md'
  };
  
  return (
    <div className={`h-full flex flex-col rounded-xl overflow-hidden bg-white ${getTypeEffect()} transition-all ${
      resource.type === 'blog' ? 'blog-card' : 'news-card'
    }`}>
      {/* 缩略图区域 */}
      <div className={`relative ${getTypeBackground()} h-48`}>
        {/* 显示缩略图 - 使用容错处理但不依赖外部图片文件 */}
        {resource.thumbnail ? (
          <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
            <img 
              src={resource.thumbnail} 
              alt={resource.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                // 设置为透明，显示背景色
                e.currentTarget.style.opacity = '0.1';
                // 防止再次触发错误
                e.currentTarget.onerror = null;
              }}
            />
            
            {/* 在图片上方的半透明图标 */}
            <div className="absolute inset-0 flex items-center justify-center opacity-10">
              {resource.type === 'blog' 
                ? <BookOpen size={80} className="text-blue-700" /> 
                : <Newspaper size={80} className="text-gray-700" />
              }
            </div>
          </div>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
            {resource.type === 'blog' 
              ? <BookOpen size={40} className="text-blue-300" /> 
              : <Newspaper size={40} className="text-gray-300" />
            }
          </div>
        )}
        
        {/* 左上角标签：显著的博客/新闻标识 */}
        <div className="absolute top-0 left-0 z-10">
          <div className={`py-1 px-3 ${
            resource.type === 'blog' 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-700 text-white'
          }`}>
            <span className="text-xs font-bold uppercase tracking-wider">{resource.type}</span>
          </div>
        </div>
      </div>
      
      {/* 内容区域 */}
      <div className={`p-5 flex-grow flex flex-col ${
        resource.type === 'blog' ? 'bg-blue-50/50' : ''
      }`}>
        <h3 className={`font-bold ${
          resource.type === 'blog' ? 'text-blue-800' : 'text-[#0A1F44]'
        } text-lg mb-2`}>
          {resource.title}
        </h3>
        
        <p className="text-[#4A5568] text-sm mb-4 line-clamp-2">
          {resource.description}
        </p>
        
        {/* 元数据 */}
        <div className="mt-auto flex items-center justify-between text-xs text-[#718096]">
          <div className="flex items-center">
            <Calendar size={14} className="flex-shrink-0 mr-1" />
            <span>{resource.date}</span>
            <span className="mx-2">•</span>
            <Clock size={14} className="flex-shrink-0 mr-1" />
            <span>{resource.readTime || "5 min"}</span>
          </div>
          
          <div className={`inline-flex items-center text-sm font-medium hover:underline ${
            resource.type === 'blog' ? 'text-blue-600' : 'text-[#0052CC]'
          }`}>
            Read {resource.type === 'blog' ? 'Blog' : 'News'}
            <ArrowRight size={14} className="ml-1.5" />
          </div>
        </div>
      </div>
    </div>
  );
}