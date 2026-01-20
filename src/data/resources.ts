import { Play } from 'lucide-react';

// 资源类型定义
export interface Resource {
  id: string;
  type: 'news' | 'blog';
  title: string;
  description: string;
  thumbnail?: string;
  date: string;
  readTime?: string;
  watchTime?: string;
  isPlaceholder?: boolean;
  featured?: boolean;
  slug?: string;
}

// 资源数据
export const RESOURCES: Resource[] = [
  {
    id: 'news-1',
    type: 'news',
    title: 'Revolutionary XR200 LED Display Transforms Stadium Experience',
    description: 'Our latest LED display technology features industry-leading brightness and energy efficiency while maintaining a slim profile that makes installation simpler in any venue.',
    thumbnail: 'https://images.unsplash.com/photo-1508963493744-76fce69379c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    date: 'May 15, 2024',
    readTime: '4 min',
    featured: true
  },
  {
    id: 'news-2',
    type: 'news',
    title: 'Major League Baseball Adopts Our Smart Stadium Technology',
    description: 'Three MLB stadiums have implemented our integrated crowd management and analytics system, resulting in 22% faster entry times and enhanced fan experience.',
    thumbnail: 'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2026&q=80',
    date: 'April 30, 2024',
    readTime: '3 min'
  },
  {
    id: 'news-3',
    type: 'news',
    title: 'Energy-Efficient Lighting Solution Saves Venues $2.5M Annually',
    description: 'Our new stadium lighting system reduces power consumption by 45% while meeting the strictest broadcast requirements for 4K and 8K productions.',
    thumbnail: 'https://images.unsplash.com/photo-1622568221059-4790140a8c6c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80',
    date: 'May 20, 2024',
    readTime: '5 min'
  },
  {
    id: 'blog-1',
    type: 'blog',
    title: 'Behind the Scenes: Euro Stadium Technology Installation',
    description: 'A detailed look at how our team installed the most advanced LED technology in Europe\'s newest football stadium in just 14 days.',
    thumbnail: 'https://images.unsplash.com/photo-1518325743220-a29140989143?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
    date: 'May 22, 2024',
    readTime: '6 min'
  },
  {
    id: 'news-4',
    type: 'news',
    title: 'TechSports Partners with Olympic Committee for 2028 Games',
    description: 'Our company has been selected as the official technology partner for the 2028 Olympic Games, providing integrated solutions for all competition venues.',
    thumbnail: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    date: 'May 25, 2024',
    readTime: '6 min'
  },
  {
    id: 'blog-2',
    type: 'blog',
    title: 'Audio System Engineering: Creating the Perfect Stadium Sound',
    description: 'An in-depth technical exploration of our next-generation audio system designed specifically for large sports venues with challenging acoustics.',
    thumbnail: 'https://images.unsplash.com/photo-1520391307174-e67962db28be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
    date: 'May 28, 2024',
    readTime: '8 min'
  },
  {
    id: 'news-5',
    type: 'news',
    title: 'New Fan Engagement App Increases Concession Sales by 35%',
    description: 'Our integrated mobile platform allows fans to order food, view instant replays, and access exclusive content, revolutionizing the in-stadium experience.',
    thumbnail: 'https://images.unsplash.com/photo-1551649779-a6c24d944c92?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
    date: 'May 30, 2024',
    readTime: '7 min'
  },
  {
    id: 'blog-3',
    type: 'blog',
    title: 'Smart Basketball Arena Design: A Technical Deep Dive',
    description: 'An extensive technical analysis of the most technologically advanced basketball arena in North America, featuring our complete integrated solution.',
    thumbnail: 'https://images.unsplash.com/photo-1504450758481-7338eba7524a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1769&q=80',
    date: 'May 18, 2024',
    readTime: '10 min'
  },
  {
    id: 'news-6',
    type: 'news',
    title: 'Sustainability Report: Our Tech Reduced Carbon Footprint by 60%',
    description: 'A comprehensive analysis of how our stadium technology solutions are helping sports venues meet and exceed their environmental sustainability goals.',
    thumbnail: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    date: 'June 2, 2024',
    readTime: '9 min'
  }
];

// 资源类别
export const RESOURCE_CATEGORIES = [
  { id: 'all', name: 'All Resources' },
  { id: 'news', name: 'News' },
  { id: 'blog', name: 'Blog Posts' },
  { id: 'case-studies', name: 'Case Studies' },
  { id: 'whitepapers', name: 'Whitepapers' }
]; 