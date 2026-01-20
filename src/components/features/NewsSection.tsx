"use client";
import { useEffect, useState } from "react";
import { Calendar, Clock, BookOpen, Newspaper, ArrowUpRight } from "lucide-react";
import { applicationApi } from "@/utils/api";

type Item = {
  id: string | number;
  slug?: string;
  title: string;
  excerpt?: string;
  featuredImage?: string;
  imageUrl?: string;
  publishDate?: string;
  readMinutes?: number | string;
  type: 'news' | 'blog';
  category?: string;
  color?: string;
};

export default function NewsSection() {
  const [activeTab, setActiveTab] = useState<"all" | "news" | "blog">("all");
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        // 复用 public/news 接口。由于工具封装在 utils/api 中针对 applications，这里直接用原生 fetch 调用即可
        const base = (process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3006/api');
        // 更稳健的资源域名：优先显式声明，其次根据浏览器当前主机拼端口 3006，最后回退 base 去掉 /api
        const envAssetBase = process.env.NEXT_PUBLIC_ASSET_BASE as string | undefined;
        const guessedAssetBase = typeof window !== 'undefined' ? `${window.location.protocol}//${window.location.hostname}:3006` : '';
        const assetBase = envAssetBase || guessedAssetBase || base.replace(/\/api$/, '');
        const toAssetUrl = (src?: string) => {
          if (!src) return '';
          if (/^https?:\/\//i.test(src)) return src;
          if (src.startsWith('/uploads/')) return `${assetBase}${src}`;
          return src;
        };
        const resp = await fetch(`${base}/public/news?limit=12`);
        const data = await resp.json();
        if (data?.success && data.data?.items) {
          const mapped: Item[] = data.data.items.map((n: any) => ({
            id: n.id,
            slug: n.slug,
            title: n.title,
            excerpt: n.excerpt,
            featuredImage: n.featuredImage,
            imageUrl: toAssetUrl(n.featuredImage),
            publishDate: n.publishDate,
            readMinutes: n.readMinutes || 5,
            type: 'news',
            category: n.category || 'News',
            color: '#0052CC'
          }));
          setItems(mapped);
        } else {
          setItems([]);
        }
      } catch (e) {
        setItems([]);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  const NEWS_CONTENT: Item[] = items;
  const filteredContent = activeTab === "all"
    ? NEWS_CONTENT
    : NEWS_CONTENT.filter(item =>
        (activeTab === "news" && item.type === "news") ||
        (activeTab === "blog" && item.type === "blog")
      );
  
  return (
    <section id="news-video" className="w-full py-28 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-[#F8FAFD] to-[#EFF6FF]"></div>
      
      {/* 背景图案 */}
      <div className="absolute inset-0 bg-pattern opacity-[0.03]"></div>
      
      {/* 装饰性元素 */}
      <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 opacity-20 blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-gradient-to-br from-indigo-100 to-indigo-200 opacity-20 blur-3xl"></div>
      
      {/* 装饰网格线 */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]"></div>
      
      {/* 顶部装饰线条 */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-400/30 to-transparent"></div>
      
      <div className="max-w-[1200px] mx-auto px-8 relative z-20">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="text-sm font-semibold text-[#0052CC] uppercase tracking-wider mb-3">
              Stay Updated
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#0A1F44] mb-2">
              News & Resources
            </h2>
            <p className="text-[#4A5568] max-w-xl">
              The latest updates, innovations and insights from the world of sports technology.
            </p>
          </div>
          
          {/* Content tabs */}
          <div className="mt-6 md:mt-0 bg-white rounded-full shadow-sm p-1 inline-flex border border-gray-100">
            <button 
              onClick={() => setActiveTab("all")} 
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                activeTab === "all" 
                  ? "bg-blue-50 text-blue-700 shadow-sm" 
                  : "text-[#4A5568] hover:text-[#0A1F44]"
              }`}
            >
              All
            </button>
            <button 
              onClick={() => setActiveTab("news")} 
              className={`px-6 py-2 rounded-full text-sm font-medium flex items-center gap-1.5 transition-all ${
                activeTab === "news" 
                  ? "bg-blue-50 text-blue-700 shadow-sm" 
                  : "text-[#4A5568] hover:text-[#0A1F44]"
              }`}
            >
              <Newspaper size={14} /> News
            </button>
            <button 
              onClick={() => setActiveTab("blog")} 
              className={`px-6 py-2 rounded-full text-sm font-medium flex items-center gap-1.5 transition-all ${
                activeTab === "blog" 
                  ? "bg-blue-50 text-blue-700 shadow-sm" 
                  : "text-[#4A5568] hover:text-[#0A1F44]"
              }`}
            >
              <BookOpen size={14} /> Blog Posts
            </button>
          </div>
        </div>
        
        {/* Content grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {(loading ? Array.from({ length: 6 }).map((_, i) => ({ id: `s${i}`, title: 'Loading...', excerpt: '', type: 'news', color: '#E5E7EB' })) : filteredContent).map((item: any, index: number) => (
            <div 
              key={item.id}
              className={`bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md ${
                item.type === 'blog' ? 'hover:shadow-blue-100' : ''
              } flex flex-col transition-all hover:translate-y-[-4px] group ${
                index === 0 ? "lg:col-span-2 lg:row-span-2" : ""
              }`}
            >
              {/* Featured image/blog thumbnail */}
              <div 
                className={`w-full ${index === 0 ? "h-64" : "h-48"} relative overflow-hidden ${
                  item.type === 'blog' ? 'bg-[#EBF5FF]' : 'bg-[#F8FAFC]'
                }`}
                style={item.imageUrl ? { backgroundImage: `url(${item.imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' } : undefined}
              >
                <img
                  src={item.imageUrl || '/images/placeholder-image.jpg'}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover z-0"
                  loading="lazy"
                  onError={(e) => {
                    const img = e.currentTarget as HTMLImageElement;
                    if (!img.dataset.fallback) {
                      img.dataset.fallback = '1';
                      img.src = '/images/placeholder-image.jpg';
                    }
                  }}
                />
                {/* 添加装饰性波浪图案 */}
                <div className="absolute inset-0 bg-wave-pattern opacity-10 z-10"></div>
                
                {/* Category tag */}
                <div className="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur-sm text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
                  {item.category || 'News'}
                </div>
                
                {/* Resource type indicator */}
                <div className="absolute top-0 left-0">
                  <div className={`py-1 px-3 ${
                    item.type === 'blog' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-700 text-white'
                  }`}>
                    <span className="text-xs font-bold uppercase tracking-wider">{item.type}</span>
                  </div>
                </div>
                
                {/* 添加悬停时的迷你动画效果 */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              
              {/* Content */}
              <div className={`p-6 flex flex-col flex-grow backdrop-blur-sm border-t ${
                item.type === 'blog' ? 'bg-blue-50/50 border-blue-100/30' : 'bg-white border-gray-100'
              }`}>
                <h3 className={`font-bold ${index === 0 ? "text-xl" : "text-lg"} mb-3 ${
                  item.type === 'blog' ? 'text-blue-800' : 'text-[#0A1F44]'
                } line-clamp-2 group-hover:text-blue-600 transition-colors`}>
                  {item.title}
                </h3>
                <p className="text-[#4A5568] text-sm mb-4 line-clamp-3">{item.excerpt}</p>
                
                {/* Metadata footer */}
                <div className="mt-auto flex items-center justify-between">
                  <div className="flex items-center text-xs text-[#4A5568]">
                    <Calendar size={14} className="flex-shrink-0 mr-1" />
                    <span>{item.publishDate ? new Date(item.publishDate).toLocaleDateString() : ''}</span>
                    <span className="mx-2">•</span>
                    <Clock size={14} className="flex-shrink-0 mr-1" />
                    <span>{typeof item.readMinutes === 'number' ? `${item.readMinutes} min` : (item.readMinutes || '5 min')}</span>
                  </div>
                  
                  <a 
                    href={`/news/${item.slug || item.id}`} 
                    className={`text-xs font-medium inline-flex items-center whitespace-nowrap ${
                      item.type === 'blog' ? 'text-blue-600' : 'text-[#0052CC]'
                    } hover:underline group-hover:translate-x-0.5 transition-transform`}
                  >
                    Read {item.type === 'blog' ? 'Blog' : 'News'}
                    <ArrowUpRight size={14} className="ml-1 group-hover:ml-1.5 transition-all" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* View all link */}
        <div className="mt-12 text-center">
          <a 
            href="#all-news" 
            className="inline-flex items-center justify-center bg-white border border-[#0052CC] text-[#0052CC] hover:bg-[#0052CC] hover:text-white font-medium px-6 py-3 rounded-lg transition-colors shadow-sm hover:shadow-md"
          >
            View All Resources
            <ArrowUpRight size={18} className="ml-2" />
          </a>
        </div>
      </div>
      
      <style jsx>{`
        .bg-pattern {
          background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5z' fill='%230052CC' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E");
        }
        .bg-grid-pattern {
          background-image: 
            linear-gradient(rgba(37, 99, 235, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(37, 99, 235, 0.05) 1px, transparent 1px);
          background-size: 20px 20px;
        }
        .bg-wave-pattern {
          background-image: url("data:image/svg+xml,%3Csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='wave' width='100' height='20' patternUnits='userSpaceOnUse'%3E%3Cpath d='M0 10 Q 25 0, 50 10 T 100 10' stroke='%23FFFFFF' fill='none'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23wave)'/%3E%3C/svg%3E");
        }
      `}</style>
    </section>
  );
} 