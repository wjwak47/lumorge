"use client";
import { useState, useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { getHeroBannerData } from "@/utils/api";

interface StatItem {
  value: string;
  label: string;
  _id?: string;
}

interface HeroBannerData {
  _id: string;
  name: string;
  tagline: string;
  titleLine1: string;
  titleLine2: string;
  titleLine2Highlight: boolean;
  subtitle: string;
  primaryButtonText: string;
  primaryButtonActionType: 'scroll' | 'link';
  primaryButtonTarget: string;
  secondaryButtonText: string;
  secondaryButtonActionType: 'scroll' | 'link';
  secondaryButtonTarget: string;
  mainBackgroundImageUrl: string;
  visualElementImageUrl: string;
  floatingCard1Text: string;
  floatingCard2Text: string;
  stats: StatItem[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function Hero() {
  const [visible, setVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);
  const [bannerData, setBannerData] = useState<HeroBannerData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setVisible(true);

    const fetchBannerData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const heroBannerData = await getHeroBannerData();
        const data = {
          _id: heroBannerData?._id || "default",
          name: heroBannerData?.name || "Default Banner",
          tagline: heroBannerData?.tagline || "INDUSTRY LEADER",
          titleLine1: heroBannerData?.titleLine1 || "Next-Level",
          titleLine2: heroBannerData?.titleLine2 || "Sports Technology",
          titleLine2Highlight: heroBannerData?.titleLine2Highlight ?? true,
          subtitle: heroBannerData?.subtitle || "Powering world-class venues with cutting-edge solutions that transform the spectator and athlete experience.",
          primaryButtonText: heroBannerData?.primaryButtonText || "Our Solutions",
          primaryButtonActionType: heroBannerData?.primaryButtonActionType || "scroll",
          primaryButtonTarget: heroBannerData?.primaryButtonTarget || "products",
          secondaryButtonText: heroBannerData?.secondaryButtonText || "See Applications",
          secondaryButtonActionType: heroBannerData?.secondaryButtonActionType || "scroll",
          secondaryButtonTarget: heroBannerData?.secondaryButtonTarget || "application",
          mainBackgroundImageUrl: heroBannerData?.mainBackgroundImageUrl || "https://images.unsplash.com/photo-1577223625816-7546f13df25d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
          visualElementImageUrl: heroBannerData?.visualElementImageUrl || "https://images.unsplash.com/photo-1531907700752-62799b2a3e84?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1776&q=80",
          floatingCard1Text: heroBannerData?.floatingCard1Text || "LED",
          floatingCard2Text: heroBannerData?.floatingCard2Text || "HD",
          stats: heroBannerData?.stats || [
            { value: "500+", label: "Venues equipped" },
            { value: "20+", label: "Countries" },
            { value: "15yrs", label: "Industry experience" },
            { value: "24/7", label: "Technical support" }
          ],
          isActive: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        setBannerData(data);
        console.log("Successfully loaded banner data:", data);
      } catch (error) {
        console.error("Error fetching hero banner data:", error);
        setError("Failed to load banner data");
        // 使用默认值作为后备
        setBannerData({
          _id: "default",
          name: "Default Banner",
          tagline: "INDUSTRY LEADER",
          titleLine1: "Next-Level",
          titleLine2: "Sports Technology",
          titleLine2Highlight: true,
          subtitle: "Powering world-class venues with cutting-edge solutions that transform the spectator and athlete experience.",
          primaryButtonText: "Our Solutions",
          primaryButtonActionType: "scroll",
          primaryButtonTarget: "products",
          secondaryButtonText: "See Applications",
          secondaryButtonActionType: "scroll",
          secondaryButtonTarget: "application",
          mainBackgroundImageUrl: "https://images.unsplash.com/photo-1577223625816-7546f13df25d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
          visualElementImageUrl: "https://images.unsplash.com/photo-1531907700752-62799b2a3e84?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1776&q=80",
          floatingCard1Text: "LED",
          floatingCard2Text: "HD",
          stats: [
            { value: "500+", label: "Venues equipped" },
            { value: "20+", label: "Countries" },
            { value: "15yrs", label: "Industry experience" },
            { value: "24/7", label: "Technical support" }
          ],
          isActive: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchBannerData();

    // Add parallax effect on scroll
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const heroContent = document.getElementById('hero-content');
      const heroBackdrop = document.getElementById('hero-backdrop');
      const heroCircles = document.getElementById('hero-circles');

      if (heroContent) {
        heroContent.style.transform = `translateY(${scrollY * 0.2}px)`;
      }

      if (heroBackdrop) {
        heroBackdrop.style.transform = `translateY(${scrollY * 0.1}px)`;
      }

      if (heroCircles) {
        heroCircles.style.transform = `translateY(${scrollY * 0.05}px) rotate(${scrollY * 0.02}deg)`;
      }
    };

    // Add mouse movement effect
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;

      const rect = heroRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;

      setMousePosition({ x, y });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // 计算鼠标移动效果的位移
  const moveX = mousePosition.x * 20 - 10;
  const moveY = mousePosition.y * 20 - 10;

  // 新增：处理按钮点击的通用函数
  const handleButtonClick = (actionType: 'scroll' | 'link', target: string) => {
    if (actionType === 'scroll') {
      scrollToSection(target);
    } else if (actionType === 'link') {
      window.location.href = target; // 或者使用 Next.js的 <Link> 或 router.push
    }
  };

  return (
    <section ref={heroRef} className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* 渐变背景基础层 */}
      <div
        id="hero-backdrop"
        className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#000821] via-[#00184D] to-[#002380] opacity-95 z-0"
      >
        {/* 体育场背景图片 - 使用不同的图片和效果 */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="relative w-full h-full">
            {bannerData?.mainBackgroundImageUrl && (
              <Image
                src={bannerData.mainBackgroundImageUrl}
                alt="Stadium background"
                fill
                sizes="100vw"
                className="object-cover opacity-40 scale-110"
                style={{ transform: `scale(1.1) translate(${moveX * -0.5}px, ${moveY * -0.5}px)` }}
                priority
              />
            )}
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-[#000821]/90 via-[#001338]/80 to-[#0052CC]/70"></div>
        </div>

        {/* 精致网格背景 */}
        <div className="absolute inset-0 bg-stadium-grid opacity-30"></div>

        {/* 星空效果 */}
        <div className="absolute inset-0">
          <div className="stars"></div>
        </div>
      </div>

      {/* 体育场馆样式的圆形元素 */}
      <div id="hero-circles" className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
        <div className="absolute w-[140%] h-[140%] rounded-full border-[40px] border-blue-700/5"
          style={{ transform: `translate(${moveX * 2}px, ${moveY * 2}px)` }}></div>
        <div className="absolute w-[120%] h-[120%] rounded-full border-[30px] border-blue-600/5"
          style={{ transform: `translate(${moveX * 1.5}px, ${moveY * 1.5}px)` }}></div>
        <div className="absolute w-[100%] h-[100%] rounded-full border-[20px] border-blue-500/5"
          style={{ transform: `translate(${moveX}px, ${moveY}px)` }}></div>

        {/* 额外的装饰线条 - 模拟体育场的中场线和边界线 */}
        <div className="absolute w-[180%] h-[1px] bg-blue-400/10"></div>
        <div className="absolute w-[1px] h-[180%] bg-blue-400/10"></div>
        <div className="absolute w-[60%] h-[60%] border-[1px] border-blue-400/10 rounded-full"></div>
      </div>

      {/* 光影效果 */}
      <div className="absolute top-0 right-0 w-full h-full">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>
      </div>

      {/* 动态流体效果 - 模拟球场光束 */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="light-beam light-beam-1"></div>
        <div className="light-beam light-beam-2"></div>
      </div>

      <div
        id="hero-content"
        className={`relative z-10 wide-container flex flex-col md:flex-row items-center transition-all duration-1000 ${visible ? 'opacity-100' : 'opacity-0'}`}
      >
        {/* Text Content */}
        {bannerData && (
          <div className="w-full md:w-1/2 text-white space-y-6 md:pr-10">
            <div className="inline-block bg-gradient-to-r from-[#0052CC] to-[#0077FF] text-white text-sm font-semibold py-1 px-3 rounded-full mb-4 shadow-lg shadow-blue-700/20">
              {bannerData.tagline}
            </div>

            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              <span className="text-white block mb-2">{bannerData.titleLine1}</span>
              {bannerData.titleLine2Highlight ? (
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#3B82F6] to-[#00A3FF]">{bannerData.titleLine2}</span>
              ) : (
                <span className="text-white">{bannerData.titleLine2}</span>
              )}
            </h1>

            <p className="text-white/80 text-lg md:text-xl leading-relaxed">
              {bannerData.subtitle}
            </p>

            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => handleButtonClick(bannerData.primaryButtonActionType, bannerData.primaryButtonTarget)}
                className="bg-gradient-to-r from-[#0052CC] to-[#0077FF] hover:from-[#0039A6] hover:to-[#0052CC] text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-blue-700/30 flex items-center justify-center group"
              >
                {bannerData.primaryButtonText} <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => handleButtonClick(bannerData.secondaryButtonActionType, bannerData.secondaryButtonTarget)}
                className="bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/15 text-white font-semibold px-8 py-[14px] rounded-full transition-all duration-300"
              >
                {bannerData.secondaryButtonText}
              </button>
            </div>
          </div>
        )}

        {/* Visual Content - 体育科技图形 */}
        {bannerData && (
          <div className="w-full md:w-1/2 mt-12 md:mt-0 relative h-[300px] md:h-[500px] flex items-center justify-center">
            <div className="absolute w-[90%] h-[90%] rounded-full bg-[#0052CC]/5 animate-pulse"></div>

            <div className="relative w-full h-full flex items-center justify-center">
              <div className="w-[250px] md:w-[350px] h-[250px] md:h-[350px] relative rounded-full overflow-hidden shadow-2xl shadow-blue-600/20 group hover:shadow-blue-500/30 transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-br from-[#0052CC] to-[#001538] opacity-90 group-hover:opacity-95 transition-opacity z-10"></div>
                <div className="relative w-full h-full">
                  {bannerData.visualElementImageUrl && (
                    <Image
                      src={bannerData.visualElementImageUrl}
                      alt="Sports technology visual element"
                      fill
                      sizes="(max-width: 768px) 250px, 350px"
                      className="object-cover opacity-40 group-hover:scale-110 transition-transform duration-500"
                      priority
                    />
                  )}
                </div>
                <div className="absolute inset-0 flex items-center justify-center z-20">
                  <div className="text-white text-center">
                    <div className="text-3xl md:text-4xl font-bold tracking-tighter">TECH</div>
                    <div className="text-3xl md:text-4xl font-bold tracking-tighter text-[#00A3FF]">SPORTS</div>
                  </div>
                </div>

                {/* 加入圆形发光效果边框 */}
                <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 blur opacity-30 group-hover:opacity-50 transition-opacity"></div>
              </div>

              {/* Tech elements - 更现代的悬浮卡片 */}
              <div className="absolute top-1/4 -right-4 w-24 h-24 rounded-xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-lg rotate-12 p-4 flex items-center justify-center hover:-translate-y-1 transition-transform duration-300"
                style={{ transform: `translateY(${moveY * -1}px) rotate(12deg)` }}>
                <div className="bg-clip-text text-transparent bg-gradient-to-br from-blue-400 to-blue-600 font-bold">{bannerData.floatingCard1Text}</div>
              </div>
              <div className="absolute bottom-1/4 -left-4 w-24 h-24 rounded-xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-lg -rotate-12 p-4 flex items-center justify-center hover:translate-y-1 transition-transform duration-300"
                style={{ transform: `translateY(${moveY}px) rotate(-12deg)` }}>
                <div className="bg-clip-text text-transparent bg-gradient-to-br from-blue-400 to-blue-600 font-bold">{bannerData.floatingCard2Text}</div>
              </div>

              {/* Dynamic floating decorative elements */}
              <div className="floating-elem absolute top-[60%] right-[20%] w-5 h-5 bg-blue-500 rounded-full opacity-60"></div>
              <div className="floating-elem-slow absolute top-[30%] left-[20%] w-3 h-3 bg-indigo-500 rounded-full opacity-40"></div>
              <div className="floating-elem-fast absolute bottom-[20%] right-[40%] w-2 h-2 bg-cyan-400 rounded-full opacity-50"></div>
            </div>
          </div>
        )}
      </div>

      {/* Stats bar with glass morphism */}
      <div className="absolute bottom-0 left-0 right-0 bg-blue-900/10 backdrop-blur-xl z-10 py-6 border-t border-white/10">
        <div className="wide-container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {bannerData && bannerData.stats && bannerData.stats.map((stat, index) => (
              <div key={stat._id || index} className="text-white">
                <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">{stat.value}</div>
                <div className="text-white/70 text-sm">{stat.label}</div>
              </div>
            ))}
            {/* Fallback or loading state for stats - currently shows nothing if bannerData or stats are null/empty */}
            {isLoading && !bannerData && Array(4).fill(null).map((_, index) => (
              <div key={`loading-stat-${index}`} className="text-white animate-pulse">
                <div className="h-8 bg-gray-700 rounded w-1/2 mx-auto mb-1"></div>
                <div className="h-4 bg-gray-600 rounded w-3/4 mx-auto"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .bg-stadium-grid {
          background-image: 
            radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, transparent 70%),
            linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px);
          background-size: 100% 100%, 20px 20px, 20px 20px;
        }
        
        .stars {
          position: absolute;
          width: 100%;
          height: 100%;
          background-image: radial-gradient(white 1px, transparent 1px);
          background-size: 50px 50px;
          animation: stars-move 100s linear infinite;
        }
        
        .light-beam {
          position: absolute;
          width: 150px;
          height: 800px;
          background: linear-gradient(to top, rgba(59, 130, 246, 0.05), transparent);
          filter: blur(20px);
          transform: rotate(-45deg);
          opacity: 0.3;
          transition: all 1s ease;
        }
        
        .light-beam-1 {
          top: -10%;
          left: 20%;
          animation: beam-move 15s ease-in-out infinite alternate;
        }
        
        .light-beam-2 {
          top: 30%;
          right: 10%;
          animation: beam-move 18s ease-in-out infinite alternate-reverse;
        }
        
        .floating-elem {
          animation: float 4s ease-in-out infinite alternate;
        }
        
        .floating-elem-slow {
          animation: float 6s ease-in-out infinite alternate-reverse;
        }
        
        .floating-elem-fast {
          animation: float 3s ease-in-out infinite alternate;
        }
        
        @keyframes beam-move {
          0% {
            opacity: 0.2;
            transform: rotate(-45deg) translateX(-30px);
          }
          50% {
            opacity: 0.4;
          }
          100% {
            opacity: 0.2;
            transform: rotate(-50deg) translateX(30px);
          }
        }
        
        @keyframes float {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-15px);
          }
        }
        
        @keyframes stars-move {
          0% {
            background-position: 0 0;
          }
          100% {
            background-position: 100% 100%;
          }
        }
      `}</style>
    </section>
  );
} 