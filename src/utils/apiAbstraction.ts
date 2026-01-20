// API Abstraction Layer - Provides easy backend integration interface
// This file defines the contract for switching between mock data and real API calls

export interface ApiConfig {
  baseUrl?: string;
  timeout?: number;
  headers?: Record<string, string>;
  useMockData?: boolean;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// API endpoint definitions for future backend integration
export const API_ENDPOINTS = {
  // Navigation
  NAVIGATION: '/api/navigation',
  
  // Hero Banner
  HERO_BANNER: '/api/hero-banner',
  
  // Products
  PRODUCTS: '/api/products',
  PRODUCTS_FEATURED: '/api/products/featured',
  PRODUCT_BY_ID: (id: string) => `/api/products/${id}`,
  
  // Applications
  APPLICATIONS: '/api/applications',
  APPLICATIONS_PUBLIC: '/api/applications/public',
  APPLICATION_BY_SLUG: (slug: string) => `/api/applications/${slug}`,
  APPLICATION_CATEGORIES: '/api/applications/categories',
  
  // Content/News
  NEWS: '/api/news',
  CONTENT: '/api/content',
  
  // Settings
  SETTINGS: '/api/settings',
  
  // Support
  SUPPORT_SUBJECTS: '/api/support/subjects',
  SUPPORT_TICKET: '/api/support/ticket',
  SUPPORT_KPI: '/api/support/kpi',
  SUPPORT_CONTACT: '/api/support/contact'
} as const;

// Default API configuration
const DEFAULT_CONFIG: ApiConfig = {
  baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  useMockData: process.env.NODE_ENV === 'development' || !process.env.NEXT_PUBLIC_API_BASE_URL
};

let currentConfig: ApiConfig = { ...DEFAULT_CONFIG };

// Configuration management
export const configureApi = (config: Partial<ApiConfig>) => {
  currentConfig = { ...currentConfig, ...config };
  console.log('[API Config] Updated configuration:', currentConfig);
};

export const getApiConfig = (): ApiConfig => currentConfig;

// HTTP client abstraction
export class ApiClient {
  private config: ApiConfig;

  constructor(config?: Partial<ApiConfig>) {
    this.config = { ...currentConfig, ...config };
  }

  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    if (this.config.useMockData) {
      throw new Error('Mock data mode - use mock API functions instead');
    }

    const url = `${this.config.baseUrl}${endpoint}`;
    const requestOptions: RequestInit = {
      ...options,
      headers: {
        ...this.config.headers,
        ...options.headers,
      },
    };

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.config.timeout);

      const response = await fetch(url, {
        ...requestOptions,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      console.error(`[API Client] Request failed for ${endpoint}:`, error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.makeRequest<T>(endpoint, { method: 'GET' });
  }

  async post<T>(endpoint: string, data: any): Promise<ApiResponse<T>> {
    return this.makeRequest<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async put<T>(endpoint: string, data: any): Promise<ApiResponse<T>> {
    return this.makeRequest<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.makeRequest<T>(endpoint, { method: 'DELETE' });
  }
}

// Global API client instance
export const apiClient = new ApiClient();

// Utility functions for backend integration
export const switchToBackendApi = (baseUrl: string, headers?: Record<string, string>) => {
  configureApi({
    baseUrl,
    useMockData: false,
    headers: { ...DEFAULT_CONFIG.headers, ...headers }
  });
  console.log('[API] Switched to backend API mode');
};

export const switchToMockData = () => {
  configureApi({ useMockData: true });
  console.log('[API] Switched to mock data mode');
};

// Environment detection
export const isUsingMockData = (): boolean => {
  return currentConfig.useMockData ?? true;
};

// API health check utility
export const checkApiHealth = async (): Promise<boolean> => {
  if (isUsingMockData()) {
    console.log('[API Health] Using mock data - health check skipped');
    return true;
  }

  try {
    const response = await apiClient.get('/api/health');
    return response.success;
  } catch (error) {
    console.error('[API Health] Health check failed:', error);
    return false;
  }
};

// Migration utilities for switching from mock to real API
export const createApiMigrationGuide = () => {
  return {
    steps: [
      '1. Set up your backend API server',
      '2. Configure environment variables (NEXT_PUBLIC_API_BASE_URL)',
      '3. Update API endpoints in apiAbstraction.ts if needed',
      '4. Test API connectivity with checkApiHealth()',
      '5. Switch to backend mode with switchToBackendApi()',
      '6. Update components to handle real API responses'
    ],
    environmentVariables: {
      'NEXT_PUBLIC_API_BASE_URL': 'Your backend API base URL (e.g., https://api.yoursite.com)',
      'NODE_ENV': 'Set to "production" to disable mock data by default'
    },
    exampleUsage: `
// In your environment file (.env.local):
NEXT_PUBLIC_API_BASE_URL=https://api.yoursite.com

// In your application initialization:
import { switchToBackendApi, checkApiHealth } from '@/utils/apiAbstraction';

// Switch to backend API
switchToBackendApi('https://api.yoursite.com', {
  'Authorization': 'Bearer your-token'
});

// Check if API is available
const isHealthy = await checkApiHealth();
if (!isHealthy) {
  // Fallback to mock data or show error
  switchToMockData();
}
    `
  };
};

export default apiClient;