"use client";
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { FALLBACK_NEWS } from '@/data/fallbackData';

// 直接使用fallback数据
const NEWS_ITEMS = FALLBACK_NEWS.map(item => ({
  id: item.id,
  slug: item.slug || item.id,
  title: item.title,
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
    <section className="py-32 bg-[#FAFBFD]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#0A1628] mb-4 tracking-tight">
            Latest Updates
          </h2>
          <p className="text-[#64748B] text-lg max-w-xl mx-auto">
            Stay informed with our latest news and insights
          </p>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {NEWS_ITEMS.map((item) => (
            <Link
              key={item.id}
              href={`/news/${item.slug}`}
              className="group block"
            >
              {/* Image */}
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-gray-200 mb-5">
                <img
                  src={item.featuredImage}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=800';
                  }}
                />
              </div>

              {/* Content */}
              <h3 className="text-lg font-semibold text-[#0A1628] mb-2 line-clamp-2 group-hover:text-[#2563EB] transition-colors">
                {item.title}
              </h3>

              <span className="text-sm text-[#64748B]">
                {formatDate(item.publishDate)}
              </span>
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-16">
          <Link
            href="/news"
            className="inline-flex items-center px-8 py-4 border-2 border-[#0A1628] text-[#0A1628] font-medium rounded-full hover:bg-[#0A1628] hover:text-white transition-all duration-300"
          >
            View All News
            <ArrowRight size={16} className="ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
}