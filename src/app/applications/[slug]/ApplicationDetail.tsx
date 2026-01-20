"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Building2, Landmark, MonitorPlay, Lightbulb, Users, Trophy, Check, ChevronLeft, Star, Map, Clock, Badge, ThumbsUp, BarChart, FileText, ArrowRight, PanelRight, Settings, Box, Shield, Wifi, Zap } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { applicationApi } from "@/utils/api";

// 使用与应用程序列表页相同的类型和数据
type FilterType = "All" | "Indoor" | "Outdoor" | "Rental" | "Sports" | "Lighting";

interface AppItem {
  id?: number;
  name: string;
  slug?: string;
  desc?: string;
  description?: string;
  icon: any;
  categories: FilterType[];
  stats?: {
    installations: number;
    satisfaction: number;
    energySaving: number;
  };
  installations?: number;
  satisfaction?: number;
  energySaving?: number;
  benefits: string[];
  keyFeatures?: Array<{
    title: string;
    description: string;
    icon: string;
  }>;
  imageUrl?: string;
  detailedDescription?: string;
  technicalSpecs?: Record<string, string>;
  caseStudies?: Array<{
    venue: string;
    location: string;
    capacity: string;
    features: string[];
  }>;
  galleryImages?: string[];
}

const APPLICATIONS: AppItem[] = [
  {
    name: "Indoor Arenas",
    desc: "Complete technological solutions for stadiums, sports halls, gymnasiums and indoor event spaces.",
    icon: Building2,
    categories: ["Indoor"],
    stats: {
      installations: 200,
      satisfaction: 98,
      energySaving: 40,
    },
    benefits: [
      "Optimized acoustics for perfect sound",
      "Climate-controlled environment",
      "Integrated crowd management",
      "Premium hospitality solutions"
    ],
    imageUrl: "https://images.unsplash.com/photo-1580851935978-f6b4e359da3f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  },
  {
    name: "Outdoor Venues",
    desc: "Weather-resistant technology designed for stadiums, fields, and open-air event spaces.",
    icon: Landmark,
    categories: ["Outdoor"],
    stats: {
      installations: 150,
      satisfaction: 96,
      energySaving: 35,
    },
    benefits: [
      "Weather-resistant installations",
      "High-brightness displays",
      "Robust connectivity solutions",
      "Sustainable power options"
    ],
    imageUrl: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  },
  {
    name: "Rental Events",
    desc: "Flexible, temporary installations for sporting events, tournaments, and competitions.",
    icon: MonitorPlay,
    categories: ["Rental"],
    stats: {
      installations: 300,
      satisfaction: 95,
      energySaving: 25,
    },
    benefits: [
      "Rapid setup and dismantling",
      "Scalable to event size",
      "Technical support included",
      "Transportation logistics handled"
    ],
    imageUrl: "https://images.unsplash.com/photo-1569517282132-25d22f4573e6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1953&q=80"
  },
  {
    name: "Lighting Solutions",
    desc: "Energy-efficient lighting systems for perfect illumination in any sports environment.",
    icon: Lightbulb,
    categories: ["Lighting", "Indoor", "Outdoor"],
    stats: {
      installations: 250,
      satisfaction: 97,
      energySaving: 60,
    },
    benefits: [
      "Broadcast-quality illumination",
      "Dynamic lighting effects",
      "Energy consumption monitoring",
      "Automated control systems"
    ],
    imageUrl: "https://images.unsplash.com/photo-1504648942599-7c7f60c5e215?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
  },
  {
    name: "Community Venues",
    desc: "Affordable technology packages for local sports clubs and community recreation centers.",
    icon: Users,
    categories: ["Indoor", "Sports"],
    stats: {
      installations: 180,
      satisfaction: 99,
      energySaving: 45,
    },
    benefits: [
      "Cost-effective solutions",
      "Simplified control interfaces",
      "Community engagement features",
      "Multi-sport adaptability"
    ],
    imageUrl: "https://images.unsplash.com/photo-1523294557-3637e1db3f33?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  },
  {
    name: "Sports Partnerships",
    desc: "End-to-end technology solutions for professional sports leagues, teams and organizations.",
    icon: Trophy,
    categories: ["Sports"],
    stats: {
      installations: 120,
      satisfaction: 99,
      energySaving: 35,
    },
    benefits: [
      "Fan engagement technologies",
      "Team performance analytics",
      "Branded content solutions",
      "VIP experience enhancements"
    ],
    imageUrl: "https://images.unsplash.com/photo-1471295253337-3ceaaedca402?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2068&q=80"
  },
];

// 获取图标组件
const getIconComponent = (iconName: string) => {
  switch(iconName) {
    case "Building2": return Building2;
    case "Landmark": return Landmark;
    case "MonitorPlay": return MonitorPlay;
    case "Lightbulb": return Lightbulb;
    case "Users": return Users;
    case "Trophy": return Trophy;
    default: return MonitorPlay;
  }
};

// 获取统计数据的辅助函数
const getStats = (solution: AppItem) => {
  if (solution.stats) {
    return solution.stats;
  }
  return {
    installations: solution.installations || 0,
    satisfaction: solution.satisfaction || 95,
    energySaving: solution.energySaving || 30
  };
};

// 模拟相关产品数据
const getRelatedSolutions = (currentSolution: AppItem, allApps: AppItem[] = APPLICATIONS) => {
  return allApps
    .filter(app => 
      app.name !== currentSolution.name && 
      app.categories.some(cat => currentSolution.categories.includes(cat))
    )
    .slice(0, 3);
};

// 获取图标组件的辅助函数
const getFeatureIconComponent = (iconName: string) => {
  const iconMap: Record<string, any> = {
    'BarChart': BarChart,
    'Settings': Settings,
    'PanelRight': PanelRight,
    'Box': Box,
    'FileText': FileText,
    'Shield': Shield,
    'Wifi': Wifi,
    'Zap': Zap,
    'MonitorPlay': MonitorPlay,
    'Lightbulb': Lightbulb
  };
  return iconMap[iconName] || BarChart;
};

// 获取Key Features数据（优先使用API数据，否则使用默认数据）
const getKeyFeatures = (solution: AppItem) => {
  // 如果有API数据的keyFeatures，使用它们
  if ((solution as any).keyFeatures && Array.isArray((solution as any).keyFeatures) && (solution as any).keyFeatures.length > 0) {
    return (solution as any).keyFeatures.map((feature: any) => ({
      title: feature.title,
      description: feature.description,
      icon: getFeatureIconComponent(feature.icon)
    }));
  }
  
  // 否则使用默认的特性数据
  return [
    {
      title: "Real-time Monitoring",
      description: "Advanced sensors provide real-time data on system performance and venue conditions.",
      icon: BarChart
    },
    {
      title: "Remote Management",
      description: "Control and configure systems from anywhere via secure cloud platform.",
      icon: Settings
    },
    {
      title: "Integration Capabilities",
      description: "Seamlessly connects with existing venue management systems and third-party applications.",
      icon: PanelRight
    },
    {
      title: "Modular Design",
      description: "Expandable system that can grow with your venue's needs and budget.",
      icon: Box
    }
  ];
};

// 模拟案例研究数据
const generateCaseStudies = (solution: AppItem) => {
  return [
    {
      title: `${solution.name} at Olympic Stadium`,
      description: "How our technology transformed the spectator experience at a major international venue.",
      image: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      title: `${solution.name} for Regional Championships`,
      description: "Enhancing smaller venues with professional-grade technology solutions.",
      image: "https://images.unsplash.com/photo-1594470117722-de4b9a02ebed?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
  ];
};

// 详情页组件
export default function ApplicationDetail({ slug }: { slug: string }) {
  const [solution, setSolution] = useState<AppItem | null>(null);
  const [relatedSolutions, setRelatedSolutions] = useState<AppItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [allApplications, setAllApplications] = useState<AppItem[]>([]);
  const [dataSource, setDataSource] = useState<'api' | 'static' | 'loading'>('loading');
  
  useEffect(() => {
    const fetchApplicationData = async () => {
      console.log('🔍 [ApplicationDetail] 开始获取应用场景数据，slug:', slug);
      
      try {
        // 从API获取应用场景详情
        console.log('📡 [ApplicationDetail] 调用 API...');
        const response = await applicationApi.getApplicationBySlug(slug);
        console.log('📥 [ApplicationDetail] API 响应:', response);
        
        if (response.success && response.data) {
          const appData = response.data;
          console.log('✅ [ApplicationDetail] API 数据获取成功:', appData.title);
          
          // 转换API数据为组件需要的格式
          const formattedApp: AppItem = {
            id: parseInt(appData.id) || 1,
            name: appData.title,
            slug: appData.slug,
            description: appData.summary || appData.content,
            desc: appData.summary || appData.content, // 兼容现有代码
            icon: getIconComponent('Building'),
            categories: ['All'], // Default category
            installations: 0,
            satisfaction: 0,
            energySaving: 0,
            benefits: [],
            keyFeatures: [],
            imageUrl: appData.image,
            detailedDescription: appData.content,
            technicalSpecs: {},
            caseStudies: []
          };
          
          setSolution(formattedApp);
          setDataSource('api'); // 标记数据来源为API
          
          // 获取所有应用场景用于相关推荐
          try {
            const allAppsResponse = await applicationApi.getPublicApplications();
            if (allAppsResponse.success && allAppsResponse.data) {
              const formattedApps = allAppsResponse.data.map((app: any) => ({
                ...app,
                desc: app.description,
                icon: getIconComponent(app.icon),
                stats: {
                  installations: app.installations,
                  satisfaction: app.satisfaction,
                  energySaving: app.energySaving
                }
              }));
              setAllApplications(formattedApps);
              setRelatedSolutions(getRelatedSolutions(formattedApp, formattedApps));
            }
          } catch (relatedError) {
            console.warn('Failed to fetch related applications:', relatedError);
          }
          
          setTimeout(() => setIsLoaded(true), 100);
        } else {
          console.warn('⚠️ [ApplicationDetail] API 响应格式不正确');
          throw new Error('Invalid API response format');
        }
      } catch (error) {
        console.error('❌ [ApplicationDetail] API 调用失败:', error);
        console.log('🔄 [ApplicationDetail] 使用静态数据作为备用...');
        
        // 如果API失败，尝试从静态数据中查找（向后兼容）
        const slugWithDashes = slug;
        const formattedSlug = slugWithDashes.replace(/-/g, ' ');
        
        const foundSolution = APPLICATIONS.find(
          app => app.name.toLowerCase() === formattedSlug.toLowerCase()
        );
        
        if (foundSolution) {
          console.log('📚 [ApplicationDetail] 找到静态数据:', foundSolution.name);
          setSolution(foundSolution);
          setDataSource('static'); // 标记数据来源为静态数据
          setRelatedSolutions(getRelatedSolutions(foundSolution, APPLICATIONS));
          setTimeout(() => setIsLoaded(true), 100);
        } else {
          console.log('❌ [ApplicationDetail] 未找到匹配的应用场景');
          setIsLoaded(true); // 触发404
        }
      }
    };
    
    fetchApplicationData();
  }, [slug]);
  
  // 如果找不到解决方案，返回404
  if (!solution && isLoaded) {
    notFound();
  }
  
  if (!solution) {
    // 显示加载状态
    return (
      <div className="min-h-screen bg-slate-50 pt-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 w-48 bg-slate-200 rounded mb-4"></div>
            <div className="h-12 bg-slate-200 rounded-lg w-1/2 mb-8"></div>
            <div className="h-64 bg-slate-200 rounded-lg mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="h-32 bg-slate-200 rounded-lg"></div>
              <div className="h-32 bg-slate-200 rounded-lg"></div>
              <div className="h-32 bg-slate-200 rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  // 生成附加数据
  const features = getKeyFeatures(solution);
  const caseStudies = generateCaseStudies(solution);
  const IconComponent = typeof solution.icon === 'string' ? getIconComponent(solution.icon) : solution.icon;
  
  return (
    <div className="min-h-screen bg-slate-50">
      {/* 数据来源指示器 */}
      {isLoaded && (
        <div className={`fixed top-20 right-4 z-50 px-3 py-1 rounded-full text-xs font-medium ${
          dataSource === 'api' 
            ? 'bg-green-100 text-green-800 border border-green-200' 
            : dataSource === 'static'
            ? 'bg-yellow-100 text-yellow-800 border border-yellow-200'
            : 'bg-gray-100 text-gray-800 border border-gray-200'
        }`}>
          {dataSource === 'api' && '✅ API数据'}
          {dataSource === 'static' && '📚 静态数据'}
          {dataSource === 'loading' && '⏳ 加载中...'}
        </div>
      )}
      
      {/* 头部区域 */}
      <div 
        className="pt-32 pb-20 bg-cover bg-center relative"
        style={{
          backgroundImage: `url(${solution.imageUrl})`,
        }}
      >
        {/* 背景渐变叠加 */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 to-blue-900/70"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className={`transition-all duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
            <div className="flex items-center mb-6">
              <Link href="/applications" className="text-blue-200 hover:text-white flex items-center">
                <ChevronLeft size={16} className="mr-1" />
                Back to All Solutions
              </Link>
            </div>
            
            <div className="flex flex-wrap items-center gap-3 mb-4">
              {solution.categories.map(category => (
                <span key={category} className="px-3 py-1 bg-blue-600/20 backdrop-blur-sm text-blue-100 text-sm font-medium rounded-md border border-blue-600/30">
                  {category}
                </span>
              ))}
            </div>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="p-4 rounded-lg bg-white/10 backdrop-blur-sm">
                <IconComponent size={28} className="text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white">{solution.name}</h1>
            </div>
            
            <p className="text-xl text-blue-100 max-w-3xl mb-10">
              {solution.desc || solution.description}
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <div className="text-blue-200 mb-1 text-sm">Installations</div>
                <div className="text-white text-2xl font-bold">{getStats(solution).installations}+</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <div className="text-blue-200 mb-1 text-sm">Satisfaction</div>
                <div className="text-white text-2xl font-bold">{getStats(solution).satisfaction}%</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <div className="text-blue-200 mb-1 text-sm">Energy Saving</div>
                <div className="text-white text-2xl font-bold">{getStats(solution).energySaving}%</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <div className="text-blue-200 mb-1 text-sm">Key Benefits</div>
                <div className="text-white text-2xl font-bold">{solution.benefits.length}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* 主要内容区域 */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* 左侧主要内容 */}
          <div className="lg:col-span-2">
            <AnimatedSection 
              threshold={0.1}
              className="bg-white rounded-xl shadow-sm border border-slate-100 p-8 mb-12"
            >
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Overview</h2>
              {solution.detailedDescription ? (
                <div className="mb-6">
                  <div className="text-slate-600 whitespace-pre-line">
                    {solution.detailedDescription}
                  </div>
                </div>
              ) : (
                <>
                  <p className="text-slate-600 mb-6">
                    Our {solution.name} provide comprehensive technological infrastructure 
                    designed specifically for {solution.categories[0]?.toLowerCase()} sports venues. 
                    From installation to maintenance, we offer end-to-end solutions that enhance 
                    both operational efficiency and visitor experience.
                  </p>
                  <p className="text-slate-600 mb-6">
                    With over {getStats(solution).installations} successful installations worldwide and a 
                    customer satisfaction rate of {getStats(solution).satisfaction}%, our solutions are proven to 
                    deliver exceptional performance while reducing energy consumption by up to {getStats(solution).energySaving}%.
                  </p>
                </>
              )}
              <div className="mt-10">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Key Benefits</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6">
                  {solution.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-start">
                      <div className="flex-shrink-0 p-1 bg-blue-100 text-blue-600 rounded-full mr-3 mt-1">
                        <Check size={16} />
                      </div>
                      <div>
                        <p className="text-slate-700">{benefit}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
            
            <AnimatedSection 
              threshold={0.1}
              delay={200}
              className="mb-12"
            >
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Key Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {features.map((feature: any, idx: number) => (
                  <div 
                    key={idx} 
                    className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start">
                      <div className="p-3 bg-blue-100 rounded-lg text-blue-600 mr-4">
                        <feature.icon size={20} />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-slate-900 mb-2">{feature.title}</h3>
                        <p className="text-slate-600 text-sm">{feature.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedSection>
            
            {/* Technical Specifications Section */}
            {solution.technicalSpecs && Object.keys(solution.technicalSpecs).length > 0 && (
              <AnimatedSection 
                threshold={0.1}
                delay={250}
                className="mb-12"
              >
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Technical Specifications</h2>
                <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {Object.entries(solution.technicalSpecs).map(([key, value], index) => (
                      <div key={index} className="flex justify-between items-center py-3 border-b border-slate-100 last:border-b-0">
                        <div className="font-medium text-slate-700">{key}</div>
                        <div className="text-slate-600 font-semibold">{value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            )}
            
            {/* Image Gallery Section */}
            {solution.galleryImages && solution.galleryImages.length > 0 && (
              <AnimatedSection 
                threshold={0.1}
                delay={275}
                className="mb-12"
              >
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Image Gallery</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {solution.galleryImages.map((image: string, index: number) => (
                    <div 
                      key={index} 
                      className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-all duration-300 group cursor-pointer"
                      onClick={() => {
                        // Simple lightbox effect - you could use a proper lightbox library here
                        const lightbox = document.createElement('div');
                        lightbox.className = 'fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50';
                        lightbox.onclick = () => lightbox.remove();
                        
                        const img = document.createElement('img');
                        img.src = image;
                        img.className = 'max-w-full max-h-full object-contain';
                        
                        const closeBtn = document.createElement('button');
                        closeBtn.innerHTML = '✕';
                        closeBtn.className = 'absolute top-4 right-4 text-white text-2xl w-10 h-10 flex items-center justify-center rounded-full bg-black bg-opacity-50 hover:bg-opacity-70';
                        closeBtn.onclick = () => lightbox.remove();
                        
                        lightbox.appendChild(img);
                        lightbox.appendChild(closeBtn);
                        document.body.appendChild(lightbox);
                      }}
                    >
                      <div className="h-48 relative overflow-hidden">
                        <img 
                          src={image} 
                          alt={`${solution.name} Gallery Image ${index + 1}`}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="bg-white rounded-full p-2">
                              <ArrowRight size={20} className="text-slate-700" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </AnimatedSection>
            )}
            
            <AnimatedSection 
              threshold={0.1}
              delay={300}
              className="mb-12"
            >
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Case Studies</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {(solution.caseStudies && solution.caseStudies.length > 0 ? solution.caseStudies : caseStudies).map((study: any, idx) => (
                  <div 
                    key={idx} 
                    className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-shadow group"
                  >
                    {/* Display image if available, otherwise use default */}
                    <div className="h-48 relative overflow-hidden">
                      <img 
                        src={study.image || solution.imageUrl || "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"}
                        alt={study.title || `${study.venue} Case Study`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                    <div className="p-6">
                      {/* Use real case study data if available */}
                      {study.venue ? (
                        <>
                          <h3 className="text-lg font-bold text-slate-900 mb-2">{study.venue}</h3>
                          <div className="text-sm text-slate-500 mb-2">
                            <div className="flex items-center mb-1">
                              <Map size={14} className="mr-2" />
                              {study.location}
                            </div>
                            {study.capacity && (
                              <div className="flex items-center mb-2">
                                <Users size={14} className="mr-2" />
                                {study.capacity}
                              </div>
                            )}
                          </div>
                          {study.features && study.features.length > 0 && (
                            <div className="mb-4">
                              <h4 className="font-medium text-slate-700 mb-2">Key Features:</h4>
                              <ul className="text-sm text-slate-600 space-y-1">
                                {study.features.filter((f: string) => f.trim()).map((feature: string, fIdx: number) => (
                                  <li key={fIdx} className="flex items-start">
                                    <Check size={14} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                    {feature}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </>
                      ) : (
                        <>
                          <h3 className="text-lg font-bold text-slate-900 mb-2">{study.title}</h3>
                          <p className="text-slate-600 text-sm mb-4">{study.description}</p>
                        </>
                      )}
                      <Link 
                        href="#"
                        className="text-blue-600 inline-flex items-center text-sm font-medium hover:text-blue-700"
                      >
                        Read Case Study
                        <ArrowRight size={16} className="ml-1 transition-transform duration-200 group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
          
          {/* 右侧边栏 */}
          <div className="lg:col-span-1">
            <AnimatedSection 
              threshold={0.1}
              delay={100}
              className="sticky top-32"
            >
              <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 mb-8">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Request Information</h3>
                <p className="text-slate-600 text-sm mb-6">
                  Contact our sales team to learn more about our {solution.name} and how they can benefit your venue.
                </p>
                
                {/* Quote Request Form */}
                <form className="space-y-4" onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.target as HTMLFormElement);
                  const data = {
                    name: formData.get('name'),
                    email: formData.get('email'),
                    company: formData.get('company'),
                    phone: formData.get('phone'),
                    message: formData.get('message'),
                    application: solution.name,
                    requestType: formData.get('requestType')
                  };
                  
                  // Here you would typically send the data to your backend
                  console.log('Quote request submitted:', data);
                  
                  // Pretty toast
                  const toast = document.createElement('div');
                  toast.className = 'fixed top-6 right-6 z-[9999] max-w-sm bg-white border border-slate-200 shadow-xl rounded-xl p-4';
                  toast.innerHTML = `<div class="text-sm text-slate-800">Thank you for your interest! We will contact you within 24 hours.</div>`;
                  document.body.appendChild(toast);
                  setTimeout(() => toast.remove(), 3000);
                  
                  // Reset form
                  (e.target as HTMLFormElement).reset();
                }}>
                  <div>
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Name *"
                      required
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email Address *"
                      required
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <input
                      type="text"
                      name="company"
                      placeholder="Company/Organization"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone Number"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <select
                      name="requestType"
                      required
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select Request Type *</option>
                      <option value="demo">Request Demo</option>
                      <option value="quote">Get Quote</option>
                      <option value="consultation">Schedule Consultation</option>
                      <option value="brochure">Download Brochure</option>
                      <option value="support">Technical Support</option>
                    </select>
                  </div>
                  
                  <div>
                    <textarea
                      name="message"
                      placeholder="Tell us about your project requirements..."
                      rows={3}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                  >
                    Submit Request
                  </button>
                </form>
                
                <div className="mt-4 pt-4 border-t border-slate-200">
                  <p className="text-xs text-slate-500 text-center">
                    We'll respond within 24 hours. Your information is secure and won't be shared.
                  </p>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 mb-8">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Solution Details</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Map className="text-slate-400 w-5 h-5 mt-0.5 mr-3" />
                    <div>
                      <div className="text-sm text-slate-500">Installation Regions</div>
                      <div className="font-medium text-slate-700">Global</div>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Clock className="text-slate-400 w-5 h-5 mt-0.5 mr-3" />
                    <div>
                      <div className="text-sm text-slate-500">Implementation Time</div>
                      <div className="font-medium text-slate-700">4-6 weeks</div>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Badge className="text-slate-400 w-5 h-5 mt-0.5 mr-3" />
                    <div>
                      <div className="text-sm text-slate-500">Warranty</div>
                      <div className="font-medium text-slate-700">5 years</div>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <ThumbsUp className="text-slate-400 w-5 h-5 mt-0.5 mr-3" />
                    <div>
                      <div className="text-sm text-slate-500">Maintenance Plan</div>
                      <div className="font-medium text-slate-700">Included, 24/7 support</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {relatedSolutions.length > 0 && (
                <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
                  <h3 className="text-lg font-bold text-slate-900 mb-4">Related Solutions</h3>
                  <div className="space-y-4">
                    {relatedSolutions.map((related) => (
                      <Link 
                        key={related.name}
                        href={`/applications/${related.slug || related.name.toLowerCase().replace(/\s+/g, '-')}`}
                        className="flex items-start p-3 rounded-lg hover:bg-slate-50 transition-colors"
                      >
                        <div className="p-2 bg-slate-100 rounded-lg text-slate-600 mr-3">
                          {typeof related.icon === 'string' ? (
                            React.createElement(getIconComponent(related.icon), { size: 18 })
                          ) : (
                            <related.icon size={18} />
                          )}
                        </div>
                        <div>
                          <h4 className="font-medium text-slate-900 mb-1">{related.name}</h4>
                          <p className="text-xs text-slate-500 line-clamp-2">{related.desc || related.description}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </AnimatedSection>
          </div>
        </div>
      </div>
      
      {/* 底部 CTA 区域 */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <AnimatedSection threshold={0.2}>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to transform your venue?</h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-10">
              Our expert team is ready to help you implement the perfect {solution.name} for your specific needs.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="px-8 py-3 bg-white text-blue-700 rounded-lg font-medium hover:bg-blue-50 transition-colors">
                Request a Quote
              </button>
              <button className="px-8 py-3 border-2 border-white/30 text-white rounded-lg font-medium hover:bg-white/10 transition-colors">
                Schedule Consultation
              </button>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
} 