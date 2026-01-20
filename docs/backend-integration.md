# Backend Integration Guide

This guide explains how to integrate the TechSports Frontend with a real backend API, replacing the mock data system with live data.

## Overview

The frontend is designed with a clean separation between the UI and data layer, making backend integration straightforward. The main integration points are:

- API layer (`src/utils/api.ts`)
- Configuration (`src/utils/apiAbstraction.ts`)
- Environment variables
- Build configuration

## Integration Steps

### 1. Environment Configuration

Create environment files for different deployment stages:

**`.env.local` (Development)**
```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api
NEXT_PUBLIC_USE_MOCK_DATA=false
NEXT_PUBLIC_API_TIMEOUT=10000
```

**`.env.production` (Production)**
```env
NEXT_PUBLIC_API_BASE_URL=https://api.techsports.com
NEXT_PUBLIC_USE_MOCK_DATA=false
NEXT_PUBLIC_API_TIMEOUT=30000
```

### 2. API Configuration Update

Update `src/utils/apiAbstraction.ts` to use environment variables:

```typescript
// Current configuration
const defaultConfig: ApiConfig = {
  baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000',
  timeout: parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT || '10000'),
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN || ''}`,
  },
  useMockData: process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true',
};
```

### 3. API Layer Migration

Replace mock data calls with HTTP requests in `src/utils/api.ts`:

#### Before (Mock Data)
```typescript
export async function getProducts(): Promise<Product[]> {
  console.log('[API - getProducts] Loading products from mock data');
  return productsData;
}
```

#### After (Real API)
```typescript
export async function getProducts(): Promise<Product[]> {
  if (apiConfig.useMockData) {
    console.log('[API - getProducts] Loading products from mock data');
    return productsData;
  }

  try {
    console.log('[API - getProducts] Fetching products from backend');
    const response = await fetch(`${apiConfig.baseUrl}/products`, {
      method: 'GET',
      headers: apiConfig.headers,
      signal: AbortSignal.timeout(apiConfig.timeout),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const products = await response.json();
    return products;
  } catch (error) {
    console.error('[API - getProducts] Error fetching products:', error);
    // Fallback to mock data on error
    return productsData;
  }
}
```

### 4. Backend API Requirements

Your backend API should provide the following endpoints:

#### Products API
```
GET /api/products
GET /api/products/:id
GET /api/products/featured
GET /api/products?category=:category
```

**Response Format:**
```json
{
  "id": "wifi-pro",
  "name": "WiFi Pro System",
  "category": "connectivity",
  "price": 2999,
  "description": "Professional wireless connectivity solution",
  "specifications": {
    "range": "500m",
    "bandwidth": "1Gbps"
  },
  "images": ["/images/products/wifi-pro-1.jpg"],
  "featured": true,
  "inStock": true
}
```

#### Applications API
```
GET /api/applications
GET /api/applications/:slug
GET /api/categories
```

#### Content API
```
GET /api/news
GET /api/settings
GET /api/navigation
GET /api/hero-banner
```

#### Support API
```
POST /api/support/ticket
```

### 5. Authentication Integration

If your backend requires authentication:

```typescript
// Add to apiAbstraction.ts
export function setAuthToken(token: string) {
  apiConfig.headers.Authorization = `Bearer ${token}`;
}

export function clearAuthToken() {
  delete apiConfig.headers.Authorization;
}

// Usage in components
import { setAuthToken } from '../utils/apiAbstraction';

// After user login
setAuthToken(userToken);
```

### 6. Error Handling

Implement comprehensive error handling:

```typescript
export async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${apiConfig.baseUrl}${endpoint}`;
  
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        ...apiConfig.headers,
        ...options.headers,
      },
      signal: AbortSignal.timeout(apiConfig.timeout),
    });

    if (!response.ok) {
      if (response.status === 401) {
        // Handle authentication error
        throw new AuthError('Authentication required');
      }
      if (response.status === 404) {
        // Handle not found
        throw new NotFoundError('Resource not found');
      }
      throw new ApiError(`HTTP ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    if (error instanceof TypeError) {
      // Network error
      throw new NetworkError('Network connection failed');
    }
    throw error;
  }
}
```

### 7. Caching Strategy

Implement intelligent caching for better performance:

```typescript
// Simple in-memory cache
const cache = new Map<string, { data: any; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export async function getCachedData<T>(
  key: string,
  fetcher: () => Promise<T>
): Promise<T> {
  const cached = cache.get(key);
  
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }

  const data = await fetcher();
  cache.set(key, { data, timestamp: Date.now() });
  return data;
}

// Usage
export async function getProducts(): Promise<Product[]> {
  return getCachedData('products', async () => {
    const response = await apiRequest<Product[]>('/products');
    return response;
  });
}
```

### 8. Loading States

Update components to handle loading states:

```typescript
// In components
import { useState, useEffect } from 'react';

export function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);
        const data = await getProducts();
        setProducts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load products');
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  if (loading) return <div>Loading products...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return (
    <div>
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
```

### 9. Image Handling

Update image paths for backend-served images:

```typescript
// Utility function for image URLs
export function getImageUrl(path: string): string {
  if (path.startsWith('http')) {
    return path; // Already absolute URL
  }
  
  if (apiConfig.useMockData) {
    return path; // Use local images
  }
  
  return `${apiConfig.baseUrl}/images${path}`;
}

// Usage in components
<img src={getImageUrl(product.images[0])} alt={product.name} />
```

### 10. Build Configuration

Update `next.config.js` for production builds:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'localhost',
      'api.techsports.com', // Add your API domain
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_BASE_URL}/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
```

## Testing Backend Integration

### 1. Development Testing

Start with mock data disabled:
```bash
NEXT_PUBLIC_USE_MOCK_DATA=false npm run dev
```

### 2. API Health Check

Add health check endpoint:
```typescript
export async function checkApiHealth(): Promise<boolean> {
  try {
    const response = await fetch(`${apiConfig.baseUrl}/health`);
    return response.ok;
  } catch {
    return false;
  }
}
```

### 3. Fallback Testing

Test fallback to mock data when API is unavailable:
```typescript
export async function getProductsWithFallback(): Promise<Product[]> {
  try {
    return await getProductsFromApi();
  } catch (error) {
    console.warn('API unavailable, using mock data:', error);
    return productsData;
  }
}
```

## Deployment Considerations

### Environment Variables

Set production environment variables:
- `NEXT_PUBLIC_API_BASE_URL`
- `NEXT_PUBLIC_USE_MOCK_DATA=false`
- `NEXT_PUBLIC_API_TIMEOUT`
- `NEXT_PUBLIC_API_TOKEN` (if required)

### CORS Configuration

Ensure your backend allows requests from your frontend domain:
```javascript
// Backend CORS configuration
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://techsports.com',
    'https://www.techsports.com'
  ],
  credentials: true
}));
```

### CDN Integration

For static assets served from CDN:
```typescript
const CDN_BASE_URL = process.env.NEXT_PUBLIC_CDN_URL;

export function getCdnUrl(path: string): string {
  if (CDN_BASE_URL && !path.startsWith('http')) {
    return `${CDN_BASE_URL}${path}`;
  }
  return path;
}
```

## Monitoring and Analytics

### API Performance Monitoring

```typescript
export async function monitoredApiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const startTime = Date.now();
  
  try {
    const result = await apiRequest<T>(endpoint, options);
    
    // Log successful request
    console.log(`API Success: ${endpoint} (${Date.now() - startTime}ms)`);
    
    return result;
  } catch (error) {
    // Log failed request
    console.error(`API Error: ${endpoint} (${Date.now() - startTime}ms)`, error);
    throw error;
  }
}
```

### Error Tracking

Integrate with error tracking services:
```typescript
import * as Sentry from '@sentry/nextjs';

export function reportApiError(error: Error, context: any) {
  Sentry.captureException(error, {
    tags: {
      component: 'api',
    },
    extra: context,
  });
}
```

## Gradual Migration Strategy

For large applications, consider a gradual migration:

1. **Phase 1**: Keep mock data as fallback
2. **Phase 2**: Migrate non-critical endpoints first
3. **Phase 3**: Add comprehensive error handling
4. **Phase 4**: Remove mock data dependencies
5. **Phase 5**: Optimize performance and caching

This approach ensures the application remains functional throughout the migration process.

## Troubleshooting

### Common Issues

**CORS Errors**
- Check backend CORS configuration
- Verify allowed origins include your domain

**Authentication Failures**
- Verify API token format and expiration
- Check token storage and retrieval

**Network Timeouts**
- Adjust timeout values in configuration
- Implement retry logic for failed requests

**Image Loading Issues**
- Verify image URL construction
- Check CDN configuration and permissions

### Debug Tools

Enable detailed API logging:
```typescript
const DEBUG_API = process.env.NODE_ENV === 'development';

if (DEBUG_API) {
  console.log('API Request:', { url, options });
  console.log('API Response:', response);
}
```

This comprehensive guide should help you successfully integrate your frontend with any backend API while maintaining the flexibility to fall back to mock data when needed.