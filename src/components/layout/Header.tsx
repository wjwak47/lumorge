"use client";
import { Search, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import SearchModal from "../ui/SearchModal";
import { getSettings, getNavigation, clearNavigationCache } from "@/utils/api";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001'; // 修正端口为3001

// 定义导航项接口
interface NavItem {
  id?: number;
  name: string;
  link: string;
  order?: number;
  isVisible?: boolean;
  parentId?: number | null;
  target?: string;
}

// 备用导航数据，当API请求失败时使用
const FALLBACK_NAV_ITEMS: NavItem[] = [
  { name: "Products", link: "/products" },
  { name: "Application", link: "/application" },
  { name: "Indoor", link: "/indoor" },
  { name: "Outdoor", link: "/outdoor" },
  { name: "Rental", link: "/rental" },
  { name: "Sports", link: "/sports" },
  { name: "Lighting", link: "/lighting" },
  { name: "News & Video", link: "/news-video" },
  { name: "About Us", link: "/about-us" },
];

// 默认LOGO组件，服务器端和客户端渲染一致
const DefaultLogo = () => (
  <div className="text-white font-bold text-2xl tracking-tighter transition-all duration-300 transform group-hover:scale-105">
    <span className="text-[#0052CC]">LU</span>MORGE
  </div>
);

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  // 添加导航数据状态
  const [navItems, setNavItems] = useState<NavItem[]>(FALLBACK_NAV_ITEMS);
  
  // 使用静态默认值初始化
  const [settings, setSettings] = useState({
    site_logo_type: 'text',
    site_logo_text: 'LUMORGE',
    site_logo_image: '',
    site_title: 'LUMORGE'
  });
  
  // 客户端挂载标志，避免服务器/客户端不匹配
  const [isMounted, setIsMounted] = useState(false);
  
  // 仅标记客户端挂载，不改变任何状态
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  // 获取导航数据
  useEffect(() => {
    if (!isMounted) return;
    
    const fetchNavigation = async () => {
      try {
        // 清除导航缓存以确保获取最新数据
        clearNavigationCache();
        const data = await getNavigation();
        if (Array.isArray(data) && data.length > 0) {
          // 过滤出可见的导航项并按order排序
          const visibleItems = data
            .filter(item => item.isVisible)
            .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
          
          if (visibleItems.length > 0) {
            setNavItems(visibleItems);
          }
        }
      } catch (error) {
        console.error('Failed to fetch navigation:', error);
      }
    };
    
    // 立即获取一次导航数据
    fetchNavigation();
    
    // 设置轮询更新，每30秒刷新一次导航数据
    const intervalId = setInterval(() => {
      fetchNavigation();
    }, 30000);
    
    return () => {
      clearInterval(intervalId);
    };
  }, [isMounted]);
  
  // 只在客户端挂载后获取设置
  useEffect(() => {
    if (!isMounted) return;
    
    const fetchSettings = async () => {
      try {
        // 直接从API获取最新数据（api.ts 内部已负责缓存）
        const data = await getSettings(['site_logo_type', 'site_logo_text', 'site_logo_image', 'site_title']);
        if (data) {
          setSettings({
            site_logo_type: data.site_logo_type || 'text',
            site_logo_text: data.site_logo_text || 'LUMORGE',
            site_logo_image: data.site_logo_image || '',
            site_title: data.site_title || 'LUMORGE'
          });
        }
      } catch (error) {
        console.error('Failed to fetch settings:', error);
      }
    };
    
    fetchSettings();
  }, [isMounted]);
  
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  // 当菜单打开时，禁止页面滚动
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);

  // 处理搜索按钮点击
  const handleSearchClick = () => {
    setIsSearchOpen(true);
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  // 渲染LOGO
  const renderLogo = () => {
    // 如果未挂载，使用默认LOGO（确保服务器端渲染一致）
    if (!isMounted) {
      return <DefaultLogo />;
    }
    
    // 如果是图片LOGO模式且有图片路径
    if (settings.site_logo_type === 'image' && settings.site_logo_image) {
      // Ensure the image path is absolute, pointing to the backend
      const imageUrl = settings.site_logo_image.startsWith('http') 
        ? settings.site_logo_image 
        : `${API_BASE_URL}${settings.site_logo_image}`;
        
      return (
        <div className="relative h-10 w-40"> {/* Adjust w-40 (width) as needed for your logo aspect ratio */}
          <Image 
            src={imageUrl}
            alt={settings.site_title || 'Site Logo'}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100px, 160px"
          />
        </div>
      );
    }
    
    // 处理文本LOGO的样式
    const logoText = settings.site_logo_text || 'LUMORGE';
    
    // 特殊处理LUMORGE文本 - 使用蓝色突出显示前两个字母
    // 如果LOGO文本是LUMORGE，则特殊处理，否则正常显示
    if (logoText.toUpperCase() === 'LUMORGE') {
      return (
        <div className="text-white font-bold text-2xl tracking-tighter transition-all duration-300 transform group-hover:scale-105">
          <span className="text-[#0052CC]">LU</span>MORGE
        </div>
      );
    }
    // Default text logo rendering for other texts
    return (
      <div className="text-white font-bold text-2xl tracking-tighter transition-all duration-300 transform group-hover:scale-105">
        {logoText}
      </div>
    );
  };

  return (
    <>
      <header className={`fixed top-0 left-0 w-full h-20 bg-[#0A1F44] flex items-center z-50 transition-all duration-300 ${scrolled ? 'shadow-lg' : ''}`}>
        <div className="container mx-auto flex items-center justify-between max-w-[1200px] px-8">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            {renderLogo()}
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex flex-1 justify-center">
            <ul className="flex gap-8">
              {navItems.map((item) => (
                <li key={item.id || item.name}>
                  <Link 
                    href={item.link} 
                    target={item.target || '_self'}
                    className="text-white font-medium hover:text-[#0052CC] transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-[#0052CC] after:transition-all hover:after:w-full"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          
          {/* Desktop Search */}
          <div className="hidden lg:flex items-center gap-4">
            <button 
              className="text-white hover:text-[#0052CC] p-2 transition-transform hover:scale-110"
              onClick={handleSearchClick}
              aria-label="Search"
            >
              <Search size={22} />
            </button>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center">
            <button 
              className="text-white flex items-center justify-center p-2 focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="fixed inset-0 top-20 bg-[#0A1F44] z-40 overflow-y-auto lg:hidden">
            <div className="container mx-auto px-8 py-8">
              <div className="flex flex-col space-y-6">
                {/* 移动端搜索框 */}
                <div className="relative">
                  <button
                    onClick={handleSearchClick}
                    className="w-full py-3 pl-4 pr-10 rounded-lg bg-[#0A1F44] border border-gray-600 text-left text-white focus:outline-none"
                  >
                    Search products, solutions...
                  </button>
                  <Search className="absolute right-3 top-3 text-gray-400" size={20} />
                </div>
                
                {/* 移动端导航菜单 */}
                <nav>
                  <ul className="flex flex-col space-y-4">
                    {navItems.map((item) => (
                      <li key={item.id || item.name}>
                        <Link 
                          href={item.link} 
                          target={item.target || '_self'}
                          onClick={() => setIsMenuOpen(false)}
                          className="block py-2 text-lg text-white hover:text-[#0052CC] transition-colors"
                        >
                          {item.name}
                        </Link>
                        <div className="mt-2 border-b border-gray-700"></div>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* 搜索模态框 */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
} 