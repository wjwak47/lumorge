"use client";

import { useState, useEffect, useRef } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Search, X, ArrowRight } from "lucide-react";
import { getProducts } from "@/utils/api";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SearchModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showNoResults, setShowNoResults] = useState(false);
  const [debugMsg, setDebugMsg] = useState("");
  const [products, setProducts] = useState<any[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // 从API加载产品数据
  useEffect(() => {
    const loadProducts = async () => {
      setIsLoadingProducts(true);
      try {
        const productsData = await getProducts();
        setProducts(productsData || []);
        console.log("Products loaded from API:", productsData?.length || 0);
      } catch (error) {
        console.error("Failed to load products for search:", error);
        setProducts([]);
      } finally {
        setIsLoadingProducts(false);
      }
    };

    loadProducts();
  }, []);

  // Reset search when modal opens and focus the input
  useEffect(() => {
    if (isOpen) {
      setSearchQuery("");
      setSearchResults([]);
      setShowNoResults(false);
      setDebugMsg("");
      
      // Focus the search input when modal opens
      setTimeout(() => {
        if (searchInputRef.current) {
          searchInputRef.current.focus();
        }
      }, 100);
    }
  }, [isOpen]);

  // 直接在输入变化时处理搜索
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    
    // 至少输入1个字符才开始搜索
    if (value.length >= 1) {
      // 添加短延迟，避免每个按键都触发搜索
      setTimeout(() => {
        performSearch(value);
      }, 100);
    } else {
      setSearchResults([]);
      setShowNoResults(false);
    }
  };

  // 执行搜索的函数
  const performSearch = (query: string) => {
    setIsSearching(true);
    setDebugMsg(`正在搜索: "${query}"`);
    
    try {
      // 确保products数据可用
      if (!products || !Array.isArray(products)) {
        console.error("Products 数据无效:", products);
        setDebugMsg("产品数据加载失败");
        setSearchResults([]);
        setShowNoResults(true);
        return;
      }
      
      // 放宽搜索条件 - 如果是部分词也能匹配
      const lowerQuery = query.toLowerCase();
      const filteredResults = products.filter((product: any) => {
        // 检查产品名称
        if (product.name?.toLowerCase().includes(lowerQuery)) return true;
        
        // 检查产品描述
        if (product.description?.toLowerCase().includes(lowerQuery)) return true;
        
        // 检查分类名称
        if (product.category?.toLowerCase().includes(lowerQuery)) return true;
        
        // 检查标签
        if (product.tags && product.tags.some((tag: any) => 
          tag.toLowerCase().includes(lowerQuery)
        )) return true;
        
        // 检查ID
        if (product.id?.toString().toLowerCase().includes(lowerQuery)) return true;
        
        return false;
      });
      
      // 记录搜索结果信息
      console.log(`搜索"${query}"找到${filteredResults.length}个结果`);
      setDebugMsg(`找到${filteredResults.length}个匹配项`);
      
      // 最多显示5个结果
      const limitedResults = filteredResults.slice(0, 5);
      
      setSearchResults(limitedResults);
      setShowNoResults(filteredResults.length === 0);
    } catch (error) {
      console.error("搜索错误:", error);
      setDebugMsg(`搜索出错: ${error}`);
      setSearchResults([]);
      setShowNoResults(true);
    } finally {
      setIsSearching(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Close on Escape
    if (e.key === "Escape") {
      onClose();
    }
    
    // Submit search on Enter
    if (e.key === "Enter" && searchQuery.trim()) {
      e.preventDefault();
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      onClose();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      onClose();
    }
  };

  // Get unique categories from results for group display
  const categories = [...new Set(searchResults.map(product => product.category))];

  return (
    <Dialog open={isOpen} onOpenChange={(open: boolean) => !open && onClose()}>
      <DialogContent className="max-w-3xl p-0 gap-0 bg-[#0A1F44] border-[#2A3F64] shadow-2xl rounded-xl overflow-hidden">
        <DialogTitle className="sr-only">Search Products</DialogTitle>
        <div className="relative">
          <form onSubmit={handleSubmit} className="relative">
            <div className="flex items-center px-6 py-5 border-b border-[#2A3F64]">
              <Search className="text-gray-300 w-5 h-5 mr-3" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={handleInputChange}
                placeholder="Search products, solutions..."
                className="flex-grow bg-transparent text-white text-lg font-medium outline-none placeholder:text-gray-400"
                autoComplete="off"
                onKeyDown={handleKeyDown}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    setSearchResults([]);
                    setShowNoResults(false);
                  }}
                  className="text-gray-400 hover:text-gray-200 focus:outline-none p-1"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
              <button 
                type="button"
                onClick={onClose} 
                className="ml-3 p-2 rounded-full bg-[#162B50] hover:bg-[#1F3A68] text-gray-300"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </form>

          {/* 调试信息 - 开发时可见 */}
          {debugMsg && (
            <div className="px-6 py-2 text-xs text-blue-400 border-b border-[#2A3F64]">
              {debugMsg}
            </div>
          )}

          {/* Search results */}
          <div className="max-h-[70vh] overflow-y-auto custom-scrollbar">
            {isSearching && (
              <div 
                className="flex justify-center py-8"
                style={{ opacity: 1, transition: 'opacity 0.2s ease-in-out' }}
              >
                <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}

            {!isSearching && searchQuery.length >= 1 && (
              <div 
                className="transition-opacity duration-200 ease-in-out"
                style={{ opacity: 1 }}
              >
                {searchResults.length > 0 ? (
                  <div className="py-3">
                    {/* Group results by category */}
                    {categories.map(category => (
                      <div key={category} className="mb-4">
                        <div className="px-6 py-2">
                          <h3 className="text-sm font-medium uppercase text-blue-400">
                            {category}
                          </h3>
                        </div>
                        
                        {searchResults
                          .filter(product => product.category === category)
                          .map((product) => (
                            <Link
                              href={`/products/${product.id}`}
                              key={product.id}
                              onClick={onClose}
                              className="flex items-center px-6 py-4 hover:bg-[#162B50] transition-colors group"
                            >
                              <div className="flex-1">
                                <h3 className="text-white font-medium line-clamp-1 group-hover:text-blue-400 transition-colors">
                                  {product.name}
                                </h3>
                                <p className="text-gray-400 text-sm line-clamp-1 mt-1">
                                  {product.description}
                                </p>
                              </div>
                              <ArrowRight className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-200" />
                            </Link>
                          ))}
                      </div>
                    ))}
                    
                    <div className="p-4 border-t border-[#2A3F64] flex justify-center">
                      <Link
                        href={`/search?q=${encodeURIComponent(searchQuery)}`}
                        onClick={onClose}
                        className="px-4 py-2 text-sm text-white bg-[#0052CC] hover:bg-[#0046A8] rounded-md transition-colors inline-flex items-center"
                      >
                        See all results
                        <ArrowRight className="w-3.5 h-3.5 ml-1" />
                      </Link>
                    </div>
                  </div>
                ) : showNoResults ? (
                  <div className="py-12 px-6 text-center">
                    <p className="text-gray-300 mb-2">No results found for "{searchQuery}"</p>
                    <p className="text-sm text-gray-400">
                      Try a different search term or browse our products
                    </p>
                  </div>
                ) : null}
              </div>
            )}

            {!isSearching && searchQuery.length === 0 && (
              <div className="p-6">
                <div className="text-gray-400 mb-5">
                  <p>Recent searches</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {["cloud solutions", "security", "display", "analytics"].map(
                    (term) => (
                      <button
                        key={term}
                        onClick={() => {
                          setSearchQuery(term);
                          performSearch(term);
                        }}
                        className="px-3 py-1.5 bg-[#162B50] hover:bg-[#1F3A68] rounded-md text-gray-300 text-sm"
                      >
                        {term}
                      </button>
                    )
                  )}
                </div>
                
                <div className="mt-8 border-t border-[#2A3F64] pt-6">
                  <div className="text-gray-400 mb-5">
                    <p>Popular categories</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {["display", "control", "connectivity", "analytics"].map(
                      (category) => (
                        <Link
                          key={category}
                          href={`/search?q=${category}`}
                          onClick={onClose}
                          className="flex items-center p-3 bg-[#162B50] hover:bg-[#1F3A68] rounded-lg text-white transition-colors group"
                        >
                          <div className="flex-1">
                            <span className="capitalize">{category}</span>
                          </div>
                          <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
                        </Link>
                      )
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 