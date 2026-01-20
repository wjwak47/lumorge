"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Calendar, Clock, ArrowRight, Newspaper } from 'lucide-react';
import { FALLBACK_NEWS } from '@/data/fallbackData';

type NewsItem = {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    featuredImage: string;
    publishDate: string;
    readMinutes: number;
    category?: string;
};

export default function NewsListPage() {
    const [news, setNews] = useState<NewsItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const base = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3006/api';
                const res = await fetch(`${base}/public/news?limit=20`);
                if (res.ok) {
                    const data = await res.json();
                    if (data?.data?.items) {
                        setNews(data.data.items.map((n: any) => ({
                            id: n.id,
                            slug: n.slug || n.id,
                            title: n.title,
                            excerpt: n.excerpt,
                            featuredImage: n.featuredImage,
                            publishDate: n.publishDate,
                            readMinutes: n.readMinutes || 5,
                            category: n.category
                        })));
                        setLoading(false);
                        return;
                    }
                }
            } catch (e) {
                // Continue to fallback
            }
            // Use fallback data
            setNews(FALLBACK_NEWS.map(n => ({
                id: n.id,
                slug: n.slug || n.id,
                title: n.title,
                excerpt: n.excerpt,
                featuredImage: n.featuredImage,
                publishDate: n.publishDate,
                readMinutes: n.readMinutes || 5,
                category: n.category
            })));
            setLoading(false);
        };
        fetchNews();
    }, []);

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
        <main className="min-h-screen bg-gradient-to-b from-white via-[#F8FAFD] to-[#EFF6FF]">
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 opacity-50"></div>
                <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-blue-100 opacity-20 blur-3xl"></div>
                <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-indigo-100 opacity-20 blur-3xl"></div>

                <div className="relative max-w-6xl mx-auto px-6 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-6">
                        <Newspaper size={16} />
                        Latest Updates
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#0A1628] mb-6 tracking-tight">
                        News & Insights
                    </h1>
                    <p className="text-lg md:text-xl text-[#64748B] max-w-2xl mx-auto">
                        Stay up-to-date with the latest developments in LED display technology,
                        industry trends, and company announcements.
                    </p>
                </div>
            </section>

            {/* News Grid */}
            <section className="pb-32 px-6">
                <div className="max-w-6xl mx-auto">
                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[1, 2, 3, 4, 5, 6].map((i) => (
                                <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm animate-pulse">
                                    <div className="aspect-[16/10] bg-gray-200"></div>
                                    <div className="p-6">
                                        <div className="h-4 bg-gray-200 rounded mb-4"></div>
                                        <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
                                        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {news.map((item, index) => (
                                <Link
                                    key={item.id}
                                    href={`/news/${item.slug}`}
                                    className={`group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${index === 0 ? 'md:col-span-2 lg:col-span-3' : ''
                                        }`}
                                >
                                    {/* Image */}
                                    <div className={`relative overflow-hidden bg-gray-100 ${index === 0 ? 'aspect-[21/9]' : 'aspect-[16/10]'
                                        }`}>
                                        <img
                                            src={item.featuredImage}
                                            alt={item.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).src = 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=800';
                                            }}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                                        {/* Category Badge */}
                                        {item.category && (
                                            <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-[#0A1628]">
                                                {item.category}
                                            </div>
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div className={`p-6 ${index === 0 ? 'md:p-8' : ''}`}>
                                        <h2 className={`font-bold text-[#0A1628] group-hover:text-[#2563EB] transition-colors line-clamp-2 mb-3 ${index === 0 ? 'text-2xl md:text-3xl' : 'text-lg'
                                            }`}>
                                            {item.title}
                                        </h2>

                                        <p className={`text-[#64748B] line-clamp-2 mb-4 ${index === 0 ? 'text-base md:text-lg' : 'text-sm'
                                            }`}>
                                            {item.excerpt}
                                        </p>

                                        {/* Meta */}
                                        <div className="flex items-center gap-4 text-sm text-[#94A3B8]">
                                            <span className="flex items-center gap-1.5">
                                                <Calendar size={14} />
                                                {formatDate(item.publishDate)}
                                            </span>
                                            <span className="flex items-center gap-1.5">
                                                <Clock size={14} />
                                                {item.readMinutes} min read
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}

                    {/* Empty State */}
                    {!loading && news.length === 0 && (
                        <div className="text-center py-20">
                            <Newspaper size={48} className="mx-auto text-gray-300 mb-4" />
                            <h3 className="text-xl font-semibold text-gray-600 mb-2">No news yet</h3>
                            <p className="text-gray-400">Check back later for updates.</p>
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
}
