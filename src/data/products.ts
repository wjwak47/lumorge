import { Layers, Cpu, Wifi, BarChart4, Shield, Zap } from 'lucide-react';

// 产品数据类型定义
export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  image: string;
  images: string[]; // 添加多张图片数组
  features: string[];
  iconName: string; // 改为图标名称字符串
  highlight: boolean;
  tags: string[];
}

// 图标映射函数，用于客户端组件
export const getIconComponent = (iconName: string) => {
  switch (iconName) {
    case 'Layers': return Layers;
    case 'Cpu': return Cpu;
    case 'Wifi': return Wifi;
    case 'BarChart4': return BarChart4;
    case 'Shield': return Shield;
    case 'Zap': return Zap;
    default: return Layers;
  }
};

// 产品数据
export const PRODUCTS: Product[] = [
  {
    id: 'smart-led',
    name: 'SmartLED Display System',
    category: 'display',
    description: 'Ultra HD LED display systems with intelligent content management for scoreboards and venue displays.',
    image: '/images/products/led-display-1.jpg',
    images: [
      '/images/products/led-display-1.jpg',
      '/images/products/led-display-2.jpg',
      '/images/products/led-display-3.jpg',
      '/images/products/led-display-detail-1.jpg',
    ],
    features: ['4K Resolution', 'Weather Resistant', 'Smart Content Management', 'Remote Control'],
    iconName: 'Layers',
    highlight: true,
    tags: ['Popular', 'Featured'],
  },
  {
    id: 'arena-control',
    name: 'Arena Control Center',
    category: 'control',
    description: 'Centralized control system for managing all venue technology from a single dashboard.',
    image: '/images/products/control-system-1.jpg',
    images: [
      '/images/products/control-system-1.jpg',
      '/images/products/control-system-2.jpg',
      '/images/products/control-system-3.jpg',
    ],
    features: ['Touch Interface', 'Multi-zone Control', 'Automation', 'Analytics Dashboard'],
    iconName: 'Cpu',
    highlight: false,
    tags: ['New'],
  },
  {
    id: 'wifi-pro',
    name: 'Stadium WiFi Pro',
    category: 'connectivity',
    description: 'High-density WiFi solution designed specifically for large venue deployments with thousands of concurrent users.',
    image: '/images/products/integration-1.jpg',
    images: [
      '/images/products/integration-1.jpg',
      '/images/products/integration-2.jpg',
      '/images/products/integration-3.jpg',
    ],
    features: ['50,000+ Connections', 'Low Latency', 'Seamless Handoff', 'Fan Analytics'],
    iconName: 'Wifi',
    highlight: false,
    tags: [],
  },
  {
    id: 'venue-analytics',
    name: 'Venue Analytics Platform',
    category: 'analytics',
    description: 'Real-time analytics platform for tracking attendance, engagement, and venue performance metrics.',
    image: '/images/products/audio-system-1.jpg',
    images: [
      '/images/products/audio-system-1.jpg',
      '/images/products/audio-system-2.jpg',
      '/images/products/audio-system-3.jpg',
      '/images/products/audio-system-detail-1.jpg',
    ],
    features: ['Real-time Dashboards', 'Predictive Analysis', 'Custom Reports', 'Data Export'],
    iconName: 'BarChart4',
    highlight: true,
    tags: ['Popular'],
  },
  {
    id: 'access-secure',
    name: 'AccessSecure System',
    category: 'security',
    description: 'Advanced access control and security management system for sporting venues with biometric options.',
    image: '/images/products/integration-1.jpg',
    images: [
      '/images/products/integration-1.jpg',
      '/images/products/integration-detail-1.jpg',
      '/images/products/integration-detail-2.jpg',
    ],
    features: ['Facial Recognition', 'RFID Support', 'Mobile Tickets', 'VIP Management'],
    iconName: 'Shield',
    highlight: false,
    tags: [],
  },
  {
    id: 'power-grid',
    name: 'PowerGrid Manager',
    category: 'infrastructure',
    description: 'Intelligent power management solution for optimizing energy usage across large sports facilities.',
    image: '/images/products/led-display-1.jpg',
    images: [
      '/images/products/led-display-1.jpg',
      '/images/products/led-display-detail-1.jpg',
      '/images/products/led-display-detail-2.jpg',
    ],
    features: ['Energy Optimization', 'Load Balancing', 'Backup Systems', 'Green Energy Integration'],
    iconName: 'Zap',
    highlight: false,
    tags: ['Eco-friendly'],
  },
];

// 分类数据
export const CATEGORIES = [
  { id: 'all', name: 'All Products' },
  { id: 'display', name: 'Display Systems' },
  { id: 'control', name: 'Control Systems' },
  { id: 'connectivity', name: 'Connectivity' },
  { id: 'analytics', name: 'Analytics' },
  { id: 'security', name: 'Security' },
  { id: 'infrastructure', name: 'Infrastructure' },
]; 