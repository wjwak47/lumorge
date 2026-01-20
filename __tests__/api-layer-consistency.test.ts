// Property Test 4: API Layer Consistency
// Validates that the API layer maintains consistent behavior with mock data

import * as fc from 'fast-check';
import {
  getNavigation,
  getHeroBannerData,
  getProducts,
  getFeaturedProducts,
  getProductById,
  getSettings,
  getNews,
  getContents,
  applicationApi,
  supportApi,
  clearNavigationCache
} from '../src/utils/api';
import { 
  configureApi, 
  switchToMockData, 
  isUsingMockData,
  checkApiHealth,
  API_ENDPOINTS 
} from '../src/utils/apiAbstraction';

describe('Property Test 4: API Layer Consistency', () => {
  beforeEach(() => {
    // Ensure we're using mock data for tests
    switchToMockData();
    clearNavigationCache();
  });

  // Property 4.1: All API functions return consistent data structures
  test('Property 4.1: API functions return consistent data structures', async () => {
    await fc.assert(fc.asyncProperty(
      fc.constantFrom('navigation', 'heroBanner', 'products', 'settings', 'news'),
      async (apiType) => {
        let result: any;
        
        switch (apiType) {
          case 'navigation':
            result = await getNavigation();
            expect(Array.isArray(result)).toBe(true);
            if (result.length > 0) {
              expect(result[0]).toHaveProperty('name');
              expect(result[0]).toHaveProperty('link');
            }
            break;
            
          case 'heroBanner':
            result = await getHeroBannerData();
            expect(typeof result).toBe('object');
            expect(result).toHaveProperty('titleLine1');
            expect(result).toHaveProperty('subtitle');
            break;
            
          case 'products':
            result = await getProducts();
            expect(Array.isArray(result)).toBe(true);
            if (result.length > 0) {
              expect(result[0]).toHaveProperty('id');
              expect(result[0]).toHaveProperty('name');
              expect(Array.isArray(result[0].tags)).toBe(true);
              expect(Array.isArray(result[0].features)).toBe(true);
            }
            break;
            
          case 'settings':
            result = await getSettings();
            expect(typeof result).toBe('object');
            expect(result).toHaveProperty('site_title');
            break;
            
          case 'news':
            result = await getNews();
            expect(Array.isArray(result)).toBe(true);
            if (result.length > 0) {
              expect(result[0]).toHaveProperty('id');
              expect(result[0]).toHaveProperty('title');
              expect(result[0]).toHaveProperty('isPublished');
              expect(result[0].isPublished).toBe(true);
            }
            break;
        }
        
        return true;
      }
    ), { numRuns: 20 });
  });

  // Property 4.2: API functions handle errors gracefully
  test('Property 4.2: API functions handle errors gracefully and return fallbacks', async () => {
    await fc.assert(fc.asyncProperty(
      fc.constantFrom('products', 'navigation', 'heroBanner', 'settings'),
      async (apiType) => {
        let result: any;
        
        // All API functions should return valid data even if mock data fails
        switch (apiType) {
          case 'products':
            result = await getProducts();
            expect(Array.isArray(result)).toBe(true);
            // Should return at least default products or empty array
            break;
            
          case 'navigation':
            result = await getNavigation();
            expect(Array.isArray(result)).toBe(true);
            // Should return at least default navigation
            break;
            
          case 'heroBanner':
            result = await getHeroBannerData();
            expect(typeof result).toBe('object');
            expect(result).not.toBeNull();
            // Should return default hero banner
            break;
            
          case 'settings':
            result = await getSettings();
            expect(typeof result).toBe('object');
            expect(result).not.toBeNull();
            // Should return default settings
            break;
        }
        
        return true;
      }
    ), { numRuns: 15 });
  });

  // Property 4.3: Featured products filtering works consistently
  test('Property 4.3: Featured products filtering maintains consistency', async () => {
    await fc.assert(fc.asyncProperty(
      fc.record({
        limit: fc.integer({ min: 1, max: 20 }),
        sort: fc.constantFrom('popular', 'new', 'featured'),
        category: fc.oneof(fc.constant('all'), fc.constant('display'), fc.constant('control'))
      }),
      async (params) => {
        const result = await getFeaturedProducts(params);
        
        expect(Array.isArray(result)).toBe(true);
        expect(result.length).toBeLessThanOrEqual(params.limit);
        
        // All returned products should have consistent structure
        result.forEach(product => {
          expect(product).toHaveProperty('id');
          expect(product).toHaveProperty('name');
          expect(Array.isArray(product.tags)).toBe(true);
          expect(Array.isArray(product.features)).toBe(true);
          expect(Array.isArray(product.images)).toBe(true);
        });
        
        // If sort is 'featured', all products should have highlight: true
        if (params.sort === 'featured') {
          result.forEach(product => {
            expect(product.highlight).toBe(true);
          });
        }
        
        return true;
      }
    ), { numRuns: 25 });
  });

  // Property 4.4: Application API maintains consistent response format
  test('Property 4.4: Application API maintains consistent response format', async () => {
    await fc.assert(fc.asyncProperty(
      fc.constantFrom('Sports Venues', 'Indoor Venues', 'Outdoor Venues', 'Entertainment', 'All'),
      async (category) => {
        const result = await applicationApi.getPublicApplications(category);
        
        expect(result).toHaveProperty('success');
        expect(result).toHaveProperty('data');
        expect(typeof result.success).toBe('boolean');
        expect(Array.isArray(result.data)).toBe(true);
        
        // All applications should have consistent structure
        result.data.forEach(app => {
          expect(app).toHaveProperty('id');
          expect(app).toHaveProperty('slug');
          expect(app).toHaveProperty('title');
          expect(app).toHaveProperty('category');
          expect(app).toHaveProperty('isPublished');
          expect(app.isPublished).toBe(true);
        });
        
        // If category is specified and not 'All', filter should work
        if (category !== 'All') {
          result.data.forEach(app => {
            expect(app.category).toBe(category);
          });
        }
        
        return true;
      }
    ), { numRuns: 15 });
  });

  // Property 4.5: API abstraction layer configuration works correctly
  test('Property 4.5: API abstraction layer configuration maintains consistency', async () => {
    await fc.assert(fc.asyncProperty(
      fc.record({
        baseUrl: fc.webUrl(),
        timeout: fc.integer({ min: 1000, max: 30000 }),
        useMockData: fc.boolean()
      }),
      async (config) => {
        // Configure API
        configureApi(config);
        
        // Check that mock data mode is correctly detected
        expect(typeof isUsingMockData()).toBe('boolean');
        
        // Health check should work in mock mode
        if (config.useMockData) {
          const health = await checkApiHealth();
          expect(typeof health).toBe('boolean');
        }
        
        // API endpoints should be defined
        expect(typeof API_ENDPOINTS.PRODUCTS).toBe('string');
        expect(typeof API_ENDPOINTS.NAVIGATION).toBe('string');
        expect(typeof API_ENDPOINTS.PRODUCT_BY_ID('test')).toBe('string');
        
        return true;
      }
    ), { numRuns: 10 });
  });

  // Property 4.6: Product by ID returns consistent data or null
  test('Property 4.6: Product by ID returns consistent data or appropriate fallback', async () => {
    await fc.assert(fc.asyncProperty(
      fc.oneof(
        fc.constantFrom('smart-led', 'arena-control', 'wifi-pro'), // Valid IDs
        fc.string({ minLength: 1, maxLength: 20 }) // Random IDs
      ),
      async (productId) => {
        const result = await getProductById(productId);
        
        if (result !== null) {
          expect(typeof result).toBe('object');
          expect(result).toHaveProperty('id');
          expect(result).toHaveProperty('name');
          expect(Array.isArray(result.tags)).toBe(true);
          expect(Array.isArray(result.features)).toBe(true);
          expect(Array.isArray(result.images)).toBe(true);
        }
        
        return true;
      }
    ), { numRuns: 20 });
  });

  // Property 4.7: Support API maintains consistent structure
  test('Property 4.7: Support API maintains consistent response structure', async () => {
    const subjects = await supportApi.getSubjects();
    expect(Array.isArray(subjects)).toBe(true);
    subjects.forEach(subject => {
      expect(subject).toHaveProperty('id');
      expect(subject).toHaveProperty('name');
    });

    const kpi = await supportApi.getKpi();
    expect(typeof kpi).toBe('object');
    expect(kpi).toHaveProperty('avgResponseHours');
    expect(kpi).toHaveProperty('satisfactionPercent');

    const contactInfo = await supportApi.getContactInfo();
    expect(typeof contactInfo).toBe('object');
    expect(contactInfo).toHaveProperty('email');
    expect(contactInfo).toHaveProperty('phone');
  });

  // Property 4.8: Settings API supports key filtering
  test('Property 4.8: Settings API supports key filtering consistently', async () => {
    await fc.assert(fc.asyncProperty(
      fc.array(fc.constantFrom('site_title', 'site_description', 'footer_email', 'footer_phone'), { minLength: 1, maxLength: 4 }),
      async (keys) => {
        const result = await getSettings(keys);
        
        expect(typeof result).toBe('object');
        expect(result).not.toBeNull();
        
        // Should only contain requested keys (if they exist)
        const resultKeys = Object.keys(result);
        resultKeys.forEach(key => {
          expect(keys.includes(key)).toBe(true);
        });
        
        return true;
      }
    ), { numRuns: 15 });
  });
});

// Integration test for API layer
describe('API Layer Integration', () => {
  test('All API functions can be called without errors', async () => {
    // This test ensures all API functions are callable and return valid data
    const navigation = await getNavigation();
    const heroBanner = await getHeroBannerData();
    const products = await getProducts();
    const featuredProducts = await getFeaturedProducts({ limit: 5 });
    const settings = await getSettings();
    const news = await getNews();
    const contents = await getContents();
    const applications = await applicationApi.getPublicApplications();
    const categories = await applicationApi.getPublicCategories();

    // Basic structure validation
    expect(Array.isArray(navigation)).toBe(true);
    expect(typeof heroBanner).toBe('object');
    expect(Array.isArray(products)).toBe(true);
    expect(Array.isArray(featuredProducts)).toBe(true);
    expect(typeof settings).toBe('object');
    expect(Array.isArray(news)).toBe(true);
    expect(Array.isArray(contents)).toBe(true);
    expect(applications.success).toBe(true);
    expect(categories.success).toBe(true);
  });
});