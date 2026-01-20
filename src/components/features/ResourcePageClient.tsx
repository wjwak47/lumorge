"use client";
import { ArrowLeft, Calendar, Clock, ChevronRight, Share2, Play } from 'lucide-react';
import Link from 'next/link';
import { Resource } from '@/data/resources';
import PageHero from '@/components/features/PageHero';
import VideoPlayer from '@/components/ui/VideoPlayer';

interface ResourcePageClientProps {
  resource: Resource;
  relatedResources: Resource[];
  html?: string; // 富文本HTML内容（来自后端），优先展示
}

export default function ResourcePageClient({ resource, relatedResources, html }: ResourcePageClientProps) {
  const isVideo = resource.type === 'blog';
  const useWatchTime = false;

  return (
    <div className="min-h-screen pt-20">
      <PageHero
        title={resource.title}
        subtitle={resource.description.substring(0, 100) + (resource.description.length > 100 ? '...' : '')}
        background="bg-gradient-to-r from-[#0A1F44] to-[#0052CC]"
      />

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-[1200px]">
          {/* 两栏布局：正文 + 侧栏 */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* 正文区域 */}
            <div className="lg:col-span-8">
              <div className="mb-6">
                <Link href="/resources" className="inline-flex items-center text-[#0052CC] hover:underline">
                  <ArrowLeft size={16} className="mr-2" />
                  Back to Resources
                </Link>
              </div>

              <div className="flex items-center mb-6 text-[#718096]">
                <div className="flex items-center">
                  <Calendar size={16} className="flex-shrink-0 mr-1" />
                  <span>{resource.date}</span>
                  <span className="mx-2">•</span>
                  <Clock size={16} className="flex-shrink-0 mr-1" />
                  <span>{resource.readTime || '5 min'}</span>
                </div>
              </div>

              {isVideo && (
                <div className="mb-8 rounded-xl overflow-hidden shadow-xl">
                  <VideoPlayer title={resource.title} thumbnail={resource.thumbnail || ''} duration={resource.watchTime} />
                </div>
              )}

              {!isVideo && resource.thumbnail && (
                <div className="mb-8 rounded-xl overflow-hidden shadow-xl">
                  <img src={resource.thumbnail} alt={resource.title} className="w-full h-auto" />
                </div>
              )}

              <div className="prose max-w-none">
                <h2 className="text-2xl font-bold text-[#0A1F44] mb-6">{resource.title}</h2>
                {html ? <div dangerouslySetInnerHTML={{ __html: html }} /> : <p className="text-[#4A5568] mb-6">{resource.description}</p>}
              </div>
            </div>

            {/* 侧栏相关推荐 */}
            {relatedResources.length > 0 && (
              <aside className="lg:col-span-4 lg:sticky lg:top-24 lg:self-start">
                <h3 className="text-sm font-semibold tracking-wide text-[#0A1F44] mb-3">Related News</h3>
                <div className="space-y-3 max-h-[60vh] overflow-auto pr-1">
                  {relatedResources.slice(0, 6).map((related) => (
                    <Link key={related.id} href={related.slug ? `/news/${related.slug}` : `/resources/${related.id}`} className="block">
                      <div className="flex items-center gap-3 p-2 rounded-lg border border-[#E2E8F0] bg-white hover:shadow-sm hover:-translate-y-0.5 transition-all">
                        {related.thumbnail ? (
                          <img src={related.thumbnail} alt={related.title} className="w-16 h-16 rounded-md object-cover flex-shrink-0" />
                        ) : (
                          <div className="w-16 h-16 rounded-md bg-gray-100 flex-shrink-0" />
                        )}
                        <div className="min-w-0">
                          <div className="text-sm font-semibold text-[#0A1F44] leading-5 line-clamp-2">{related.title}</div>
                          <div className="mt-1 flex items-center text-[11px] text-[#718096]">
                            <Calendar size={12} className="mr-1" />
                            <span className="truncate">{related.date}</span>
                            <span className="mx-1">•</span>
                            <Clock size={12} className="mr-1" />
                            <span>{related.readTime || '5 min'}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </aside>
            )}
          </div>

          {/* 小屏下的相关推荐：两列卡片，避免太长 */}
          {relatedResources.length > 0 && (
            <div className="mt-10 lg:hidden">
              <h3 className="text-sm font-semibold tracking-wide text-[#0A1F44] mb-3">Related News</h3>
              <div className="grid grid-cols-2 gap-3">
                {relatedResources.slice(0, 4).map((related) => (
                  <Link key={related.id} href={related.slug ? `/news/${related.slug}` : `/resources/${related.id}`} className="block">
                    <div className="rounded-lg overflow-hidden border border-[#E2E8F0] bg-white">
                      {related.thumbnail && (
                        <img src={related.thumbnail} alt={related.title} className="w-full h-24 object-cover" />
                      )}
                      <div className="p-2">
                        <div className="text-[13px] font-semibold text-[#0A1F44] line-clamp-2">{related.title}</div>
                        <div className="mt-1 flex items-center text-[10px] text-[#718096]">
                          <Calendar size={10} className="mr-1" />
                          <span className="truncate">{related.date}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}