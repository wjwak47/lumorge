import * as fs from 'fs';
import * as path from 'path';
import fc from 'fast-check';

describe('Mock Data Completeness Properties', () => {
  // Feature: frontend-extraction, Property 3: Mock Data Completeness
  test('Property 3: Mock Data Completeness', () => {
    fc.assert(fc.property(
      fc.constantFrom(
        'products.json',
        'applications.json',
        'news.json',
        'settings.json',
        'navigation.json',
        'hero-banner.json',
        'categories.json'
      ),
      (mockFile) => {
        const mockFilePath = path.join(process.cwd(), 'src/data/mock', mockFile);
        
        // Mock file should exist
        expect(fs.existsSync(mockFilePath)).toBe(true);
        
        // Mock file should contain valid JSON
        const content = fs.readFileSync(mockFilePath, 'utf8');
        expect(() => JSON.parse(content)).not.toThrow();
        
        const data = JSON.parse(content);
        
        // Data should not be empty
        if (Array.isArray(data)) {
          expect(data.length).toBeGreaterThan(0);
        } else {
          expect(Object.keys(data).length).toBeGreaterThan(0);
        }
        
        return true;
      }
    ), { numRuns: 7 });
  });
  
  test('Verify products mock data structure', () => {
    const productsPath = path.join(process.cwd(), 'src/data/mock/products.json');
    expect(fs.existsSync(productsPath)).toBe(true);
    
    const products = JSON.parse(fs.readFileSync(productsPath, 'utf8'));
    expect(Array.isArray(products)).toBe(true);
    expect(products.length).toBeGreaterThan(0);
    
    // Check required fields for each product
    products.forEach((product: any) => {
      expect(product).toHaveProperty('id');
      expect(product).toHaveProperty('name');
      expect(product).toHaveProperty('category');
      expect(product).toHaveProperty('description');
      expect(product).toHaveProperty('image');
      expect(product).toHaveProperty('images');
      expect(product).toHaveProperty('features');
      expect(product).toHaveProperty('tags');
      expect(product).toHaveProperty('iconName');
      expect(product).toHaveProperty('highlight');
      
      expect(Array.isArray(product.images)).toBe(true);
      expect(Array.isArray(product.features)).toBe(true);
      expect(Array.isArray(product.tags)).toBe(true);
      expect(typeof product.highlight).toBe('boolean');
    });
  });
  
  test('Verify applications mock data structure', () => {
    const applicationsPath = path.join(process.cwd(), 'src/data/mock/applications.json');
    expect(fs.existsSync(applicationsPath)).toBe(true);
    
    const applications = JSON.parse(fs.readFileSync(applicationsPath, 'utf8'));
    expect(Array.isArray(applications)).toBe(true);
    expect(applications.length).toBeGreaterThan(0);
    
    applications.forEach((app: any) => {
      expect(app).toHaveProperty('id');
      expect(app).toHaveProperty('slug');
      expect(app).toHaveProperty('title');
      expect(app).toHaveProperty('category');
      expect(app).toHaveProperty('summary');
      expect(app).toHaveProperty('content');
      expect(app).toHaveProperty('image');
      expect(app).toHaveProperty('isPublished');
      expect(typeof app.isPublished).toBe('boolean');
    });
  });
  
  test('Verify settings mock data structure', () => {
    const settingsPath = path.join(process.cwd(), 'src/data/mock/settings.json');
    expect(fs.existsSync(settingsPath)).toBe(true);
    
    const settings = JSON.parse(fs.readFileSync(settingsPath, 'utf8'));
    
    // Check required settings fields
    const requiredFields = [
      'site_logo_type',
      'site_logo_text',
      'site_title',
      'site_description',
      'footer_company_desc',
      'footer_address',
      'footer_email',
      'footer_phone',
      'footer_copyright'
    ];
    
    requiredFields.forEach(field => {
      expect(settings).toHaveProperty(field);
      expect(typeof settings[field]).toBe('string');
    });
  });
  
  test('Verify navigation mock data structure', () => {
    const navigationPath = path.join(process.cwd(), 'src/data/mock/navigation.json');
    expect(fs.existsSync(navigationPath)).toBe(true);
    
    const navigation = JSON.parse(fs.readFileSync(navigationPath, 'utf8'));
    expect(Array.isArray(navigation)).toBe(true);
    expect(navigation.length).toBeGreaterThan(0);
    
    navigation.forEach((item: any) => {
      expect(item).toHaveProperty('id');
      expect(item).toHaveProperty('name');
      expect(item).toHaveProperty('link');
      expect(item).toHaveProperty('order');
      expect(item).toHaveProperty('isVisible');
      expect(typeof item.isVisible).toBe('boolean');
      expect(typeof item.order).toBe('number');
    });
  });
  
  test('Verify hero banner mock data structure', () => {
    const heroBannerPath = path.join(process.cwd(), 'src/data/mock/hero-banner.json');
    expect(fs.existsSync(heroBannerPath)).toBe(true);
    
    const heroBanner = JSON.parse(fs.readFileSync(heroBannerPath, 'utf8'));
    
    const requiredFields = [
      'tagline',
      'titleLine1',
      'titleLine2',
      'subtitle',
      'primaryButtonText',
      'secondaryButtonText',
      'stats'
    ];
    
    requiredFields.forEach(field => {
      expect(heroBanner).toHaveProperty(field);
    });
    
    expect(Array.isArray(heroBanner.stats)).toBe(true);
    expect(heroBanner.stats.length).toBeGreaterThan(0);
  });
  
  test('Verify news mock data structure', () => {
    const newsPath = path.join(process.cwd(), 'src/data/mock/news.json');
    expect(fs.existsSync(newsPath)).toBe(true);
    
    const news = JSON.parse(fs.readFileSync(newsPath, 'utf8'));
    expect(Array.isArray(news)).toBe(true);
    expect(news.length).toBeGreaterThan(0);
    
    news.forEach((article: any) => {
      expect(article).toHaveProperty('id');
      expect(article).toHaveProperty('title');
      expect(article).toHaveProperty('content');
      expect(article).toHaveProperty('summary');
      expect(article).toHaveProperty('type');
      expect(article).toHaveProperty('image');
      expect(article).toHaveProperty('publishDate');
      expect(article).toHaveProperty('isPublished');
      expect(typeof article.isPublished).toBe('boolean');
    });
  });
});