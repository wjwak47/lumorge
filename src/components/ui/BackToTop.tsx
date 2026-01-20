"use client";
import { useEffect, useState, useCallback } from 'react';
import { ChevronUp, ArrowUp, Rocket } from 'lucide-react';

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [icon, setIcon] = useState<'chevron' | 'arrow' | 'rocket'>('chevron');

  // 控制按钮可见性的阈值（像素）
  const SCROLL_THRESHOLD = 300;

  // 计算滚动进度
  const calculateScrollProgress = useCallback(() => {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollTop = window.scrollY;
    const progress = scrollTop / scrollHeight;
    setScrollProgress(Math.min(Math.max(progress, 0), 1));
  }, []);

  // 切换图标
  const cycleIcon = useCallback(() => {
    setIcon(prevIcon => {
      if (prevIcon === 'chevron') return 'arrow';
      if (prevIcon === 'arrow') return 'rocket';
      return 'chevron';
    });
  }, []);

  useEffect(() => {
    // 检查并设置按钮可见性及滚动进度
    const handleScroll = () => {
      setIsVisible(window.scrollY > SCROLL_THRESHOLD);
      calculateScrollProgress();
    };

    // 初始检查
    handleScroll();

    // 添加滚动事件监听
    window.addEventListener('scroll', handleScroll);

    // 清理
    return () => window.removeEventListener('scroll', handleScroll);
  }, [calculateScrollProgress]);

  // 平滑滚动到顶部
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // 获取当前图标组件
  const IconComponent = {
    chevron: ChevronUp,
    arrow: ArrowUp,
    rocket: Rocket
  }[icon];

  return (
    <div 
      className={`fixed right-6 bottom-6 z-50 transition-all duration-500 ease-in-out transform ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'
      }`}
    >
      <button
        onClick={scrollToTop}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onDoubleClick={cycleIcon}
        className="group relative bg-gradient-to-br from-blue-600 to-blue-800 hover:from-blue-500 hover:to-blue-700 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:shadow-blue-500/30 transition-all duration-300"
        aria-label="Back to top"
        title="Back to top (double-click to change icon)"
      >
        {/* 主图标 */}
        <IconComponent
          size={24}
          className={`transform transition-all duration-300 ${
            isHovered ? 'translate-y-[-4px] scale-110' : ''
          } ${icon === 'rocket' && isHovered ? 'animate-bounce' : ''}`}
        />
        
        {/* 进度环 */}
        <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle
            className="text-blue-300/20 stroke-current"
            strokeWidth="3"
            fill="transparent"
            r="46"
            cx="50"
            cy="50"
          />
          <circle
            className="text-white stroke-current transition-all duration-300"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={`${scrollProgress * 289} 289`}
            fill="transparent"
            r="46"
            cx="50"
            cy="50"
          />
        </svg>
        
        {/* 发光效果 */}
        <div className="absolute inset-0 rounded-full bg-blue-400 opacity-0 group-hover:opacity-30 blur-md transition-opacity duration-300"></div>
        
        {/* 光晕效果 */}
        <div className="absolute -inset-2 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300"></div>
        
        {/* 装饰性粒子 - 仅在悬停时显示 */}
        {isHovered && (
          <>
            <div className="particle absolute w-2 h-2 bg-blue-200 rounded-full animate-particle-1"></div>
            <div className="particle absolute w-2 h-2 bg-blue-200 rounded-full animate-particle-2"></div>
            <div className="particle absolute w-1.5 h-1.5 bg-blue-300 rounded-full animate-particle-3"></div>
          </>
        )}
        
        {/* 波纹动画 */}
        <div className={`absolute inset-0 rounded-full border-2 border-white/20 ${
          isHovered ? 'animate-ping opacity-70' : 'opacity-0'
        } transition-opacity duration-300`}></div>
      </button>
      
      {/* 鼠标悬停时的工具提示 */}
      <div className={`absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap transition-all duration-300 ${
        isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2 pointer-events-none'
      }`}>
        Back to top
        <div className="absolute top-1/2 -translate-y-1/2 right-[-6px] w-0 h-0 border-y-[6px] border-y-transparent border-l-[6px] border-l-gray-800"></div>
      </div>
      
      {/* 添加自定义动画样式 */}
      <style jsx>{`
        @keyframes particle-1 {
          0% { transform: translate(0, 0); opacity: 1; }
          100% { transform: translate(-20px, -20px); opacity: 0; }
        }
        
        @keyframes particle-2 {
          0% { transform: translate(0, 0); opacity: 1; }
          100% { transform: translate(20px, -20px); opacity: 0; }
        }
        
        @keyframes particle-3 {
          0% { transform: translate(0, 0); opacity: 1; }
          100% { transform: translate(0, -30px); opacity: 0; }
        }
        
        .animate-particle-1 {
          animation: particle-1 1.5s ease-out infinite;
        }
        
        .animate-particle-2 {
          animation: particle-2 1.5s ease-out 0.2s infinite;
        }
        
        .animate-particle-3 {
          animation: particle-3 1.5s ease-out 0.4s infinite;
        }
      `}</style>
    </div>
  );
} 