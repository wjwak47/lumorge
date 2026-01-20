"use client";
import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Calendar, Clock, BookOpen, Newspaper } from 'lucide-react';
import { RESOURCES, RESOURCE_CATEGORIES, Resource } from '@/data/resources';

export default function ResourcesList() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const filteredResources = selectedCategory === 'all'
    ? RESOURCES
    : RESOURCES.filter(resource => resource.type === selectedCategory);
  
  // 获取特色资源
  const featuredResource = RESOURCES.find(r => r.featured);
  // 非特色资源
  const regularResources = RESOURCES.filter(r => !r.featured);
  
  return (
    <section className="py-16">
      <div className="container mx-auto px-4 max-w-[1200px]">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-bold text-[#0A1F44]">Resources & News</h2>
          
          {/* 类别选择 */}
          <div className="hidden md:flex items-center space-x-6">
            {RESOURCE_CATEGORIES.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`text-sm font-medium transition-colors ${
                  selectedCategory === category.id 
                    ? 'text-[#0052CC]' 
                    : 'text-[#4A5568] hover:text-[#0052CC]'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
        
        {/* 移动端类别选择 */}
        <div className="flex md:hidden overflow-x-auto pb-4 mb-6 gap-2">
          {RESOURCE_CATEGORIES.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-3 py-1 text-xs font-medium rounded-full whitespace-nowrap ${
                selectedCategory === category.id
                  ? 'bg-[#0052CC] text-white'
                  : 'bg-gray-100 text-[#4A5568]'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* 资源列表 */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* 左侧特色资源 */}
          {featuredResource && (
            <div className="md:col-span-6 lg:col-span-7">
              <ResourceCard resource={featuredResource} featured />
            </div>
          )}
          
          {/* 右侧资源列表 */}
          <div className="md:col-span-6 lg:col-span-5 flex flex-col space-y-6">
            {regularResources.slice(0, 2).map(resource => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
        </div>
        
        {/* 更多资源 - 网格布局 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {regularResources.slice(2, 6).map(resource => (
            <ResourceCard key={resource.id} resource={resource} compact />
          ))}
        </div>
        
        {/* 查看全部按钮 */}
        <div className="flex justify-center mt-12">
          <Link 
            href="/resources" 
            className="inline-flex items-center justify-center border border-[#0052CC] text-[#0052CC] hover:bg-[#0052CC] hover:text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            View All Resources
            <ArrowRight size={18} className="ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
}

// 资源卡片组件
function ResourceCard({ resource, featured = false, compact = false }: { 
  resource: Resource; 
  featured?: boolean;
  compact?: boolean;
}) {
  // 根据资源类型和布局选择合适的样式
  const getCardClasses = () => {
    if (compact) {
      return "h-full";
    }
    return featured 
      ? "h-full" 
      : "h-full";
  };
  
  // 获取资源类型的背景色
  const getTypeBackground = () => {
    if (resource.type === 'blog') {
      return resource.isPlaceholder
        ? compact ? 'bg-[#E6F7FF]' : 'bg-[#D1EFFF]'
        : 'bg-[#EBF5FF]';
    } else {
      return resource.isPlaceholder 
        ? compact ? 'bg-[#F0F4F9]' : 'bg-[#E2E8F0]'
        : 'bg-[#F8FAFC]';
    }
  };

  // 获取资源类型的阴影和悬停效果
  const getTypeEffect = () => {
    return resource.type === 'blog'
      ? 'shadow-sm hover:shadow-md hover:shadow-blue-100'
      : 'shadow-sm hover:shadow-md'
  };
  
  // 卡片内容
  return (
    <div className={`${getCardClasses()} flex flex-col rounded-xl overflow-hidden bg-white ${getTypeEffect()} transition-all ${
      resource.type === 'blog' ? 'blog-card' : 'news-card'
    }`}>
      {/* 缩略图区域 */}
      <div className={`relative ${getTypeBackground()} ${compact ? 'h-36' : featured ? 'h-64' : 'h-48'}`}>
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

        {/* Placeholder 标签 */}
        {resource.isPlaceholder && (
          <div className="absolute bottom-4 right-4">
            <span className="bg-white/80 backdrop-blur-sm text-[#718096] text-xs font-medium py-1 px-2 rounded">
              Placeholder
            </span>
          </div>
        )}
      </div>
      
      {/* 内容区域 */}
      <div className={`p-5 flex-grow flex flex-col ${
        resource.type === 'blog' ? 'bg-blue-50/50' : ''
      }`}>
        <h3 className={`font-bold ${
          resource.type === 'blog' ? 'text-blue-800' : 'text-[#0A1F44]'
        } ${featured ? 'text-xl' : compact ? 'text-base' : 'text-lg'} mb-2`}>
          {resource.title}
        </h3>
        
        {!compact && (
          <p className="text-[#4A5568] text-sm mb-4">
            {resource.description}
          </p>
        )}
        
        {/* 元数据 */}
        <div className="mt-auto flex items-center justify-between text-xs text-[#718096]">
          <div className="flex items-center">
            <Calendar size={14} className="flex-shrink-0 mr-1" />
            <span>{resource.date}</span>
            <span className="mx-2">•</span>
            <Clock size={14} className="flex-shrink-0 mr-1" />
            <span>{resource.readTime || "5 min"}</span>
          </div>
          
          <Link 
            href={`/resources/${resource.id}`} 
            className={`inline-flex items-center text-sm font-medium hover:underline ${
              resource.type === 'blog' ? 'text-blue-600' : 'text-[#0052CC]'
            }`}
          >
            Read {resource.type === 'blog' ? 'Blog' : 'News'}
            <ArrowRight size={14} className="ml-1.5" />
          </Link>
        </div>
      </div>
    </div>
  );
} 