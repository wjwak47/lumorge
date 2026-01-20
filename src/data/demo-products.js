/**
 * Demo Products Data for LUMORGE
 * 
 * This file contains sample product data in English that can be inserted into the database.
 * All images are placeholder paths that should be updated with actual image files.
 */

const demoProducts = [
  {
    id: 'led-perimeter-display',
    name: 'Ultra HD Perimeter LED Display',
    category: 'display',
    description: 'Professional stadium perimeter LED display system with ultra-high resolution and weather-resistant design for pitch-side advertising and information.',
    image: '/products/perimeter-display.jpg',
    images: [
      '/products/perimeter-display-1.jpg',
      '/products/perimeter-display-2.jpg',
      '/products/perimeter-display-3.jpg',
      '/products/perimeter-display-4.jpg',
    ],
    features: [
      'P6 Ultra HD Resolution', 
      'IP65 Weather Protection', 
      'Real-time Content Management', 
      '160° Viewing Angle',
      'Impact-resistant Design'
    ],
    iconName: 'Layers',
    highlight: true,
    tags: ['Popular', 'Featured'],
  },
  {
    id: 'stadium-scoreboard',
    name: 'Stadium Scoreboard Pro',
    category: 'display',
    description: 'Comprehensive scoreboard solution with integrated timing system, video replay capabilities, and dynamic content management for all sporting events.',
    image: '/products/stadium-scoreboard.jpg',
    images: [
      '/products/stadium-scoreboard-1.jpg',
      '/products/stadium-scoreboard-2.jpg',
      '/products/stadium-scoreboard-3.jpg',
    ],
    features: [
      'Multi-sport Configuration', 
      'Video Replay Integration', 
      'Wireless Control System', 
      'Custom Animation Support',
      'Cloud Backup'
    ],
    iconName: 'BarChart4',
    highlight: true,
    tags: ['Best Seller', 'Featured'],
  },
  {
    id: 'arena-sound-system',
    name: 'Arena Acoustic System',
    category: 'audio',
    description: 'Professional acoustic system designed specifically for large sports arenas with precise sound distribution and exceptional clarity even at maximum capacity.',
    image: '/products/arena-sound.jpg',
    images: [
      '/products/arena-sound-1.jpg',
      '/products/arena-sound-2.jpg',
      '/products/arena-sound-3.jpg',
    ],
    features: [
      'Directed Sound Technology', 
      'AI Noise Cancellation', 
      'Automated Acoustic Adjustment', 
      'Zone Control',
      'Digital Signal Processing'
    ],
    iconName: 'Zap',
    highlight: false,
    tags: ['New'],
  },
  {
    id: 'event-control-center',
    name: 'Event Control Center',
    category: 'control',
    description: 'Centralized command center for complete management of all venue systems including displays, lighting, sound, and security from a single intuitive interface.',
    image: '/products/event-control.jpg',
    images: [
      '/products/event-control-1.jpg',
      '/products/event-control-2.jpg',
      '/products/event-control-3.jpg',
      '/products/event-control-4.jpg',
    ],
    features: [
      'Touch Interface', 
      'Multi-system Integration', 
      'Emergency Protocols', 
      'Real-time Analytics',
      'Remote Access'
    ],
    iconName: 'Cpu',
    highlight: true,
    tags: ['Featured'],
  },
  {
    id: 'sports-lighting-pro',
    name: 'Sports Lighting Pro',
    category: 'lighting',
    description: 'Advanced LED lighting system for sports venues with broadcast-ready illumination, dynamic effects, and energy-efficient operation.',
    image: '/products/sports-lighting.jpg',
    images: [
      '/products/sports-lighting-1.jpg',
      '/products/sports-lighting-2.jpg',
      '/products/sports-lighting-3.jpg',
    ],
    features: [
      'Broadcast-quality Illumination', 
      'Dynamic Light Shows', 
      '75% Energy Savings', 
      'Remote Adjustment',
      'Instant On/Off'
    ],
    iconName: 'Zap',
    highlight: false,
    tags: ['Eco-friendly'],
  },
  {
    id: 'smart-ticketing',
    name: 'Smart Ticketing System',
    category: 'security',
    description: 'Comprehensive ticketing and access control solution with NFC, biometric options, and real-time attendance tracking for sporting venues.',
    image: '/products/smart-ticketing.jpg',
    images: [
      '/products/smart-ticketing-1.jpg',
      '/products/smart-ticketing-2.jpg',
      '/products/smart-ticketing-3.jpg',
    ],
    features: [
      'NFC & QR Integration', 
      'Facial Recognition Option', 
      'Real-time Capacity Tracking', 
      'Anti-counterfeiting Technology',
      'Mobile App Integration'
    ],
    iconName: 'Shield',
    highlight: false,
    tags: ['New'],
  },
  {
    id: 'venue-connectivity',
    name: 'Venue Connectivity Suite',
    category: 'connectivity',
    description: 'High-density networking solution designed for large sports venues, supporting tens of thousands of concurrent users with seamless coverage.',
    image: '/products/venue-connectivity.jpg',
    images: [
      '/products/venue-connectivity-1.jpg',
      '/products/venue-connectivity-2.jpg',
      '/products/venue-connectivity-3.jpg',
    ],
    features: [
      '50,000+ Concurrent Users', 
      'Multi-gigabit Bandwidth', 
      'Segmented Network Security', 
      'Heat Mapping Analytics',
      'Broadcast Media Support'
    ],
    iconName: 'Wifi',
    highlight: true,
    tags: ['Popular'],
  },
  {
    id: 'fan-engagement-platform',
    name: 'Fan Engagement Platform',
    category: 'software',
    description: 'Interactive platform that enhances fan experience through mobile engagement, gamification, and personalized content delivery during live events.',
    image: '/products/fan-engagement.jpg',
    images: [
      '/products/fan-engagement-1.jpg',
      '/products/fan-engagement-2.jpg',
      '/products/fan-engagement-3.jpg',
      '/products/fan-engagement-4.jpg',
    ],
    features: [
      'In-seat Ordering', 
      'Interactive Games', 
      'Augmented Reality Features', 
      'Loyalty Program Integration',
      'Social Media Integration'
    ],
    iconName: 'BarChart4',
    highlight: true,
    tags: ['Featured', 'New'],
  },
  {
    id: 'outdoor-led-screen',
    name: 'Outdoor LED Screen System',
    category: 'display',
    description: 'Weather-resistant, high-brightness LED displays for outdoor sporting venues with exceptional visibility even in direct sunlight.',
    image: '/products/outdoor-led.jpg',
    images: [
      '/products/outdoor-led-1.jpg',
      '/products/outdoor-led-2.jpg',
      '/products/outdoor-led-3.jpg',
    ],
    features: [
      'Ultra-bright 7000 nit Display', 
      'IP66 All-weather Protection', 
      'Auto Brightness Adjustment', 
      'Anti-UV Coating',
      'Extended Lifespan Technology'
    ],
    iconName: 'Layers',
    highlight: false,
    tags: ['Durable'],
  },
  {
    id: 'video-replay-system',
    name: 'Professional Video Replay System',
    category: 'control',
    description: 'Multi-camera replay system with instant slow-motion, zooming capabilities, and seamless integration with broadcast equipment for sporting events.',
    image: '/products/video-replay.jpg',
    images: [
      '/products/video-replay-1.jpg',
      '/products/video-replay-2.jpg',
      '/products/video-replay-3.jpg',
    ],
    features: [
      'Multi-angle Instant Replay', 
      'Super Slow Motion', 
      'Digital Zoom & Highlight', 
      'Broadcast Integration',
      'Automated Clip Creation'
    ],
    iconName: 'Cpu',
    highlight: false,
    tags: ['Professional'],
  },
];

// Product categories
const demoCategories = [
  { id: 'all', name: 'All Products' },
  { id: 'display', name: 'Display Systems' },
  { id: 'audio', name: 'Audio Systems' },
  { id: 'control', name: 'Control Systems' },
  { id: 'lighting', name: 'Lighting' },
  { id: 'connectivity', name: 'Connectivity' },
  { id: 'security', name: 'Security & Access' },
  { id: 'software', name: 'Software Solutions' },
];

// SQL Insert Script Generator for MySQL
const generateSQLInserts = () => {
  let sql = '-- SQL Insert Statements for Demo Products\n\n';
  
  // Categories table inserts
  sql += '-- Categories Table\n';
  demoCategories.forEach(cat => {
    sql += `INSERT INTO product_categories (id, name) VALUES ('${cat.id}', '${cat.name}');\n`;
  });
  
  sql += '\n-- Products Table\n';
  demoProducts.forEach(product => {
    sql += `INSERT INTO products (
      id, 
      name, 
      category, 
      description, 
      image, 
      features, 
      icon_name, 
      highlight, 
      tags
    ) VALUES (
      '${product.id}', 
      '${product.name}', 
      '${product.category}', 
      '${product.description}', 
      '${product.image}', 
      '${JSON.stringify(product.features).replace(/'/g, "''")}', 
      '${product.iconName}', 
      ${product.highlight ? 1 : 0}, 
      '${JSON.stringify(product.tags).replace(/'/g, "''")}'
    );\n`;
    
    // Product images
    sql += '\n-- Product Images for ' + product.id + '\n';
    product.images.forEach((img, index) => {
      sql += `INSERT INTO product_images (product_id, image_url, sort_order) VALUES ('${product.id}', '${img}', ${index});\n`;
    });
    sql += '\n';
  });
  
  return sql;
};

// JSON format for API import
const apiImportData = {
  categories: demoCategories,
  products: demoProducts
};

module.exports = {
  demoProducts,
  demoCategories,
  generateSQLInserts,
  apiImportData
}; 