"use client";
import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getIconComponent } from '@/data/products';
import { ArrowLeft, Star, Shield, ChevronDown, ChevronUp, Share2, Download, CheckCircle, ArrowRight, ChevronRight, ChevronLeft } from 'lucide-react';
import PageHero from './PageHero';
import { parseFeaturesString } from '@/utils/featureParser';

// 定义产品接口
interface Product {
  id: string | number;
  name: string;
  category?: string | { id: number, name: string };
  description?: string;
  image?: string;
  images?: string | string[];
  features?: string | string[];
  specifications?: Record<string, any>;
  useCases?: Array<{
    title: string;
    description: string;
    icon: string;
  }>;
  iconName?: string;
  highlight?: boolean;
  tags?: string | string[];
}

interface ProductDetailProps {
  product: Product;
}

// 标签映射函数：将中文标签和其它可能的标签形式映射为正确的标签类型
const mapTagType = (tag: string): string => {
  const tagMap: Record<string, string> = {
    // 中文标签映射
    '新品': 'New',
    '热门': 'Hot',
    '促销': 'Sale',
    '推荐': 'Featured',
    '流行': 'Popular',
    '限量版': 'Limited',
    '畅销': 'Best Seller',
    '高评分': 'Top Rated',
    '高端': 'Premium',
    '专业级': 'Professional',
    '企业级': 'Enterprise',
    '特价': 'Special',
    '环保': 'Eco-friendly',
    '节能': 'Energy Efficient',
    '无线': 'Wireless',
    '智能': 'Smart',
    '高清': 'HD',
    '超高清': '4K',
    '便携式': 'Portable'
  };

  // 检查是否为已知中文标签，如果是则返回对应的英文
  if (tagMap[tag]) {
    return tagMap[tag];
  }
  
  // 如果以"产品系列："开头，返回Featured
  if (typeof tag === 'string' && tag.startsWith('产品系列：')) {
    return 'Featured';
  }
  
  return tag;
};

// 获取标签样式类
const getTagStyle = (tag: string): string => {
  const tagType = mapTagType(tag);
  
  switch (tagType) {
    case 'Popular':
      return 'bg-amber-500 text-white';
    case 'New':
      return 'bg-green-500 text-white';
    case 'Featured':
      return 'bg-purple-500 text-white';
    case 'Eco-friendly':
      return 'bg-teal-500 text-white';
    case 'Hot':
      return 'bg-red-500 text-white';
    default:
      return 'bg-blue-500 text-white';
  }
};

// 当前图片处理逻辑，解决本地导入图片无法显示的问题
function processImageUrl(url: string): string {
  // 处理base64编码的图片，直接返回原始值
  if (url && url.startsWith('data:image/')) {
    return url;
  }
  
  // 处理绝对URL，直接返回原始值
  if (url && (url.startsWith('http://') || url.startsWith('https://'))) {
    return url;
  }
  
  // 处理相对路径：保持相对路径，交给Next静态资源系统处理
  if (url && url.startsWith('/')) {
    return url;
  }
  
  // 默认图片
  return 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80';
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [activeSpec, setActiveSpec] = useState<string | null>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const pageHeroSubtitle: string = product.description ? product.description : 'Detailed information about this product.';

  // 获取图标组件
  const IconComponent = getIconComponent(product.iconName || 'Layers');
  
  // 处理滚动效果
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 根据产品ID获取图片URL
  const getProductImage = (productId: string | number): string => {
    // 直接使用产品的image或images属性
    if (product.image && typeof product.image === 'string') {
      return processImageUrl(product.image);
    }
    
    if (product.images && Array.isArray(product.images) && product.images.length > 0) {
      return processImageUrl(product.images[0]);
    }
    
    // 只有当没有有效的产品图片时才返回默认图片
    return 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80';
  };

  // 默认图片列表，如果images为空则使用主图片
  const imageList = useMemo(() => {
    try {
      // 优先使用 images 数组
      if (product && product.images) {
        const imgs = Array.isArray(product.images)
          ? product.images
          : (typeof product.images === 'string' ? JSON.parse(product.images as unknown as string) : []);
        if (Array.isArray(imgs) && imgs.length > 0) {
          return imgs.map((img: string) => processImageUrl(img));
        }
      }
      // 其次使用 image 字段
      if (product && typeof product.image === 'string' && product.image.trim()) {
        return [processImageUrl(product.image)];
      }
    } catch {}
    // 最后使用占位图
    return ['https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80'];
  }, [product?.images, product?.image]);
  
  // 切换到下一张图片
  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === imageList.length - 1 ? 0 : prevIndex + 1
    );
  };
  
  // 切换到上一张图片
  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? imageList.length - 1 : prevIndex - 1
    );
  };
  
  // 从产品数据中获取技术规格，增加安全检查
  const specifications = useMemo(() => {
    try {
      if (product?.specifications && typeof product.specifications === 'object') {
        // 将产品规格转换为UI格式
        const specEntries = Object.entries(product.specifications);
        const validSpecs = specEntries.map(([categoryName, categoryData]) => {
          if (Array.isArray(categoryData)) {
            // 新格式：categoryData 是项目数组
            return {
              category: categoryName,
              items: categoryData.filter(item => item && (item.name || item.value))
            };
          } else if (typeof categoryData === 'object' && categoryData !== null) {
            // 兼容旧格式：categoryData 是对象
            return {
              category: categoryName,
              items: Object.entries(categoryData).map(([name, value]) => ({ name: String(name), value: String(value) }))
            };
          }
          return null;
        }).filter(Boolean);
        
        if (validSpecs.length > 0) {
          return validSpecs;
        }
      }
    } catch (error) {
      console.warn('Error processing specifications:', error);
    }
    
    // 如果没有规格数据或出错，显示默认信息
    return [{
      category: 'Technical Specifications',
      items: [
        { name: 'Information', value: 'Detailed specifications will be available soon.' }
      ]
    }];
  }, [product?.specifications]);
  
  // 从产品数据中获取使用案例，增加安全检查
  const useCases = useMemo(() => {
    try {
      if (product?.useCases && Array.isArray(product.useCases) && product.useCases.length > 0) {
        const validUseCases = product.useCases.filter(useCase => 
          useCase && typeof useCase === 'object' && useCase.title && useCase.description
        );
        if (validUseCases.length > 0) {
          return validUseCases;
        }
      }
    } catch (error) {
      console.warn('Error processing use cases:', error);
    }
    
    // 如果没有使用案例数据或出错，显示默认信息
    return [{
      title: 'Professional Applications',
      description: 'This product is designed for professional use in various industries and applications.',
      icon: '💼',
    }];
  }, [product?.useCases]);
  
  // 获取产品分类名称
  const getCategoryName = (category: string | { id: number, name: string } | undefined): string => {
    if (!category) return 'Product';
    return typeof category === 'object' ? category.name : category;
  };
  
  // 相关产品 - 硬编码一些示例产品
  const relatedProducts = [
    {
      id: 'p4-outdoor-led',
      name: 'P4 Outdoor LED Billboard',
      category: 'display',
      description: 'Weather-resistant outdoor LED display for sports venues.',
      image: '/images/products/led/p4-outdoor.jpg'
    },
    {
      id: 'p5-interactive-led',
      name: 'P5 Interactive LED Floor',
      category: 'display',
      description: 'Interactive LED flooring system for enhanced fan engagement.',
      image: '/images/products/led/p5-interactive.jpg'
    },
    {
      id: 'transparent-led',
      name: 'Transparent LED Display',
      category: 'display',
      description: 'Innovative see-through LED panels for creative installations.',
      image: '/images/products/led/transparent-led.jpg'
    }
  ];
  
  // 技术亮点
  const highlights = [
    { title: 'Advanced Technology', description: 'Utilizing cutting-edge technology to deliver unparalleled performance' },
    { title: 'Seamless Integration', description: 'Easily integrates with existing venue infrastructure and third-party systems' },
    { title: 'Scalable Solution', description: 'Grows with your needs from small facilities to major stadiums' },
    { title: 'Energy Efficient', description: 'Designed with sustainability in mind, reducing operational costs' },
  ];

  return (
    <div>
      {/* 动态Hero区域 */}
      <PageHero
        title={product.name}
        subtitle={pageHeroSubtitle}
        background="bg-gradient-to-r from-[#0A1F44] to-[#0052CC]"
        height="lg"
      />
      
      {/* 浮动导航 - 在滚动时显示 */}
      <div className={`fixed top-0 left-0 w-full bg-white shadow-md z-40 transition-transform duration-300 ${
        scrollPosition > 350 ? 'translate-y-0' : '-translate-y-full'
      }`}>
        <div className="container mx-auto px-4 max-w-[1200px] flex items-center justify-between h-20">
          <div className="flex items-center">
            <div className="relative mr-4">
              <div className="w-12 h-12 bg-gradient-to-r from-[#0A1F44] to-[#0052CC] rounded-lg flex items-center justify-center text-white">
                <IconComponent size={24} />
              </div>
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#0A1F44] line-clamp-1">{product.name}</h2>
              <p className="text-sm text-[#718096] capitalize">{getCategoryName(product.category)}</p>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <button 
              onClick={() => setActiveTab('overview')}
              className={`text-sm font-medium ${activeTab === 'overview' ? 'text-[#0052CC]' : 'text-[#4A5568]'}`}
            >
              Overview
            </button>
            <button 
              onClick={() => setActiveTab('specifications')}
              className={`text-sm font-medium ${activeTab === 'specifications' ? 'text-[#0052CC]' : 'text-[#4A5568]'}`}
            >
              Specifications
            </button>
            <button 
              onClick={() => setActiveTab('use-cases')}
              className={`text-sm font-medium ${activeTab === 'use-cases' ? 'text-[#0052CC]' : 'text-[#4A5568]'}`}
            >
              Use Cases
            </button>
          </div>
          <Link 
            href="/contact" 
            className="bg-[#0052CC] hover:bg-[#0039A6] text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
          >
            Request a Quote
          </Link>
        </div>
      </div>
      
      {/* 面包屑导航 */}
      <div className="bg-white border-b border-[#E2E8F0]">
        <div className="container mx-auto px-4 max-w-[1200px] py-4">
          <div className="flex items-center text-sm text-[#718096]">
            <Link href="/" className="hover:text-[#0052CC]">Home</Link>
            <ChevronRight size={14} className="mx-2" />
            <Link href="/products" className="hover:text-[#0052CC]">Products</Link>
            <ChevronRight size={14} className="mx-2" />
            <span className="text-[#0A1F44] font-medium truncate">{product.name}</span>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 max-w-[1200px] py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* 左侧内容区 */}
          <div className="lg:col-span-8">
            {/* 产品展示 - 更新为图片画廊 */}
            <div className="bg-white rounded-xl overflow-hidden border border-[#E2E8F0] shadow-lg mb-12">
              {/* 主图片展示区域 */}
              <div className="relative h-[400px] bg-gradient-to-r from-[#0A1F44] to-[#0052CC] overflow-hidden">
                {/* 科技网格背景 */}
                <div className="absolute inset-0 opacity-20">
                  <div className="grid grid-cols-12 grid-rows-12 h-full w-full">
                    {Array.from({ length: 40 }).map((_, i) => (
                      <div key={i} className="border-[0.5px] border-white/10"></div>
                    ))}
                  </div>
                </div>
                
                {/* 产品图片 */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="absolute inset-0">
                    {imageList && imageList.length > 0 && imageList[currentImageIndex] && (
                      <Image 
                        src={imageList[currentImageIndex]}
                        alt={`${product.name} - Image ${currentImageIndex + 1}`}
                        fill
                        style={{ objectFit: 'contain' }}
                        className="z-10"
                        priority
                      />
                    )}
                  </div>
                  
                  {/* 产品图标作为占位符 - 只有在没有图片时显示 */}
                  {(!imageList || imageList.length === 0 || !imageList[currentImageIndex]) && (
                    <div className="relative">
                      <div className="absolute -inset-16 bg-blue-500 rounded-full opacity-10 animate-pulse"></div>
                      <div className="bg-white/10 backdrop-blur-sm p-8 rounded-full relative z-10">
                        <IconComponent size={120} className="text-white" />
                      </div>
                    </div>
                  )}
                </div>
                
                {/* 技术线条动画 */}
                <div className="absolute inset-0">
                  <div className="absolute top-0 left-1/4 w-[1px] h-full bg-gradient-to-b from-transparent via-white/20 to-transparent"></div>
                  <div className="absolute top-0 left-2/4 w-[1px] h-full bg-gradient-to-b from-transparent via-white/20 to-transparent"></div>
                  <div className="absolute top-0 left-3/4 w-[1px] h-full bg-gradient-to-b from-transparent via-white/20 to-transparent"></div>
                  <div className="absolute top-1/4 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                  <div className="absolute top-2/4 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                  <div className="absolute top-3/4 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                </div>
                
                {/* 左右导航按钮 */}
                {imageList.length > 1 && (
                  <>
                    <button 
                      onClick={prevImage} 
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-2 rounded-full z-20 transition-all"
                      aria-label="Previous image"
                    >
                      <ChevronLeft size={24} />
                    </button>
                    <button 
                      onClick={nextImage} 
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-2 rounded-full z-20 transition-all"
                      aria-label="Next image"
                    >
                      <ChevronRight size={24} />
                    </button>
                  </>
                )}
                
                {/* 标签 */}
                {product.tags && Array.isArray(product.tags) && product.tags.length > 0 && (
                  <div className="absolute top-6 left-6 flex gap-2 z-10">
                    {product.tags.map((tag: string) => (
                      <span key={tag} className={`
                        text-xs font-semibold px-3 py-1.5 rounded-full
                        ${getTagStyle(tag)}
                      `}>
                        {mapTagType(tag)}
                      </span>
                    ))}
                  </div>
                )}
                
                {/* 图片计数器 */}
                {imageList.length > 1 && (
                  <div className="absolute bottom-4 right-4 bg-black/50 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm z-10">
                    {currentImageIndex + 1} / {imageList.length}
                  </div>
                )}
              </div>
              
              {/* 缩略图导航 */}
              {imageList.length > 1 && (
                <div className="flex justify-center p-4 bg-[#F8FAFC] border-t border-[#E2E8F0]">
                  <div className="flex space-x-2 overflow-x-auto max-w-full pb-2">
                    {imageList.map((img, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`relative w-16 h-16 flex-shrink-0 rounded-md overflow-hidden ${
                          currentImageIndex === index 
                            ? 'ring-2 ring-[#0052CC]' 
                            : 'ring-1 ring-[#E2E8F0] opacity-70 hover:opacity-100'
                        }`}
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-[#0A1F44] to-[#0052CC]">
                          <div className="flex items-center justify-center h-full w-full">
                            <IconComponent size={20} className="text-white" />
                          </div>
                        </div>
                        <div className="absolute bottom-0 inset-x-0 bg-black/30 text-center text-white text-[10px] py-0.5">
                          {index + 1}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              {/* 产品详情区 */}
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h1 className="text-3xl font-bold text-[#0A1F44]">{product.name}</h1>
                    <div className="flex items-center mt-2">
                      <div className="flex items-center">
                        {[1, 2, 3, 4, 5].map(star => (
                          <Star 
                            key={star} 
                            size={16} 
                            className={star <= 4 ? "text-amber-400 fill-amber-400" : "text-gray-300"} 
                          />
                        ))}
                      </div>
                      <span className="ml-2 text-sm text-[#718096]">4.0/5 (124 reviews)</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button className="p-2 rounded-full border border-[#E2E8F0] hover:border-[#0052CC] transition-colors">
                      <Share2 size={18} className="text-[#718096]" />
                    </button>
                    <button className="p-2 rounded-full border border-[#E2E8F0] hover:border-[#0052CC] transition-colors">
                      <Download size={18} className="text-[#718096]" />
                    </button>
                  </div>
                </div>
                
                <div className="prose max-w-none text-[#4A5568]">
                  {product.description && (
                    <p className="lead text-lg mb-6">{product.description}</p>
                  )}
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 mb-8">
                    {(Array.isArray(product.features) && product.features.length > 0 ? [] : highlights).map((highlight, index) => (
                      <div key={index} className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <CheckCircle size={18} className="text-[#0052CC]" />
                        </div>
                        <div className="ml-3">
                          <h3 className="text-base font-semibold text-[#0A1F44]">{highlight.title}</h3>
                          <p className="text-sm text-[#718096]">{highlight.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Feature list */}
                <div className="mt-8">
                  <h2 className="text-xl font-bold text-[#0A1F44] mb-4">Key Features</h2>
                  <div className="grid grid-cols-1 gap-3">
                    {parseFeaturesString(product.features).map((feature: string, index: number) => (
                      <div key={index} className="flex items-center">
                        <span className="flex-shrink-0 w-5 h-5 bg-[#0052CC]/10 text-[#0052CC] rounded-full flex items-center justify-center mr-3">
                          <CheckCircle size={12} />
                        </span>
                        <span className="text-[#4A5568]">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* 规格面板 */}
            <div className="bg-white rounded-xl overflow-hidden border border-[#E2E8F0] shadow-lg mb-12">
              <div className="p-8">
                <h2 className="text-2xl font-bold text-[#0A1F44] mb-6">Technical Specifications</h2>
                
                <div className="space-y-4">
                  {specifications.map((spec, index) => {
                    if (!spec) return null;
                    return (
                      <div key={index} className="border border-[#E2E8F0] rounded-lg overflow-hidden">
                        <button 
                          className="w-full flex items-center justify-between p-4 text-left bg-[#F8FAFC] hover:bg-[#EDF2F7] transition-colors"
                          onClick={() => setActiveSpec(activeSpec === spec.category ? null : spec.category)}
                        >
                          <h3 className="font-semibold text-[#0A1F44]">{spec.category}</h3>
                          {activeSpec === spec.category ? (
                            <ChevronUp size={20} className="text-[#0052CC]" />
                          ) : (
                            <ChevronDown size={20} className="text-[#718096]" />
                          )}
                        </button>
                        
                        {activeSpec === spec.category && (
                          <div className="p-4 bg-white">
                            <table className="w-full">
                              <tbody>
                                {spec.items.map((item, i) => (
                                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-[#F8FAFC]'}>
                                    <td className="py-2 px-4 border-b border-[#E2E8F0] font-medium text-[#0A1F44]">{item.name}</td>
                                    <td className="py-2 px-4 border-b border-[#E2E8F0] text-[#4A5568]">{item.value}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            
            {/* 使用案例 */}
            <div className="bg-white rounded-xl overflow-hidden border border-[#E2E8F0] shadow-lg mb-12">
              <div className="p-8">
                <h2 className="text-2xl font-bold text-[#0A1F44] mb-6">Common Use Cases</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {useCases.map((useCase, index) => (
                    <div key={index} className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg p-6 text-center">
                      <div className="text-4xl mb-4">{useCase.icon}</div>
                      <h3 className="font-semibold text-[#0A1F44] mb-2">{useCase.title}</h3>
                      <p className="text-sm text-[#718096]">{useCase.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* 右侧边栏 */}
          <div className="lg:col-span-4 relative">
            {/* 悬浮容器 */}
            <div className="sticky top-24 space-y-6">
              {/* 行动号召卡片 */}
              <div className="bg-white rounded-xl overflow-hidden border border-[#E2E8F0] shadow-lg">
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#0A1F44] mb-4">Interested in this product?</h3>
                  
                  <div className="flex items-center mb-6">
                    <Shield size={20} className="text-[#0052CC] mr-2" />
                    <span className="text-sm text-[#4A5568]">Enterprise-grade technology</span>
                  </div>
                  
                  <Link 
                    href="/contact"
                    className="w-full bg-[#0052CC] hover:bg-[#0039A6] text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center mb-3"
                  >
                    Request a Quote <ArrowRight size={18} className="ml-2" />
                  </Link>
                  
                  <Link 
                    href="/products"
                    className="w-full bg-white border border-[#0052CC] text-[#0052CC] hover:bg-[#F8FAFC] font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
                  >
                    Back to Products <ArrowLeft size={18} className="ml-2" />
                  </Link>
                  
                  <div className="mt-6 pt-6 border-t border-[#E2E8F0]">
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-sm font-medium text-[#0A1F44]">Support Included</div>
                      <CheckCircle size={16} className="text-green-500" />
                    </div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-sm font-medium text-[#0A1F44]">Premium Installation</div>
                      <CheckCircle size={16} className="text-green-500" />
                    </div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-sm font-medium text-[#0A1F44]">3-Year Warranty</div>
                      <CheckCircle size={16} className="text-green-500" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium text-[#0A1F44]">Software Updates</div>
                      <CheckCircle size={16} className="text-green-500" />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* 相关产品 */}
              <div className="bg-white rounded-xl overflow-hidden border border-[#E2E8F0] shadow-lg p-6">
                <h2 className="text-xl font-bold text-[#0A1F44] mb-6">Related Products</h2>
                <div className="space-y-4">
                  {relatedProducts.map((relatedProduct: any) => (
                    <Link href={`/products/${relatedProduct.id}`} key={relatedProduct.id} className="group block">
                      <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-[#E2E8F0] transition-all group-hover:shadow-md group-hover:border-[#0052CC]">
                        <div className="flex items-center">
                          <div className="w-24 h-24 flex-shrink-0 relative bg-[#F8FAFC]">
                            <Image 
                              src={relatedProduct.image || getProductImage(relatedProduct.id)} 
                              alt={relatedProduct.name}
                              fill
                              style={{ objectFit: 'cover' }}
                              className="group-hover:scale-105 transition-transform duration-500"
                            />
                          </div>
                          <div className="p-3 flex-grow">
                            <h3 className="font-medium text-[#0A1F44] group-hover:text-[#0052CC] transition-colors text-sm">
                              {relatedProduct.name}
                            </h3>
                            <p className="text-xs text-[#718096] mt-1 line-clamp-2">{relatedProduct.description}</p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 