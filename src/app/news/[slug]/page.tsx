import React from 'react';
import ResourcePageClient from '@/components/features/ResourcePageClient';
import { FALLBACK_NEWS } from '@/data/fallbackData';

async function fetchNewsDetail(slug: string) {
  try {
    const base = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3006/api';
    const res = await fetch(`${base}/public/news/${slug}`, { next: { revalidate: 30 } });
    if (!res.ok) {
      // Fallback to local data
      const fallbackItem = FALLBACK_NEWS.find(n => n.slug === slug || n.id === slug);
      return fallbackItem || null;
    }
    const data = await res.json();
    return data?.data || null;
  } catch (e) {
    // API unreachable, use fallback
    const fallbackItem = FALLBACK_NEWS.find(n => n.slug === slug || n.id === slug);
    return fallbackItem || null;
  }
}

async function fetchRelated(category?: string, excludeSlug?: string) {
  try {
    const base = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3006/api';
    const url = new URL(`${base}/public/news`);
    url.searchParams.set('limit', '6');
    if (category) url.searchParams.set('category', category);
    const res = await fetch(url.toString(), { next: { revalidate: 30 } });
    if (!res.ok) {
      // Fallback to local data
      let items = FALLBACK_NEWS.filter(n => n.slug !== excludeSlug);
      if (category) items = items.filter(n => n.category === category);
      return items.slice(0, 6);
    }
    const data = await res.json();
    const items = data?.data?.items || [];
    return items.filter((i: any) => i.slug !== excludeSlug).slice(0, 6);
  } catch (e) {
    // API unreachable, use fallback
    let items = FALLBACK_NEWS.filter(n => n.slug !== excludeSlug);
    if (category) items = items.filter(n => n.category === category);
    return items.slice(0, 6);
  }
}

export default async function NewsDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const detail = await fetchNewsDetail(slug);
  if (!detail) {
    return (
      <div className="max-w-[960px] mx-auto px-6 py-24">
        <h1 className="text-2xl font-bold">Not Found</h1>
        <p className="text-gray-600 mt-2">The news you are looking for does not exist or has not been published.</p>
      </div>
    );
  }

  const assetBase = (process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3006/api').replace(/\/api$/, '');
  const cover = detail.featuredImage?.startsWith('/uploads/') ? `${assetBase}${detail.featuredImage}` : detail.featuredImage;

  // 映射为现有 ResourcePageClient 所需的资源结构，沿用原有页面样式
  const resource = {
    id: detail.id,
    title: detail.title,
    description: detail.excerpt || '',
    type: 'news',
    date: detail.publishDate ? new Date(detail.publishDate).toLocaleDateString() : '',
    readTime: (detail.readMinutes || 5) + ' min',
    thumbnail: cover,
    watchTime: undefined
  } as any;

  // Fetch related by same category; fall back to latest
  let relatedRaw = await fetchRelated(detail.category, detail.slug);
  if (!relatedRaw || relatedRaw.length === 0) {
    // fallback to latest when same-category has no other items
    relatedRaw = await fetchRelated(undefined, detail.slug);
  }
  const relatedAssetBase = (process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3006/api').replace(/\/api$/, '');
  const toThumb = (src?: string) => (src?.startsWith('/uploads/') ? `${relatedAssetBase}${src}` : src);
  const related = relatedRaw.map((n: any) => ({
    id: n.id,
    slug: n.slug,
    title: n.title,
    description: n.excerpt || '',
    type: 'news',
    date: n.publishDate ? new Date(n.publishDate).toLocaleDateString() : '',
    readTime: (n.readMinutes || 5) + ' min',
    thumbnail: toThumb(n.featuredImage)
  }));

  return <ResourcePageClient resource={resource} relatedResources={related} html={detail.content || ''} />;
}


