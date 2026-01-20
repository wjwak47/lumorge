"use client";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { FALLBACK_APPLICATIONS } from "@/data/fallbackData";

// 直接使用静态数据
const APPS = FALLBACK_APPLICATIONS.map(app => ({
  name: app.name || app.title,
  slug: app.slug || app.id,
  imageUrl: app.imageUrl || app.image
}));

export default function ApplicationGrid() {
  return (
    <section id="application" className="w-full py-32 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#0A1628] mb-4 tracking-tight">
            Built for Every Venue
          </h2>
          <p className="text-[#64748B] text-lg max-w-xl mx-auto">
            LED display solutions that adapt to any environment
          </p>
        </div>

        {/* Application Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {APPS.map((app) => (
            <Link
              key={app.name}
              href={`/applications/${app.slug}`}
              className="group block"
            >
              <div className="relative aspect-[3/2] rounded-2xl overflow-hidden">
                {/* Image */}
                <img
                  src={app.imageUrl}
                  alt={app.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=800';
                  }}
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                {/* Content overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-xl font-semibold text-white mb-1">
                    {app.name}
                  </h3>
                  <span className="inline-flex items-center text-sm text-white/80 group-hover:text-white transition-colors">
                    Explore
                    <ArrowRight size={14} className="ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <Link
            href="/applications"
            className="inline-flex items-center px-8 py-4 bg-[#0A1628] text-white font-medium rounded-full hover:bg-[#1E293B] transition-all duration-300 hover:shadow-lg"
          >
            View All Solutions
            <ArrowRight size={16} className="ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
}