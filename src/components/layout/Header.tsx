"use client";
import { Search, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import SearchModal from "../ui/SearchModal";

// 固定导航菜单
const NAV_ITEMS = [
  { name: "Home", link: "/" },
  { name: "Products", link: "/products" },
  { name: "Applications", link: "/applications" },
  { name: "Contact", link: "/contact" },
  { name: "About Us", link: "/about" },
  { name: "News", link: "/news" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

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

  return (
    <>
      <header className={`fixed top-0 left-0 w-full h-20 bg-[#0A1F44] flex items-center z-50 transition-all duration-300 ${scrolled ? 'shadow-lg' : ''}`}>
        <div className="container mx-auto flex items-center justify-between max-w-[1200px] px-8">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <div className="text-white font-bold text-2xl tracking-tighter transition-all duration-300 transform group-hover:scale-105">
              <span className="text-[#0052CC]">LU</span>MORGE
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex flex-1 justify-center">
            <ul className="flex gap-8">
              {NAV_ITEMS.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.link}
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
                    {NAV_ITEMS.map((item) => (
                      <li key={item.name}>
                        <Link
                          href={item.link}
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