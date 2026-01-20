"use client";

import { useState, useEffect, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Search, ArrowRight, Filter, ArrowLeft } from "lucide-react";
import { getProducts } from "@/utils/api";
import Link from "next/link";
import Image from "next/image";

export default function SearchResultPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get("q") || "";
  const [searchInput, setSearchInput] = useState(query);
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [products, setProducts] = useState<any[]>([]);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Load products from API
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const productsData = await getProducts();
        setProducts(productsData || []);
        console.log("Products loaded from API for search:", productsData?.length || 0);
      } catch (error) {
        console.error("Failed to load products:", error);
        setProducts([]);
      }
    };

    loadProducts();
  }, []);

  // Focus search input on page load
  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  // Perform search when query changes
  useEffect(() => {
    if (query && products.length > 0) {
      performSearch(query);
    } else {
      setResults([]);
      setLoading(false);
    }
  }, [query, products]);

  // Function to perform search
  const performSearch = (searchQuery: string) => {
    setLoading(true);
    
    // Reduced delay for better UX - feels more responsive
    setTimeout(() => {
      try {
        const filteredProducts = products.filter((product: any) => 
          product.name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
          product.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category?.toLowerCase().includes(searchQuery.toLowerCase())
        );

        setResults(filteredProducts);
      } catch (error) {
        console.error("Search error:", error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 150); // Reduced delay for better responsiveness
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchInput.trim())}`);
    }
  };

  // Get unique categories from results
  const categories = [...new Set(results.map(product => product.category))];

  // Filter results by active category
  const filteredResults = activeCategory 
    ? results.filter(product => product.category === activeCategory)
    : results;

  // For each product select a background color
  const getBgColor = (categoryName: string) => {
    const colors: Record<string, string> = {
      'display': 'from-blue-600/20 to-blue-600/5',
      'control': 'from-purple-600/20 to-purple-600/5',
      'connectivity': 'from-green-600/20 to-green-600/5',
      'analytics': 'from-yellow-600/20 to-yellow-600/5',
      'security': 'from-red-600/20 to-red-600/5',
      'infrastructure': 'from-orange-600/20 to-orange-600/5',
      'default': 'from-gray-600/20 to-gray-600/5'
    };

    return colors[categoryName] || colors.default;
  };

  // Category badge style
  const getCategoryBadgeStyle = (categoryName: string) => {
    const colors: Record<string, string> = {
      'display': 'bg-blue-100 text-blue-800',
      'control': 'bg-purple-100 text-purple-800',
      'connectivity': 'bg-green-100 text-green-800',
      'analytics': 'bg-yellow-100 text-yellow-800',
      'security': 'bg-red-100 text-red-800',
      'infrastructure': 'bg-orange-100 text-orange-800',
      'default': 'bg-gray-100 text-gray-800'
    };

    return colors[categoryName] || colors.default;
  };

  return (
    <div className="min-h-screen bg-[#0A1F44]">
      {/* Page header area */}
      <div className="bg-gradient-to-b from-[#091836] to-[#0A1F44] pt-32 pb-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-white text-3xl font-bold">Search Results</h1>
            <Link href="/" className="text-gray-300 hover:text-white flex items-center">
              <ArrowLeft size={16} className="mr-1" />
              Back to Home
            </Link>
          </div>
          
          <form onSubmit={handleSubmit} className="relative mb-6">
            <div className="relative bg-[#162B50] rounded-lg overflow-hidden shadow-md border border-[#2A3F64]">
              <div className="flex items-center p-4">
                <Search size={20} className="text-gray-300 mr-3" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Refine your search..."
                  className="flex-1 py-2 text-lg outline-none placeholder-gray-400 bg-transparent text-white"
                  autoComplete="off"
                />
                {searchInput !== query && (
                  <button
                    type="submit"
                    className="px-4 py-1.5 bg-[#0052CC] hover:bg-[#0046A8] text-white rounded-md transition-colors"
                  >
                    Search
                  </button>
                )}
              </div>
            </div>
          </form>
          
          <div className="flex items-center mt-6 text-gray-300">
            <Search size={18} className="mr-2" />
            <p>Found <span className="font-semibold text-white">{results.length}</span> results for "<span className="text-white">{query}</span>"</p>
          </div>
        </div>
      </div>

      {/* Filter options */}
      {categories.length > 1 && (
        <div className="bg-[#0F2548] py-4 border-y border-[#2A3F64] sticky top-20 z-10">
          <div className="container mx-auto max-w-5xl px-4">
            <div className="flex items-center overflow-x-auto pb-2 -mx-2">
              <div className="flex items-center text-gray-300 px-2">
                <Filter size={16} className="mr-2" />
                <span className="text-sm">Filter:</span>
              </div>
              <button
                onClick={() => setActiveCategory(null)}
                className={`whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-medium transition-colors mx-1 ${
                  activeCategory === null
                    ? 'bg-[#0052CC] text-white'
                    : 'text-gray-300 hover:bg-[#1A2F54] border border-[#2A3F64]'
                }`}
              >
                All
              </button>
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-medium transition-colors mx-1 ${
                    activeCategory === category
                      ? 'bg-[#0052CC] text-white'
                      : 'text-gray-300 hover:bg-[#1A2F54] border border-[#2A3F64]'
                  }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Search results area */}
      <div className="container mx-auto max-w-5xl px-4 py-12">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-pulse flex flex-col items-center">
              <div className="w-16 h-16 border-4 border-[#0052CC] border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-white">Searching...</p>
            </div>
          </div>
        ) : filteredResults.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResults.map(product => (
              <Link 
                href={`/products/${product.id}`} 
                key={product.id}
                className="bg-[#162B50] hover:bg-[#1A2F54] rounded-xl shadow-lg border border-[#2A3F64] overflow-hidden flex flex-col transition-all duration-300 hover:shadow-blue-900/20 hover:-translate-y-1"
              >
                {/* Product image */}
                <div className="relative h-48 overflow-hidden bg-gradient-to-b from-[#091836] to-[#0A1F44]">
                  <div className={`absolute inset-0 bg-gradient-to-br ${getBgColor(product.category)}`}></div>
                  <div className="relative w-full h-full flex items-center justify-center p-8">
                    <Image
                      src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80"
                      alt={product.name}
                      fill
                      className="object-cover opacity-80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#162B50] via-transparent to-transparent"></div>
                  </div>
                </div>
                
                {/* Product info */}
                <div className="p-5 flex-1 flex flex-col">
                  <div className="mb-3">
                    <span className={`inline-block px-2 py-1 text-xs font-medium rounded-md ${getCategoryBadgeStyle(product.category)}`}>
                      {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{product.name}</h3>
                  <p className="text-gray-300 text-sm flex-1">{product.description.substring(0, 120)}...</p>
                  
                  <div className="mt-4 pt-4 border-t border-[#2A3F64] flex items-center justify-between">
                    <span className="text-sm text-gray-400">
                      {product.tags && product.tags.join(", ")}
                    </span>
                    <span className="text-[#3E85F3] hover:text-[#5A9AFF] text-sm font-medium flex items-center">
                      View details
                      <ArrowRight size={14} className="ml-1" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-[#162B50] rounded-xl border border-[#2A3F64] shadow-lg mx-auto max-w-3xl">
            <div className="text-8xl mb-6">🔍</div>
            <h2 className="text-2xl font-semibold text-white mb-2">No matching results found</h2>
            <p className="text-gray-300 mb-8">Try using different keywords or browse our product catalog</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/products" className="inline-flex items-center px-6 py-3 bg-[#0052CC] text-white font-medium rounded-lg hover:bg-[#0046A8] transition-colors">
                Browse All Products
              </Link>
              <Link href="/" className="inline-flex items-center px-6 py-3 border border-[#2A3F64] text-white font-medium rounded-lg hover:bg-[#1A2F54] transition-colors">
                Back to Home
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 