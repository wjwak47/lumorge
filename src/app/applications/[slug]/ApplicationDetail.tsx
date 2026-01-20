"use client";

import Link from "next/link";
import { ChevronLeft, Check, ArrowRight, Star, Trophy, Building2, MonitorPlay, Landmark, Lightbulb } from "lucide-react";
import { FALLBACK_APPLICATIONS } from "@/data/fallbackData";

interface Application {
  id: string;
  name: string;
  title: string;
  summary: string;
  description: string;
  category: string;
  image: string;
  imageUrl: string;
  installations?: number;
  satisfaction?: number;
  benefits?: string[];
}

// 获取图标
const getIconComponent = (category: string) => {
  switch (category) {
    case "Sports Venues": return Trophy;
    case "Retail": return Building2;
    case "Entertainment": return MonitorPlay;
    case "Corporate": return Landmark;
    case "Advertising": return Lightbulb;
    case "Media": return MonitorPlay;
    default: return MonitorPlay;
  }
};

export default function ApplicationDetail({ application }: { application: Application }) {
  const IconComponent = getIconComponent(application.category);

  // 获取相关应用
  const relatedApps = FALLBACK_APPLICATIONS
    .filter(app => app.id !== application.id)
    .slice(0, 3);

  // 默认特性
  const features = [
    { title: "High Resolution Display", desc: "Crystal clear 4K/8K resolution for stunning visuals" },
    { title: "Weather Resistant", desc: "IP65 rated for all weather conditions" },
    { title: "Remote Management", desc: "Cloud-based content management system" },
    { title: "Energy Efficient", desc: "Smart power management for reduced costs" },
  ];

  // 默认规格
  const specs = [
    ["Pixel Pitch", "P2.5 - P10"],
    ["Brightness", "5000-8000 nits"],
    ["Refresh Rate", "≥3840Hz"],
    ["Viewing Angle", "160°"],
    ["IP Rating", "IP65"],
    ["Lifespan", "100,000 hours"],
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* 头部区域 */}
      <div
        className="pt-32 pb-20 bg-cover bg-center relative"
        style={{ backgroundImage: `url(${application.imageUrl || application.image})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 to-blue-900/70"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="flex items-center mb-6">
            <Link href="/applications" className="text-blue-200 hover:text-white flex items-center">
              <ChevronLeft size={16} className="mr-1" />
              Back to All Solutions
            </Link>
          </div>

          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-blue-600/20 backdrop-blur-sm text-blue-100 text-sm font-medium rounded-md border border-blue-600/30">
              {application.category}
            </span>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <div className="p-4 rounded-lg bg-white/10 backdrop-blur-sm">
              <IconComponent size={28} className="text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white">{application.name}</h1>
          </div>

          <p className="text-xl text-blue-100 max-w-3xl mb-10">
            {application.summary || application.description}
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <div className="text-blue-200 mb-1 text-sm">Installations</div>
              <div className="text-white text-2xl font-bold">{application.installations || 100}+</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <div className="text-blue-200 mb-1 text-sm">Satisfaction</div>
              <div className="text-white text-2xl font-bold">{application.satisfaction || 95}%</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <div className="text-blue-200 mb-1 text-sm">Rating</div>
              <div className="text-white text-2xl font-bold flex items-center gap-1">
                4.9 <Star size={18} className="fill-yellow-400 text-yellow-400" />
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <div className="text-blue-200 mb-1 text-sm">Key Benefits</div>
              <div className="text-white text-2xl font-bold">{application.benefits?.length || 3}</div>
            </div>
          </div>
        </div>
      </div>

      {/* 主要内容区域 */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* 左侧主要内容 */}
          <div className="lg:col-span-2">
            {/* Overview */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-8 mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Overview</h2>
              <p className="text-slate-600 mb-6">
                {application.summary || application.description}
              </p>
              <p className="text-slate-600 mb-6">
                Our {application.name} solution provides comprehensive LED display infrastructure
                designed specifically for {application.category.toLowerCase()} applications.
                From installation to maintenance, we offer end-to-end solutions that enhance
                both operational efficiency and visual impact.
              </p>

              {application.benefits && application.benefits.length > 0 && (
                <div className="mt-10">
                  <h3 className="text-xl font-bold text-slate-900 mb-4">Key Benefits</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6">
                    {application.benefits.map((benefit, idx) => (
                      <div key={`benefit-${idx}`} className="flex items-start">
                        <div className="flex-shrink-0 p-1 bg-blue-100 text-blue-600 rounded-full mr-3 mt-1">
                          <Check size={16} />
                        </div>
                        <p className="text-slate-700">{benefit}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Features */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Key Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {features.map((feature, idx) => (
                  <div
                    key={`feature-${idx}`}
                    className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 hover:shadow-md transition-shadow"
                  >
                    <h3 className="text-lg font-bold text-slate-900 mb-2">{feature.title}</h3>
                    <p className="text-slate-600 text-sm">{feature.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Technical Specs */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Technical Specifications</h2>
              <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {specs.map(([key, value], idx) => (
                    <div key={`spec-${idx}`} className="flex justify-between py-3 border-b border-slate-100">
                      <span className="text-slate-600">{key}</span>
                      <span className="text-slate-900 font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 右侧边栏 */}
          <div className="lg:col-span-1">
            <div className="sticky top-32">
              <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 mb-8">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Request Information</h3>
                <p className="text-slate-600 text-sm mb-6">
                  Contact our sales team to learn more about our {application.name} solution.
                </p>

                <Link
                  href="/contact"
                  className="block w-full py-3 bg-blue-600 text-white text-center rounded-lg font-medium hover:bg-blue-700 transition-colors mb-3"
                >
                  Contact Sales
                </Link>

                <button className="w-full py-3 border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition-colors">
                  Download Brochure
                </button>
              </div>

              {/* Related Solutions */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Related Solutions</h3>
                <div className="space-y-4">
                  {relatedApps.map((app) => (
                    <Link
                      key={app.id}
                      href={`/applications/${app.id}`}
                      className="block group"
                    >
                      <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors">
                        <div className="w-16 h-12 rounded-lg overflow-hidden flex-shrink-0">
                          <img
                            src={app.imageUrl || app.image}
                            alt={app.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-grow">
                          <h4 className="font-medium text-slate-900 group-hover:text-blue-600 transition-colors text-sm">
                            {app.name}
                          </h4>
                          <span className="text-xs text-slate-500">{app.category}</span>
                        </div>
                        <ArrowRight size={16} className="text-slate-400 group-hover:text-blue-600 transition-colors" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-br from-blue-900 to-slate-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-10">
            Let's discuss how our {application.name} solution can transform your space.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/contact"
              className="px-8 py-3 bg-white text-blue-900 font-medium rounded-lg hover:bg-blue-50"
            >
              Contact Sales Team
            </Link>
            <Link
              href="/products"
              className="px-8 py-3 border-2 border-white/30 text-white font-medium rounded-lg hover:bg-white/10"
            >
              Browse Products
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}