"use client";

import { useState, useEffect, useMemo } from "react";
import { Building2, Landmark, MonitorPlay, Lightbulb, Trophy, Check, Grid, ArrowRight, Filter, ChevronLeft, Star, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { FALLBACK_APPLICATIONS } from "@/data/fallbackData";

// 分类过滤类型
type FilterType = "All" | "Sports Venues" | "Retail" | "Entertainment" | "Corporate" | "Advertising" | "Media";

const FILTERS: FilterType[] = ["All", "Sports Venues", "Retail", "Entertainment", "Corporate", "Advertising", "Media"];

// 获取图标
const getIconComponent = (category: string) => {
  switch (category) {
    case "Sports Venues": return Trophy;
    case "Retail": return Building2;
    case "Entertainment": return MonitorPlay;
    case "Corporate": return Landmark;
    case "Advertising": return Lightbulb;
    case "Media": return MonitorPlay;
    default: return Grid;
  }
};

export default function ApplicationsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');
  const pageParam = searchParams.get('page');

  const [activeFilter, setActiveFilter] = useState<FilterType>(
    categoryParam && FILTERS.includes(categoryParam as FilterType)
      ? (categoryParam as FilterType)
      : "All"
  );
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState<number>(pageParam ? parseInt(pageParam) : 1);

  // 分页配置
  const itemsPerPage = viewMode === 'grid' ? 6 : 5;

  // 使用真实数据
  const allApps = useMemo(() => {
    return FALLBACK_APPLICATIONS.map(app => ({
      ...app,
      icon: getIconComponent(app.category),
      desc: app.summary || app.description,
      categories: [app.category],
      stats: {
        installations: app.installations || 100,
        satisfaction: app.satisfaction || 95,
        energySaving: 30
      },
      benefits: app.benefits || []
    }));
  }, []);

  // 过滤数据
  const filteredApps = useMemo(() => {
    if (activeFilter === "All") {
      return allApps;
    }
    return allApps.filter(app => app.category === activeFilter);
  }, [activeFilter, allApps]);

  // 分页
  const totalPages = Math.ceil(filteredApps.length / itemsPerPage);
  const paginatedApps = filteredApps.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // 处理页面变化
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    router.push(`/applications?${params.toString()}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 更新过滤器
  const updateFilter = (filter: FilterType) => {
    setActiveFilter(filter);
    setCurrentPage(1);
    const params = new URLSearchParams(searchParams.toString());
    if (filter === "All") {
      params.delete('category');
    } else {
      params.set('category', filter);
    }
    params.delete('page');
    router.push(`/applications?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* 页面头部 */}
      <div className="bg-gradient-to-b from-slate-900 to-blue-900 text-white pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center mb-6">
            <Link href="/" className="text-blue-200 hover:text-white flex items-center">
              <ChevronLeft size={16} className="mr-1" />
              Back to Home
            </Link>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-6">LED Application Solutions</h1>
          <p className="text-xl text-blue-100 max-w-3xl">
            Discover our comprehensive range of LED display solutions designed for various industries and applications.
          </p>

          {/* 统计数据 */}
          <div className="mt-12 flex flex-col md:flex-row items-stretch gap-4">
            <div className="flex-grow">
              <div className="bg-white/10 rounded-lg backdrop-blur-sm border border-white/20 p-4 h-full">
                <div className="text-sm text-blue-200 mb-2">Total Solutions</div>
                <div className="text-3xl font-bold">{allApps.length}</div>
              </div>
            </div>
            <div className="flex-grow">
              <div className="bg-white/10 rounded-lg backdrop-blur-sm border border-white/20 p-4 h-full">
                <div className="text-sm text-blue-200 mb-2">Satisfied Clients</div>
                <div className="text-3xl font-bold">500+</div>
              </div>
            </div>
            <div className="flex-grow">
              <div className="bg-white/10 rounded-lg backdrop-blur-sm border border-white/20 p-4 h-full">
                <div className="text-sm text-blue-200 mb-2">Global Installations</div>
                <div className="text-3xl font-bold">1200+</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 过滤器 */}
      <div className="sticky top-20 z-20 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="py-4 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center">
              <Filter size={18} className="text-slate-400 mr-3" />
              <div className="flex flex-wrap items-center gap-2">
                {FILTERS.map((filter) => {
                  const IconComponent = getIconComponent(filter);
                  return (
                    <button
                      key={filter}
                      onClick={() => updateFilter(filter)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center ${activeFilter === filter
                          ? "bg-blue-600 text-white"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                        }`}
                    >
                      <IconComponent size={16} className="mr-2" />
                      {filter}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 视图切换 */}
            <div className="flex items-center bg-slate-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-white shadow-sm' : 'text-slate-600'}`}
              >
                <Grid size={16} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${viewMode === 'list' ? 'bg-white shadow-sm' : 'text-slate-600'}`}
              >
                <div className="flex flex-col gap-1">
                  <div className="h-0.5 w-4 bg-current"></div>
                  <div className="h-0.5 w-4 bg-current"></div>
                  <div className="h-0.5 w-4 bg-current"></div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 主内容区域 */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900">
            {activeFilter === "All"
              ? "All Solutions"
              : `${activeFilter} Solutions (${filteredApps.length})`
            }
          </h2>
          <p className="text-slate-600 mt-2">
            {activeFilter === "All"
              ? "Browse our full range of LED display solutions"
              : `Specialized solutions for ${activeFilter.toLowerCase()}`
            }
          </p>
        </div>

        {/* 应用列表 - 网格视图 */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {paginatedApps.map((app) => (
              <div key={app.id} className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden h-full flex flex-col hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                {/* 卡片图片 */}
                <div className="h-56 relative overflow-hidden">
                  <img
                    src={app.imageUrl || app.image}
                    alt={app.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 to-transparent"></div>

                  <div className="absolute bottom-0 left-0 w-full p-5 text-white">
                    <div className="flex items-start">
                      <div className="mr-4 p-3 rounded-lg bg-white/10 backdrop-blur-sm">
                        <app.icon size={20} className="text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold">{app.name}</h3>
                        <div className="flex items-center mt-1">
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star key={`star-${app.id}-${star}`} size={12} className="text-yellow-400 fill-yellow-400" />
                            ))}
                          </div>
                          <span className="ml-2 text-xs text-white/80">{app.stats.satisfaction}% Satisfaction</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 卡片内容 */}
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-md">
                      {app.category}
                    </span>
                  </div>

                  <p className="text-slate-600 mb-5 flex-grow">{app.desc}</p>

                  {app.benefits && app.benefits.length > 0 && (
                    <div className="mb-5">
                      <h4 className="text-sm uppercase font-semibold text-slate-500 mb-3">Key Benefits</h4>
                      <ul className="space-y-2">
                        {app.benefits.slice(0, 3).map((benefit, i) => (
                          <li key={`benefit-${app.id}-${i}`} className="flex items-start">
                            <span className="flex-shrink-0 text-blue-600 mr-2 mt-1">
                              <Check size={15} />
                            </span>
                            <span className="text-sm text-slate-700">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
                    <div>
                      <span className="text-sm text-slate-500">{app.stats.installations}+ Installations</span>
                    </div>
                    <Link
                      href={`/applications/${app.id}`}
                      className="inline-flex items-center text-blue-600 font-medium hover:text-blue-700"
                    >
                      View Details
                      <ArrowRight size={16} className="ml-1" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* 列表视图 */
          <div className="space-y-6">
            {paginatedApps.map((app) => (
              <div key={app.id} className="bg-white rounded-xl shadow-md border border-slate-100 overflow-hidden hover:shadow-lg transition-all duration-300">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/3 h-48 md:h-auto relative">
                    <img
                      src={app.imageUrl || app.image}
                      alt={app.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="p-6 md:w-2/3">
                    <div className="flex flex-wrap gap-2 mb-2">
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-md">
                        {app.category}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 mb-2">{app.name}</h3>
                    <p className="text-slate-600 mb-4">{app.desc}</p>

                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="p-3 bg-slate-50 rounded-lg">
                        <div className="text-xs text-slate-500 mb-1">Installations</div>
                        <div className="font-bold">{app.stats.installations}+</div>
                      </div>
                      <div className="p-3 bg-slate-50 rounded-lg">
                        <div className="text-xs text-slate-500 mb-1">Satisfaction</div>
                        <div className="font-bold">{app.stats.satisfaction}%</div>
                      </div>
                      <div className="p-3 bg-slate-50 rounded-lg">
                        <div className="text-xs text-slate-500 mb-1">Energy Saving</div>
                        <div className="font-bold">{app.stats.energySaving}%</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100">
                      <div className="flex items-center">
                        <app.icon size={18} className="text-blue-600 mr-2" />
                        <span className="text-sm font-medium">{app.benefits?.length || 0} Key Benefits</span>
                      </div>
                      <Link
                        href={`/applications/${app.id}`}
                        className="inline-flex items-center text-blue-600 font-medium hover:text-blue-700"
                      >
                        View Details
                        <ArrowRight size={16} className="ml-1" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 分页控件 */}
        {filteredApps.length > 0 && totalPages > 1 && (
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
            <div className="flex items-center gap-1">
              <button
                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className={`p-2 rounded-lg border ${currentPage === 1
                    ? 'text-slate-400 border-slate-200 cursor-not-allowed'
                    : 'text-blue-600 border-blue-200 hover:bg-blue-50'
                  }`}
              >
                <ChevronLeft size={18} />
              </button>

              <div className="flex items-center gap-1 mx-1">
                {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((pageNum) => (
                  <button
                    key={`page-${pageNum}`}
                    onClick={() => handlePageChange(pageNum)}
                    className={`min-w-[40px] h-10 px-3 rounded-lg ${currentPage === pageNum
                        ? 'bg-blue-600 text-white font-medium'
                        : 'text-slate-700 border border-slate-300 hover:bg-slate-50'
                      }`}
                  >
                    {pageNum}
                  </button>
                ))}
              </div>

              <button
                onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className={`p-2 rounded-lg border ${currentPage === totalPages
                    ? 'text-slate-400 border-slate-200 cursor-not-allowed'
                    : 'text-blue-600 border-blue-200 hover:bg-blue-50'
                  }`}
              >
                <ChevronRight size={18} />
              </button>
            </div>

            <div className="text-sm text-slate-500">
              Page {currentPage} of {totalPages} ({filteredApps.length} total items)
            </div>
          </div>
        )}

        {/* 没有结果时显示 */}
        {filteredApps.length === 0 && (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">No solutions found</h3>
            <p className="text-slate-600 mb-8">No solutions match your current filter criteria</p>
            <button
              onClick={() => updateFilter("All")}
              className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700"
            >
              View All Solutions
            </button>
          </div>
        )}
      </div>

      {/* 咨询部分 */}
      <div className="bg-gradient-to-br from-blue-900 to-slate-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Need a Custom Solution?</h2>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-10">
            Our team of experts can design a tailored LED solution for your specific requirements.
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