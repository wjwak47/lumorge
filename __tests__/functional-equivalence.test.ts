// Property Test 7: Functional Equivalence
// Validates that the extracted frontend maintains functional equivalence with the original

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
  supportApi
} from '../src/utils/api';

describe('Property Test 7: Functional Equivalence', () => {
  // Property 7.1: Homepage functionality works correctly
  test('Property 7.1: Homepage data loading functions work correctly', async () => {
    // Test hero section data
    const heroBanner = await getHeroBannerData();
    expect(heroBanner).toBeDefined();
    expect(heroBanner).toHaveProperty('titleLine1');
    expect(heroBanner).toHaveProperty('titleLine2');
    expect(heroBanner).toHaveProperty('subtitle');
    expect(heroBanner).toHaveProperty('primaryButtonText');
    expect(heroBanner).toHaveProperty('secondaryButtonText');

    // Test navigation data
    const navigation = await getNavigation();
    expect(Array.isArray(navigation)).toBe(true);
    expect(navigation.length).toBeGreaterThan(0);
    navigation.forEach(item => {
      expect(item).toHaveProperty('name');
      expect(item).toHaveProperty('link');
    });

    // Test featured products for product showcase
    const featuredProducts = await getFeaturedProducts({ limit: 6, sort: 'featured' });
    expect(Array.isArray(featuredProducts)).toBe(true);
    featuredProducts.forEach(product => {
      expect(product).toHaveProperty('id');
      expect(product).toHaveProperty('name');
      expect(product).toHaveProperty('description');
      expect(product.highlight).toBe(true); // Should be featured
    });

    // Test news highlights
    const news = await getNews();
    expect(Array.isArray(news)).toBe(true);
    news.forEach(article => {
      expect(article).toHaveProperty('id');
      expect(article).toHaveProperty('title');
      expect(article).toHaveProperty('content');
      expect(article.isPublished).toBe(true);
    });
  });

  // Property 7.2: Product pages functionality
  test('Property 7.2: Product pages load and display correctly', async () => {
    await fc.assert(fc.asyncProperty(
      fc.constantFrom('smart-led', 'arena-control', 'wifi-pro', 'venue-analytics'),
      async (productId) => {
        const product = await getProductById(productId);
        
        expect(product).not.toBeNull();
        if (product) {
          expect(product).toHaveProperty('id', productId);
          expect(product).toHaveProperty('name');
          expect(product).toHaveProperty('description');
          expect(Array.isArray(product.features)).toBe(true);
          expect(Array.isArray(product.images)).toBe(true);
          expect(Array.isArray(product.tags)).toBe(true);
        }
        
        return true;
      }
    ), { numRuns: 4 });

    // Test product listing
    const allProducts = await getProducts();
    expect(Array.isArray(allProducts)).toBe(true);
    expect(allProducts.length).toBeGreaterThan(0);
    
    allProducts.forEach(product => {
      expect(product).toHaveProperty('id');
      expect(product).toHaveProperty('name');
      expect(product).toHaveProperty('description');
    });
  });

  // Property 7.3: Application pages functionality
  test('Property 7.3: Application pages load and display correctly', async () => {
    const applicationsResult = await applicationApi.getPublicApplications();
    expect(applicationsResult.success).toBe(true);
    expect(Array.isArray(applicationsResult.data)).toBe(true);
    
    const applications = applicationsResult.data;
    expect(applications.length).toBeGreaterThan(0);
    
    // Test each application
    for (const app of applications.slice(0, 3)) { // Test first 3 applications
      expect(app).toHaveProperty('id');
      expect(app).toHaveProperty('slug');
      expect(app).toHaveProperty('title');
      expect(app).toHaveProperty('category');
      expect(app).toHaveProperty('summary');
      expect(app.isPublished).toBe(true);
      
      // Test individual application page
      const appDetail = await applicationApi.getApplicationBySlug(app.slug);
      expect(appDetail.success).toBe(true);
      expect(appDetail.data).toBeDefined();
      if (appDetail.data) {
        expect(appDetail.data.slug).toBe(app.slug);
        expect(appDetail.data.title).toBe(app.title);
      }
    }

    // Test categories
    const categoriesResult = await applicationApi.getPublicCategories();
    expect(categoriesResult.success).toBe(true);
    expect(Array.isArray(categoriesResult.data)).toBe(true);
    expect(categoriesResult.data.length).toBeGreaterThan(0);
  });

  // Property 7.4: Navigation and static pages functionality
  test('Property 7.4: Navigation and settings work correctly', async () => {
    // Test navigation
    const navigation = await getNavigation();
    expect(Array.isArray(navigation)).toBe(true);
    
    const expectedPages = ['Home', 'Products', 'Applications', 'Contact'];
    const navNames = navigation.map(item => item.name);
    
    expectedPages.forEach(pageName => {
      expect(navNames).toContain(pageName);
    });

    // Test settings for footer and site configuration
    const settings = await getSettings();
    expect(settings).toBeDefined();
    expect(settings).toHaveProperty('site_title');
    expect(settings).toHaveProperty('footer_email');
    expect(settings).toHaveProperty('footer_phone');
    expect(settings).toHaveProperty('footer_address');
    
    // Test specific settings keys
    const specificSettings = await getSettings(['site_title', 'footer_email']);
    expect(specificSettings).toHaveProperty('site_title');
    expect(specificSettings).toHaveProperty('footer_email');
  });

  // Property 7.5: Interactive features functionality
  test('Property 7.5: Support API and interactive features work', async () => {
    // Test support subjects
    const subjects = await supportApi.getSubjects();
    expect(Array.isArray(subjects)).toBe(true);
    expect(subjects.length).toBeGreaterThan(0);
    
    subjects.forEach(subject => {
      expect(subject).toHaveProperty('id');
      expect(subject).toHaveProperty('name');
    });

    // Test KPI data
    const kpi = await supportApi.getKpi();
    expect(kpi).toHaveProperty('avgResponseHours');
    expect(kpi).toHaveProperty('satisfactionPercent');
    expect(typeof kpi.avgResponseHours).toBe('number');
    expect(typeof kpi.satisfactionPercent).toBe('number');

    // Test contact info
    const contactInfo = await supportApi.getContactInfo();
    expect(contactInfo).toHaveProperty('email');
    expect(contactInfo).toHaveProperty('phone');
    expect(contactInfo).toHaveProperty('address');

    // Test ticket submission (mock)
    const ticketPayload = {
      subject: 'Test Subject',
      message: 'Test message',
      email: 'test@example.com'
    };
    
    const ticketResult = await supportApi.submitTicket(ticketPayload);
    expect(ticketResult).toHaveProperty('success', true);
    expect(ticketResult).toHaveProperty('message');
  });

  // Property 7.6: Data consistency across different API calls
  test('Property 7.6: Data consistency is maintained across API calls', async () => {
    await fc.assert(fc.asyncProperty(
      fc.constantFrom('featured', 'popular', 'new'),
      fc.integer({ min: 1, max: 10 }),
      async (sortType, limit) => {
        const featuredProducts = await getFeaturedProducts({ 
          sort: sortType as 'featured' | 'popular' | 'new', 
          limit 
        });
        
        expect(Array.isArray(featuredProducts)).toBe(true);
        expect(featuredProducts.length).toBeLessThanOrEqual(limit);
        
        // Verify sorting logic
        if (sortType === 'featured') {
          featuredProducts.forEach(product => {
            expect(product.highlight).toBe(true);
          });
        } else if (sortType === 'popular') {
          featuredProducts.forEach(product => {
            expect(product.tags).toContain('Popular');
          });
        } else if (sortType === 'new') {
          featuredProducts.forEach(product => {
            expect(product.tags).toContain('New');
          });
        }
        
        return true;
      }
    ), { numRuns: 15 });
  });

  // Property 7.7: Error handling works correctly
  test('Property 7.7: Error handling provides appropriate fallbacks', async () => {
    // Test with invalid product ID
    const invalidProduct = await getProductById('non-existent-id');
    expect(invalidProduct).not.toBeNull(); // Should return default product
    if (invalidProduct) {
      expect(invalidProduct.id).toBe('non-existent-id');
      expect(invalidProduct.name).toContain('non-existent-id');
    }

    // Test with invalid application slug
    const invalidApp = await applicationApi.getApplicationBySlug('non-existent-slug');
    expect(invalidApp.success).toBe(false);
    expect(invalidApp.data).toBeUndefined();

    // All API calls should complete without throwing errors
    await expect(getProducts()).resolves.toBeDefined();
    await expect(getNews()).resolves.toBeDefined();
    await expect(getContents()).resolves.toBeDefined();
    await expect(getSettings()).resolves.toBeDefined();
  });
});

// Integration test for complete homepage functionality
describe('Homepage Integration Test', () => {
  test('Complete homepage data loading simulation', async () => {
    // Simulate loading all data needed for homepage
    const [
      heroBanner,
      navigation,
      featuredProducts,
      applications,
      news,
      settings
    ] = await Promise.all([
      getHeroBannerData(),
      getNavigation(),
      getFeaturedProducts({ limit: 6 }),
      applicationApi.getPublicApplications(),
      getNews(),
      getSettings()
    ]);

    // Verify all data loaded successfully
    expect(heroBanner).toBeDefined();
    expect(Array.isArray(navigation)).toBe(true);
    expect(Array.isArray(featuredProducts)).toBe(true);
    expect(applications.success).toBe(true);
    expect(Array.isArray(news)).toBe(true);
    expect(settings).toBeDefined();

    // Verify data quality
    expect(navigation.length).toBeGreaterThan(0);
    expect(featuredProducts.length).toBeGreaterThan(0);
    expect(applications.data.length).toBeGreaterThan(0);
    expect(Object.keys(settings).length).toBeGreaterThan(0);
  });

  test('Performance: All API calls complete within reasonable time', async () => {
    const startTime = Date.now();
    
    await Promise.all([
      getProducts(),
      getFeaturedProducts({ limit: 8 }),
      applicationApi.getPublicApplications(),
      getNews(),
      getSettings(),
      supportApi.getSubjects()
    ]);
    
    const endTime = Date.now();
    const duration = endTime - startTime;
    
    // All mock API calls should complete within 2 seconds
    expect(duration).toBeLessThan(2000);
  });
});