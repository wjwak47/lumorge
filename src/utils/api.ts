// Mock API layer - replaces HTTP requests with static mock data
import { getCachedSettings, cacheSettings } from './settingsCache';

// Import mock data with error handling
let productsData: any[] = [];
let applicationsData: any[] = [];
let newsData: any[] = [];
let settingsData: any = {};
let navigationData: any[] = [];
let heroBannerData: any = {};

// Load mock data with fallback handling
try {
  productsData = require('@/data/mock/products.json');
} catch (error) {
  console.warn('[Mock Data] Failed to load products.json:', error);
  productsData = [];
}

try {
  applicationsData = require('@/data/mock/applications.json');
} catch (error) {
  console.warn('[Mock Data] Failed to load applications.json:', error);
  applicationsData = [];
}

try {
  newsData = require('@/data/mock/news.json');
} catch (error) {
  console.warn('[Mock Data] Failed to load news.json:', error);
  newsData = [];
}

try {
  settingsData = require('@/data/mock/settings.json');
} catch (error) {
  console.warn('[Mock Data] Failed to load settings.json:', error);
  settingsData = {};
}

try {
  navigationData = require('@/data/mock/navigation.json');
} catch (error) {
  console.warn('[Mock Data] Failed to load navigation.json:', error);
  navigationData = [];
}

try {
  heroBannerData = require('@/data/mock/hero-banner.json');
} catch (error) {
  console.warn('[Mock Data] Failed to load hero-banner.json:', error);
  heroBannerData = {};
}

// Type definitions
interface Product {
  id: string | number;
  name: string;
  category?: string | { id: number, name: string };
  description?: string;
  image?: string;
  images?: string[] | string;
  features?: string[] | string;
  iconName?: string;
  highlight?: boolean;
  tags?: string[];
  specifications?: any;
  useCases?: any[];
}

interface Application {
  id: string;
  slug: string;
  title: string;
  category: string;
  summary: string;
  content: string;
  image: string;
  images?: string[];
  technologies?: string[];
  metrics?: any;
  isPublished: boolean;
  publishDate?: string;
  featured?: boolean;
}

interface NewsArticle {
  id: string;
  slug: string;
  title: string;
  content: string;
  summary: string;
  excerpt?: string;
  type: string;
  category?: string;
  image: string;
  images?: string[];
  author: string;
  publishDate: string;
  publishedAt?: string;
  isPublished: boolean;
  featured?: boolean;
  tags?: string[];
  readTime?: string;
}

interface NavItem {
  id?: number;
  name: string;
  link: string;
  order?: number;
  isVisible?: boolean;
  parentId?: number | null;
  target?: string;
}

// Simulate async behavior with delays
const simulateDelay = (ms: number = 100) => new Promise(resolve => setTimeout(resolve, ms));

// Data validation utilities
const validateMockData = (data: any, dataType: string): boolean => {
  if (!data) {
    console.warn(`[Mock Data Validation] ${dataType} is null or undefined`);
    return false;
  }
  
  if (Array.isArray(data) && data.length === 0) {
    console.warn(`[Mock Data Validation] ${dataType} array is empty`);
    return false;
  }
  
  if (typeof data === 'object' && Object.keys(data).length === 0) {
    console.warn(`[Mock Data Validation] ${dataType} object is empty`);
    return false;
  }
  
  return true;
};

// Error handling wrapper for mock data operations
const withErrorHandling = async <T>(
  operation: () => Promise<T> | T,
  fallback: T,
  operationName: string
): Promise<T> => {
  try {
    const result = await operation();
    return result;
  } catch (error) {
    console.error(`[API Error - ${operationName}] Operation failed:`, error);
    return fallback;
  }
};

// Mock navigation cache (simulating the original caching behavior)
let navigationCache: NavItem[] | null = null;
let navigationCacheTimestamp: number = 0;

export const clearNavigationCache = () => {
  navigationCache = null;
  navigationCacheTimestamp = 0;
};

// Get navigation data from mock
export const getNavigation = async (): Promise<NavItem[]> => {
  return withErrorHandling(async () => {
    await simulateDelay(50);
    
    // Check cache validity (10 second cache)
    const now = Date.now();
    if (navigationCache && (now - navigationCacheTimestamp < 10000)) {
      console.log('Using cached navigation data');
      return navigationCache;
    }

    console.log('Loading navigation from mock data');
    
    // Validate navigation data
    if (!validateMockData(navigationData, 'navigation')) {
      return getDefaultNavigation();
    }
    
    // Filter visible items and sort by order
    const visibleItems = navigationData
      .filter(item => item && item.isVisible)
      .sort((a, b) => (a.order || 0) - (b.order || 0));
    
    // Update cache
    navigationCache = visibleItems;
    navigationCacheTimestamp = now;
    
    return visibleItems;
  }, getDefaultNavigation(), 'getNavigation');
};

// Get hero banner data from mock
export const getHeroBannerData = async () => {
  return withErrorHandling(async () => {
    await simulateDelay(50);
    
    console.log('[API - getHeroBannerData] Loading hero banner from mock data');
    
    // Validate hero banner data
    if (!validateMockData(heroBannerData, 'hero banner')) {
      return getDefaultHeroBanner();
    }
    
    return heroBannerData;
  }, getDefaultHeroBanner(), 'getHeroBannerData');
};

// Get products from mock data
export const getProducts = async (): Promise<Product[]> => {
  return withErrorHandling(async () => {
    await simulateDelay(100);
    
    console.log('[API - getProducts] Loading products from mock data');
    
    // Validate products data
    if (!validateMockData(productsData, 'products')) {
      return getDefaultProducts();
    }
    
    // Process each product to ensure proper data types
    return productsData.map((product: any) => {
      if (!product || typeof product !== 'object') {
        console.warn('[API - getProducts] Invalid product data:', product);
        return null;
      }
      
      // Ensure arrays are properly typed
      const processedProduct: Product = {
        ...product,
        tags: Array.isArray(product.tags) ? product.tags : [],
        features: Array.isArray(product.features) ? product.features : [],
        images: Array.isArray(product.images) ? product.images : [product.image || ''],
      };
      
      // Ensure image fallback
      if (!processedProduct.image && processedProduct.images && processedProduct.images.length > 0) {
        processedProduct.image = processedProduct.images[0];
      }
      
      return processedProduct;
    }).filter((p): p is Product => p !== null); // Remove any null products
  }, getDefaultProducts(), 'getProducts');
};

// Get featured products from mock data
export const getFeaturedProducts = async (params?: { 
  limit?: number; 
  sort?: 'popular' | 'new' | 'featured'; 
  category?: string 
}): Promise<Product[]> => {
  return withErrorHandling(async () => {
    await simulateDelay(100);
    
    const limit = params?.limit ?? 8;
    const sort = params?.sort ?? 'featured';
    const category = params?.category;
    
    console.log(`[API - getFeaturedProducts] Loading featured products from mock data`);
    
    // Validate products data
    if (!validateMockData(productsData, 'products')) {
      return getDefaultProducts().slice(0, limit);
    }
    
    let filteredProducts = [...productsData];
    
    // Filter by category if specified
    if (category && category !== 'all') {
      filteredProducts = filteredProducts.filter(product => 
        product && product.category?.toLowerCase() === category.toLowerCase()
      );
    }
    
    // Filter featured products or apply sorting
    if (sort === 'featured') {
      filteredProducts = filteredProducts.filter(product => product && product.highlight);
    }
    
    // Sort products
    if (sort === 'popular') {
      filteredProducts = filteredProducts.filter(product => 
        product && product.tags && product.tags.includes('Popular')
      );
    } else if (sort === 'new') {
      filteredProducts = filteredProducts.filter(product => 
        product && product.tags && product.tags.includes('New')
      );
    }
    
    // Limit results
    const limitedProducts = filteredProducts.slice(0, limit);
    
    // Process products
    return limitedProducts.map((product: any) => {
      if (!product || typeof product !== 'object') {
        return null;
      }
      
      return {
        ...product,
        tags: Array.isArray(product.tags) ? product.tags : [],
        features: Array.isArray(product.features) ? product.features : [],
        images: Array.isArray(product.images) ? product.images : [product.image || ''],
      };
    }).filter(Boolean);
  }, [], 'getFeaturedProducts');
};

// Get single product by ID from mock data
export const getProductById = async (id: string): Promise<Product | null> => {
  await simulateDelay(50);
  
  try {
    console.log(`[API - getProductById] Loading product ${id} from mock data`);
    
    const product = productsData.find(p => p.id.toString() === id.toString());
    
    if (!product) {
      console.warn(`[API - getProductById] Product ${id} not found`);
      return getDefaultProductById(id);
    }
    
    // Process product data
    return {
      ...product,
      tags: Array.isArray(product.tags) ? product.tags : [],
      features: Array.isArray(product.features) ? product.features : [],
      images: Array.isArray(product.images) ? product.images : [product.image || ''],
    };
  } catch (error) {
    console.warn(`[API - getProductById] Failed to load product ${id}:`, error);
    return getDefaultProductById(id);
  }
};

// Get website settings from mock data
export const getSettings = async (keys?: string[]) => {
  await simulateDelay(50);
  
  try {
    console.log('[API - getSettings] Loading settings from mock data');
    
    let settings = { ...settingsData };
    
    // Filter by keys if specified
    if (keys && keys.length > 0) {
      const filteredSettings: any = {};
      keys.forEach(key => {
        if (settings.hasOwnProperty(key)) {
          filteredSettings[key] = (settings as any)[key];
        }
      });
      settings = filteredSettings;
    }
    
    // Cache settings
    cacheSettings(settings);
    
    return settings;
  } catch (error) {
    console.warn('[API - getSettings] Failed to load mock settings:', error);
    
    // Try cached settings
    const cached = getCachedSettings();
    if (cached && Object.keys(cached).length > 0) {
      return cached;
    }
    
    // Return default settings
    const defaults = getDefaultSettings();
    cacheSettings(defaults);
    return defaults;
  }
};

// Get news/content from mock data
export const getNews = async (): Promise<NewsArticle[]> => {
  await simulateDelay(100);
  
  try {
    console.log('[API - getNews] Loading news from mock data');
    
    return newsData
      .filter(article => article.isPublished && article.type === 'news')
      .sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());
  } catch (error) {
    console.error('[API - getNews] Failed to load mock news:', error);
    return [];
  }
};

// Get all content from mock data
export const getContents = async (): Promise<NewsArticle[]> => {
  await simulateDelay(100);
  
  try {
    console.log('[API - getContents] Loading content from mock data');
    
    return newsData
      .filter(article => article.isPublished)
      .sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());
  } catch (error) {
    console.error('[API - getContents] Failed to load mock content:', error);
    return [];
  }
};

// Application API from mock data
export const applicationApi = {
  // Get public applications
  getPublicApplications: async (category?: string): Promise<{ success: boolean; data: Application[] }> => {
    await simulateDelay(100);
    
    try {
      console.log('[API - getPublicApplications] Loading applications from mock data');
      
      let filteredApps = applicationsData.filter(app => app.isPublished);
      
      if (category && category !== 'All') {
        filteredApps = filteredApps.filter(app => 
          app.category.toLowerCase() === category.toLowerCase()
        );
      }
      
      return {
        success: true,
        data: filteredApps
      };
    } catch (error) {
      console.error('[API - getPublicApplications] Failed to load mock applications:', error);
      return { success: false, data: [] };
    }
  },

  // Get application by slug
  getApplicationBySlug: async (slug: string): Promise<{ success: boolean; data?: Application }> => {
    await simulateDelay(50);
    
    try {
      console.log(`[API - getApplicationBySlug] Loading application ${slug} from mock data`);
      
      const application = applicationsData.find(app => 
        app.slug === slug && app.isPublished
      );
      
      if (!application) {
        return { success: false };
      }
      
      return {
        success: true,
        data: application
      };
    } catch (error) {
      console.error(`[API - getApplicationBySlug] Failed to load application ${slug}:`, error);
      return { success: false };
    }
  },

  // Get public categories
  getPublicCategories: async (): Promise<{ success: boolean; data: string[] }> => {
    await simulateDelay(50);
    
    try {
      console.log('[API - getPublicCategories] Loading categories from mock data');
      
      // Extract unique categories from applications
      const categories = [...new Set(applicationsData.map(app => app.category))];
      
      return {
        success: true,
        data: categories
      };
    } catch (error) {
      console.error('[API - getPublicCategories] Failed to load categories:', error);
      return { success: true, data: [] };
    }
  }
};

// Support API (mock implementation)
export const supportApi = {
  getSubjects: async () => {
    await simulateDelay(50);
    return [
      { id: 1, name: 'Technical Support' },
      { id: 2, name: 'Sales Inquiry' },
      { id: 3, name: 'General Question' }
    ];
  },
  
  submitTicket: async (payload: any) => {
    await simulateDelay(200);
    console.log('[API - submitTicket] Mock ticket submission:', payload);
    return { success: true, message: 'Ticket submitted successfully' };
  },
  
  getKpi: async () => {
    await simulateDelay(50);
    return { avgResponseHours: 2, satisfactionPercent: 99 };
  },
  
  getContactInfo: async () => {
    await simulateDelay(50);
    return {
      email: settingsData.footer_email,
      phone: settingsData.footer_phone,
      address: settingsData.footer_address
    };
  }
};

// Helper functions
function getDefaultNavigation(): NavItem[] {
  return [
    { id: 1, name: 'Home', link: '/', order: 1, isVisible: true, parentId: null },
    { id: 2, name: 'Products', link: '/products', order: 2, isVisible: true, parentId: null },
    { id: 3, name: 'Applications', link: '/applications', order: 3, isVisible: true, parentId: null },
    { id: 4, name: 'Contact', link: '/contact', order: 4, isVisible: true, parentId: null }
  ];
}

function getDefaultHeroBanner() {
  return {
    _id: "default",
    name: "Default Banner",
    tagline: "INDUSTRY LEADER",
    titleLine1: "Next-Level",
    titleLine2: "Sports Technology",
    titleLine2Highlight: true,
    subtitle: "Powering world-class venues with cutting-edge solutions that transform the spectator and athlete experience.",
    primaryButtonText: "Our Solutions",
    primaryButtonActionType: "scroll" as const,
    primaryButtonTarget: "products",
    secondaryButtonText: "See Applications",
    secondaryButtonActionType: "scroll" as const,
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
  };
}

function getDefaultProducts(): Product[] {
  return [
    {
      id: "led-display-pro",
      name: "LED Display Pro",
      description: "Professional LED display for sports venues",
      category: "Display",
      image: "https://images.unsplash.com/photo-1603190287605-e6ade32fa852?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80",
      images: ["https://images.unsplash.com/photo-1603190287605-e6ade32fa852?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80"],
      features: ["High resolution", "Weather resistant", "Easy installation"],
      tags: ["Popular", "New"],
      iconName: "Monitor",
      highlight: true
    }
  ];
}

function getDefaultProductById(id: string): Product {
  const defaultProducts = getDefaultProducts();
  return {
    ...defaultProducts[0],
    id: id,
    name: `Product ${id}`,
    description: `This is product ${id}. Complete product information will be available soon.`
  };
}

function getDefaultSettings() {
  return {
    site_logo_type: 'text',
    site_logo_text: 'LUMORGE',
    site_logo_image: '',
    site_title: 'LUMORGE - Sports Technology Solutions',
    site_description: 'Professional sports venue technology solutions provider',
    site_keywords: 'sports technology,venue equipment,LED displays',
    footer_company_desc: 'Innovative technology solutions for sports venues worldwide since 2008.',
    footer_address: 'San Francisco, CA, USA',
    footer_email: 'info@lumorge.com',
    footer_phone: '+1 (888) TECH-SPT',
    footer_social_facebook: 'https://facebook.com/lumorge',
    footer_social_twitter: 'https://twitter.com/lumorge',
    footer_social_linkedin: 'https://linkedin.com/company/lumorge',
    footer_social_instagram: 'https://instagram.com/lumorge',
    footer_social_youtube: 'https://youtube.com/lumorge',
    footer_copyright: `© ${new Date().getFullYear()} Lumorge`,
    footer_privacy_url: '/privacy',
    footer_terms_url: '/terms'
  };
}

// Export default (maintaining compatibility)
export default {
  get: async (_url: string) => {
    // This is a compatibility layer for any remaining axios-style calls
    console.warn('Direct API calls are deprecated. Use specific API functions instead.');
    throw new Error('Direct API calls not supported in mock mode');
  }
};