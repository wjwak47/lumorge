# Mock Data System Documentation

The TechSports Frontend uses a comprehensive mock data system that provides realistic data for all application features without requiring a backend connection.

## Overview

The mock data system consists of:
- JSON data files in `src/data/mock/`
- API abstraction layer in `src/utils/api.ts`
- Configuration utilities in `src/utils/apiAbstraction.ts`

## Data Structure

### Products (`products.json`)

Contains the complete product catalog with detailed specifications:

```json
{
  "id": "wifi-pro",
  "name": "WiFi Pro System",
  "category": "connectivity",
  "price": 2999,
  "description": "Professional wireless connectivity solution",
  "specifications": {
    "range": "500m",
    "bandwidth": "1Gbps",
    "protocols": ["802.11ac", "802.11ax"]
  },
  "images": ["/images/products/wifi-pro-1.jpg"],
  "featured": true,
  "inStock": true
}
```

**Key Fields:**
- `id`: Unique product identifier (used in URLs)
- `name`: Display name
- `category`: Product category for filtering
- `price`: Price in USD cents
- `specifications`: Technical details object
- `images`: Array of image paths
- `featured`: Boolean for homepage display
- `inStock`: Availability status

### Applications (`applications.json`)

Real-world implementation case studies:

```json
{
  "id": "olympic-stadium-implementation",
  "slug": "olympic-stadium-implementation",
  "title": "Olympic Stadium Technology Integration",
  "category": "stadium",
  "description": "Complete technology solution for Olympic venues",
  "content": "Detailed implementation description...",
  "images": ["/images/applications/olympic-1.jpg"],
  "products": ["wifi-pro", "smart-led", "arena-control"],
  "publishedAt": "2024-01-15T00:00:00Z"
}
```

**Key Fields:**
- `slug`: URL-friendly identifier
- `category`: Application type
- `content`: Full case study content
- `products`: Array of related product IDs
- `publishedAt`: Publication date

### Settings (`settings.json`)

Site configuration and preferences:

```json
{
  "siteName": "TechSports",
  "tagline": "Advanced Sports Technology Solutions",
  "contact": {
    "email": "info@techsports.com",
    "phone": "+1 (555) 123-4567"
  },
  "social": {
    "twitter": "@techsports",
    "linkedin": "company/techsports"
  },
  "features": {
    "searchEnabled": true,
    "newsletterEnabled": true
  }
}
```

### Navigation (`navigation.json`)

Menu structure and routing:

```json
{
  "main": [
    {
      "label": "Products",
      "href": "/products",
      "children": [
        {
          "label": "Connectivity",
          "href": "/products?category=connectivity"
        }
      ]
    }
  ],
  "footer": [
    {
      "label": "About",
      "href": "/about"
    }
  ]
}
```

### News (`news.json`)

Latest updates and announcements:

```json
{
  "id": "new-product-launch",
  "title": "Introducing WiFi Pro System",
  "excerpt": "Revolutionary wireless connectivity for sports venues",
  "content": "Full article content...",
  "publishedAt": "2024-01-20T00:00:00Z",
  "category": "product-launch",
  "featured": true
}
```

### Hero Banner (`hero-banner.json`)

Homepage hero section configuration:

```json
{
  "title": "Advanced Sports Technology Solutions",
  "subtitle": "Powering the future of sports venues worldwide",
  "backgroundImage": "/images/hero-bg.jpg",
  "ctaText": "Explore Products",
  "ctaLink": "/products"
}
```

## API Layer Integration

The mock data is seamlessly integrated through the API layer:

### Automatic Loading
```typescript
// src/utils/api.ts
import productsData from '../data/mock/products.json';

export async function getProducts(): Promise<Product[]> {
  console.log('[API - getProducts] Loading products from mock data');
  return productsData;
}
```

### Error Handling
```typescript
export async function getProductById(id: string): Promise<Product | null> {
  const products = await getProducts();
  const product = products.find(p => p.id === id);
  
  if (!product) {
    console.warn(`[API - getProductById] Product ${id} not found`);
    return getDefaultProductById(id);
  }
  
  return product;
}
```

### Caching
The API layer includes intelligent caching for performance:
```typescript
let navigationCache: Navigation | null = null;

export async function getNavigation(): Promise<Navigation> {
  if (navigationCache) {
    console.log('Using cached navigation data');
    return navigationCache;
  }
  
  console.log('Loading navigation from mock data');
  navigationCache = navigationData;
  return navigationCache;
}
```

## Modifying Mock Data

### Adding New Products

1. Edit `src/data/mock/products.json`
2. Add new product object with required fields
3. Add product images to `public/images/products/`
4. Update categories if needed

Example:
```json
{
  "id": "new-product",
  "name": "New Product Name",
  "category": "existing-category",
  "price": 1999,
  "description": "Product description",
  "specifications": {},
  "images": ["/images/products/new-product-1.jpg"],
  "featured": false,
  "inStock": true
}
```

### Adding New Applications

1. Edit `src/data/mock/applications.json`
2. Create unique slug and ID
3. Add application images to `public/images/applications/`
4. Link to related products using product IDs

### Updating Site Settings

1. Edit `src/data/mock/settings.json`
2. Changes take effect immediately
3. No restart required in development

### Adding News Articles

1. Edit `src/data/mock/news.json`
2. Use ISO date format for `publishedAt`
3. Set `featured: true` for homepage display

## Data Validation

The mock data system includes validation to ensure data integrity:

- **Required Fields**: All objects must have required fields
- **ID Uniqueness**: Product and application IDs must be unique
- **Image Paths**: All image paths are validated during build
- **Date Formats**: Dates must be valid ISO strings
- **Category Consistency**: Categories must match predefined values

## Performance Considerations

### File Size
- Keep individual JSON files under 1MB
- Split large datasets across multiple files
- Use image optimization for referenced assets

### Loading Strategy
- Data is loaded synchronously for immediate availability
- Caching prevents redundant loads
- Lazy loading for non-critical data

### Memory Usage
- Mock data is loaded into memory on first access
- Shared across components to prevent duplication
- Garbage collection handles cleanup

## Testing Mock Data

The test suite validates mock data integrity:

```bash
npm test -- __tests__/mock-data.test.ts
```

Tests cover:
- JSON structure validation
- Required field presence
- Data type consistency
- Image path verification
- Cross-reference integrity

## Troubleshooting

### Common Issues

**Missing Images**
- Ensure image files exist in `public/` directory
- Check file paths in JSON data
- Verify image formats are supported

**Invalid JSON**
- Use JSON validator to check syntax
- Ensure proper escaping of special characters
- Validate date formats

**Performance Issues**
- Check file sizes of JSON data
- Monitor memory usage in browser dev tools
- Consider data pagination for large datasets

### Debug Mode

Enable debug logging:
```typescript
// In src/utils/api.ts
const DEBUG = true; // Set to true for detailed logging
```

This provides detailed console output for all API operations.

## Migration to Real Backend

When ready to integrate with a real backend, see the [Backend Integration Guide](backend-integration.md) for step-by-step instructions on replacing mock data with live API calls.