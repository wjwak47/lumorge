"use client";
import { ArrowRight, Calendar } from 'lucide-react';
import Link from 'next/link';
import { FALLBACK_NEWS } from '@/data/fallbackData';

const NEWS_ITEMS = FALLBACK_NEWS.map(item => ({
  id: item.id,
  slug: item.slug || item.id,
  title: item.title,
  excerpt: item.excerpt || '',
  featuredImage: item.featuredImage,
  publishDate: item.publishDate
}));

export default function NewsHighlights() {
  const formatDate = (dateStr?: string) => {
    if (!dateStr) return '';
    try {
      const date = new Date(dateStr);
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
    } catch {
      return dateStr;
    }
  };

  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0A1628] tracking-tight">
            Latest Updates
          </h2>
          <Link
            href="/news"
            className="inline-flex items-center text-[#2563EB] font-medium hover:gap-2 transition-all"
          >
            View all
            <ArrowRight size={16} className="ml-1" />
          </Link>
        </div>

        {/* 3列等宽卡片 - 简洁风格 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {NEWS_ITEMS.slice(0, 3).map((item) => (
            <Link
              key={item.id}
              href={`/news/${item.slug}`}
              className="group block"
            >
              {/* 图片 */}
              <div className="relative aspect-[16/10] rounded-xl overflow-hidden mb-4">
                <img
                  src={item.featuredImage}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=800';
                  }}
                />
              </div>

              {/* 日期 */}
              <p className="text-xs text-[#64748B] mb-2">{formatDate(item.publishDate)}</p>

              {/* 标题 */}
              <h3 className="text-base font-semibold text-[#0A1628] line-clamp-2 group-hover:text-[#2563EB] transition-colors">
                {item.title}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}