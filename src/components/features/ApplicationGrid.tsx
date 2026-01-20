"use client";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { FALLBACK_APPLICATIONS } from "@/data/fallbackData";

const APPS = FALLBACK_APPLICATIONS.map(app => ({
  name: app.name || app.title,
  slug: app.slug || app.id,
  description: app.description || '',
  imageUrl: app.imageUrl || app.image
}));

export default function ApplicationGrid() {
  const [featured, ...others] = APPS.slice(0, 5);

  return (
    <section id="application" className="w-full py-16 md:py-20 bg-[#FAFBFD]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0A1628] mb-3 tracking-tight">
              Built for Every Venue
            </h2>
            <p className="text-[#64748B] text-base max-w-xl">
              LED display solutions that adapt to any environment
            </p>
          </div>
          <Link
            href="/applications"
            className="inline-flex items-center text-[#2563EB] font-medium hover:gap-2 transition-all"
          >
            View all
            <ArrowRight size={16} className="ml-1" />
          </Link>
        </div>

        {/* 左大右列表布局 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 左侧 - 特色大图 */}
          <Link
            href={`/applications/${featured.slug}`}
            className="group relative aspect-[4/3] rounded-2xl overflow-hidden"
          >
            <img
              src={featured.imageUrl}
              alt={featured.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-medium rounded-full mb-3">
                FEATURED
              </span>
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#60A5FA] transition-colors">
                {featured.name}
              </h3>
              <p className="text-white/70 text-sm line-clamp-2">{featured.description}</p>
            </div>
          </Link>

          {/* 右侧 - 列表 */}
          <div className="flex flex-col gap-3">
            {others.map((app, index) => (
              <Link
                key={app.slug}
                href={`/applications/${app.slug}`}
                className="group flex items-center gap-4 p-4 bg-white rounded-xl hover:shadow-md transition-all"
              >
                <span className="text-3xl font-bold text-[#E2E8F0] group-hover:text-[#2563EB] transition-colors w-8">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src={app.imageUrl}
                    alt={app.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-semibold text-[#0A1628] mb-0.5 line-clamp-1 group-hover:text-[#2563EB] transition-colors">
                    {app.name}
                  </h3>
                  <p className="text-sm text-[#64748B] line-clamp-1">{app.description}</p>
                </div>
                <ArrowRight size={18} className="text-[#CBD5E1] group-hover:text-[#2563EB] transition-colors flex-shrink-0" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}