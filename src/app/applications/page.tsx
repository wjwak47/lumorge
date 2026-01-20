"use client";

import { useState, useEffect } from "react";
import { Building2, Landmark, MonitorPlay, Lightbulb, Users, Trophy, Check, Grid, ArrowRight, Filter, ChevronLeft, Star, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { applicationApi } from "@/utils/api";

// 复用ApplicationGrid中的类型和数据
type FilterType = "All" | "Indoor" | "Outdoor" | "Rental" | "Sports" | "Lighting";

const FILTERS: FilterType[] = ["All", "Indoor", "Outdoor", "Rental", "Sports", "Lighting"];

interface AppItem {
  name: string;
  desc: string;
  icon: any;
  categories: FilterType[];
  stats: {
    installations: number;
    satisfaction: number;
    energySaving: number;
  };
  benefits: string[];
  imageUrl?: string;
}

// 应用场景数据现在完全从API动态获取，不再使用静态数据
const APPLICATIONS: AppItem[] = [];

// 获取图标组件（用于过滤器）
const getIconComponent = (filter: FilterType) => {
  switch (filter) {
    case "Indoor": return Building2;
    case "Outdoor": return Landmark;
    case "Rental": return MonitorPlay;
    case "Lighting": return Lightbulb;
    case "Sports": return Trophy;
    default: return Grid;
  }
};

// 获取应用图标组件（用于应用数据）
const getAppIconComponent = (iconName: string) => {
  switch (iconName) {
    case "Building2": return Building2;
    case "Landmark": return Landmark;
    case "MonitorPlay": return MonitorPlay;
    case "Lightbulb": return Lightbulb;
    case "Users": return Users;
    case "Trophy": return Trophy;
    default: return MonitorPlay;
  }
};

// 主页面组件
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
  const [allApps, setAllApps] = useState<AppItem[]>([]);
  const [filteredApps, setFilteredApps] = useState<AppItem[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState<'api' | 'static' | 'loading'>('loading');

  // 分页配置
  const itemsPerPage = viewMode === 'grid' ? 6 : 5; // 网格视图每页6个，列表视图每页5个
  const [currentPage, setCurrentPage] = useState<number>(pageParam ? parseInt(pageParam) : 1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [paginatedApps, setPaginatedApps] = useState<AppItem[]>([]);

  // 处理页面变化
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // 更新URL参数，保留现有的category参数
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    router.push(`/applications?${params.toString()}`);

    // 滚动到页面顶部
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // 从API获取应用场景数据
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setLoading(true);
        console.log('🔍 开始获取应用场景数据...');

        const response = await applicationApi.getPublicApplications();
        console.log('📥 API响应:', response);

        if (response.success && response.data && Array.isArray(response.data)) {
          console.log(`✅ 成功获取 ${response.data.length} 个应用场景`);

          // 无论数据多少，都使用API数据（包括空数组）
          if (response.data.length === 0) {
            console.log('📝 API返回空数据，显示空状态');
            setAllApps([]);
            setDataSource('api');
          } else {
            // 转换API数据为组件需要的格式
            const formattedApps: AppItem[] = response.data.map((app: any) => ({
              name: app.name,
              desc: app.description,
              icon: getAppIconComponent(app.icon),
              categories: Array.isArray(app.categories) ? app.categories : [],
              stats: {
                installations: app.installations || 0,
                satisfaction: app.satisfaction || 95,
                energySaving: app.energySaving || 30
              },
              benefits: Array.isArray(app.benefits) ? app.benefits : [],
              imageUrl: app.imageUrl || app.thumbnailImage || 'https://images.unsplash.com/photo-1580851935978-f6b4e359da3f?auto=format&fit=crop&w=2070&q=80',
              slug: app.slug
            }));

            setAllApps(formattedApps);
            setDataSource('api');
          }
          console.log('🎉 应用场景数据设置完成');
        } else {
          console.warn('⚠️ API返回格式不正确，显示空状态');
          setAllApps([]);
          setDataSource('static');
        }
      } catch (error) {
        console.error('❌ 获取应用场景失败:', error);
        console.log('🔄 API连接失败，显示空状态而不是静态数据');
        setAllApps([]); // 显示空状态而不是静态数据
        setDataSource('static');
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  // 过滤应用程序
  useEffect(() => {
    let filtered = [];
    if (activeFilter === "All") {
      filtered = allApps;
    } else {
      filtered = allApps.filter(app => app.categories.includes(activeFilter));
    }
    setFilteredApps(filtered);

    // 重置到第一页当过滤器改变时
    setCurrentPage(1);

    // 计算总页数
    setTotalPages(Math.ceil(filtered.length / itemsPerPage));
  }, [activeFilter, allApps]);

  // 当视图模式改变时，重新计算分页
  useEffect(() => {
    setTotalPages(Math.ceil(filteredApps.length / itemsPerPage));
  }, [viewMode, filteredApps, itemsPerPage]);

  // 应用分页
  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setPaginatedApps(filteredApps.slice(startIndex, endIndex));
  }, [currentPage, filteredApps, itemsPerPage]);

  // 当过滤器改变时，更新URL参数
  const updateFilter = (filter: FilterType) => {
    setActiveFilter(filter);

    // 更新URL参数
    const params = new URLSearchParams(searchParams.toString());
    if (filter === "All") {
      params.delete('category');
    } else {
      params.set('category', filter);
    }
    params.delete('page'); // 重置页码
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

          <h1 className="text-4xl md:text-5xl font-bold mb-6">Sports Venue Solutions</h1>
          <p className="text-xl text-blue-100 max-w-3xl">
            Browse our comprehensive range of technology solutions designed specifically for sports venues, events, and organizations.
          </p>

          {/* 数据来源指示器 */}
          <div className="mt-6 text-sm">
            {dataSource === 'loading' && (
              <span className="text-blue-200">⏳ 正在加载数据...</span>
            )}
            {dataSource === 'api' && (
              <span className="text-green-300">✅ Data source: Backend API</span>
            )}
            {dataSource === 'static' && (
              <span className="text-orange-300">⚠️ Data source: Static fallback (API connection failed)</span>
            )}
          </div>

          {/* 搜索栏 */}
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
              ? "Browse our full range of venue technology solutions"
              : `Specialized solutions for ${activeFilter.toLowerCase()} venues and applications`
            }
          </p>
        </div>

        {/* 应用列表 */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {paginatedApps.map((app) => (
              <AnimatedSection
                key={app.name}
                threshold={0.1}
                className="h-full"
              >
                <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden h-full flex flex-col hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  {/* 卡片图片 */}
                  <div className="h-56 relative overflow-hidden">
                    {app.imageUrl && (
                      <>
                        <img
                          src={app.imageUrl}
                          alt={app.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 to-transparent"></div>
                      </>
                    )}

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
                                <Star key={`star-${star}`} size={12} className="text-yellow-400 fill-yellow-400" />
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
                      {app.categories.map(category => (
                        <span key={category} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-md">
                          {category}
                        </span>
                      ))}
                    </div>

                    <p className="text-slate-600 mb-5 flex-grow">{app.desc}</p>

                    <div className="mb-5">
                      <h4 className="text-sm uppercase font-semibold text-slate-500 mb-3">Key Benefits</h4>
                      <ul className="space-y-2">
                        {app.benefits.map((benefit, i) => (
                          <li key={i} className="flex items-start">
                            <span className="flex-shrink-0 text-blue-600 mr-2 mt-1">
                              <Check size={15} />
                            </span>
                            <span className="text-sm text-slate-700">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
                      <div>
                        <span className="text-sm text-slate-500">{app.stats.installations}+ Installations</span>
                      </div>
                      <Link
                        href={`/applications/${(app as any).slug || app.name.toLowerCase().replace(/\s+/g, '-')}`}
                        className="inline-flex items-center text-blue-600 font-medium hover:text-blue-700"
                      >
                        View Details
                        <ArrowRight size={16} className="ml-1" />
                      </Link>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            {paginatedApps.map((app) => (
              <AnimatedSection
                key={app.name}
                threshold={0.1}
                className="w-full"
              >
                <div className="bg-white rounded-xl shadow-md border border-slate-100 overflow-hidden hover:shadow-lg transition-all duration-300">
                  <div className="flex flex-col md:flex-row">
                    {/* 图片区域 */}
                    <div className="md:w-1/3 h-48 md:h-auto relative">
                      {app.imageUrl && (
                        <img
                          src={app.imageUrl}
                          alt={app.name}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>

                    {/* 内容区域 */}
                    <div className="p-6 md:w-2/3">
                      <div className="flex flex-wrap gap-2 mb-2">
                        {app.categories.map(category => (
                          <span key={category} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-md">
                            {category}
                          </span>
                        ))}
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
                          <span className="text-sm font-medium">{app.benefits.length} Key Benefits</span>
                        </div>
                        <Link
                          href={`/applications/${(app as any).slug || app.name.toLowerCase().replace(/\s+/g, '-')}`}
                          className="inline-flex items-center text-blue-600 font-medium hover:text-blue-700"
                        >
                          View Details
                          <ArrowRight size={16} className="ml-1" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
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
                {[...Array(totalPages)].map((_, idx) => {
                  const pageNum = idx + 1;
                  // 显示最多5个页码按钮，其他使用省略号
                  if (
                    pageNum === 1 ||
                    pageNum === totalPages ||
                    (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
                  ) {
                    return (
                      <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        className={`min-w-[40px] h-10 px-3 rounded-lg ${currentPage === pageNum
                            ? 'bg-blue-600 text-white font-medium'
                            : 'text-slate-700 border border-slate-300 hover:bg-slate-50'
                          }`}
                      >
                        {pageNum}
                      </button>
                    );
                  } else if (
                    (pageNum === 2 && currentPage > 3) ||
                    (pageNum === totalPages - 1 && currentPage < totalPages - 2)
                  ) {
                    return <span key={pageNum} className="px-1">...</span>;
                  }
                  return null;
                })}
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
            Our team of experts can design a tailored technology package for your specific venue or event requirements.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/contact"
              className="px-8 py-3 bg-white text-blue-900 font-medium rounded-lg hover:bg-blue-50"
            >
              Contact Sales Team
            </Link>
            <Link
              href="/solutions/custom"
              className="px-8 py-3 border-2 border-white/30 text-white font-medium rounded-lg hover:bg-white/10"
            >
              Explore Custom Options
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 