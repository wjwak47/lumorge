// LED显示屏行业备用数据
export const FALLBACK_PRODUCTS = [
  {
    id: 'led-display',
    name: 'LED Display Panel',
    category: 'LED Display',
    description: 'High-definition LED display panels with superior brightness and color accuracy for indoor and outdoor applications.',
    image: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    images: [
      'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    ],
    features: ['4K Resolution', 'High Brightness', 'Wide Viewing Angle', 'Energy Efficient'],
    iconName: 'Monitor',
    highlight: true,
    tags: ['Popular', 'Featured'],
  },
  {
    id: 'outdoor-led',
    name: 'Outdoor LED Screen',
    category: 'Outdoor Display',
    description: 'Weather-resistant outdoor LED screens designed for stadiums, billboards, and large-scale advertising.',
    image: 'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    images: [
      'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    ],
    features: ['Waterproof IP65', 'High Brightness 8000nits', 'Anti-UV', 'Remote Monitoring'],
    iconName: 'Sun',
    highlight: true,
    tags: ['New', 'Featured'],
  },
  {
    id: 'indoor-led',
    name: 'Indoor Fine Pitch LED',
    category: 'Indoor Display',
    description: 'Ultra-fine pitch LED displays for control rooms, broadcast studios, and corporate environments.',
    image: 'https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    images: [
      'https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    ],
    features: ['P1.2-P2.5 Pitch', 'Seamless Splicing', 'HDR Support', '160° Viewing Angle'],
    iconName: 'Grid',
    highlight: true,
    tags: ['Popular'],
  },
  {
    id: 'transparent-led',
    name: 'Transparent LED Display',
    category: 'Transparent Display',
    description: 'Innovative transparent LED screens for retail storefronts, glass facades, and modern architecture.',
    image: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    images: [
      'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    ],
    features: ['70% Transparency', 'Lightweight Design', 'Easy Installation', 'Energy Saving'],
    iconName: 'Layers',
    highlight: true,
    tags: ['New', 'Featured'],
  },
  {
    id: 'flexible-led',
    name: 'Flexible LED Module',
    category: 'Creative Display',
    description: 'Bendable LED modules for curved installations, columns, and creative display applications.',
    image: 'https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    images: [
      'https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    ],
    features: ['Flexible Bending', 'Magnetic Installation', 'Front Service', 'Custom Shapes'],
    iconName: 'Wand',
    highlight: true,
    tags: ['Popular'],
  },
  {
    id: 'rental-led',
    name: 'Rental LED Cabinet',
    category: 'Rental & Events',
    description: 'Portable LED cabinets designed for concerts, events, and temporary installations with quick assembly.',
    image: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    images: [
      'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    ],
    features: ['Quick Lock System', 'Die-Cast Aluminum', 'Lightweight', 'Road Case Included'],
    iconName: 'Package',
    highlight: true,
    tags: ['Featured'],
  }
];

// LED行业新闻数据
export const FALLBACK_NEWS = [
  {
    id: '1',
    slug: 'new-led-technology-release',
    title: 'Next-Gen Mini LED Technology Now Available',
    excerpt: 'Revolutionary Mini LED displays with unprecedented pixel density and color performance.',
    featuredImage: 'https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    publishDate: '2026-01-15',
    readMinutes: 4,
    isPublished: true,
    isHighlighted: true
  },
  {
    id: '2',
    slug: 'stadium-led-installation',
    title: 'Major Stadium Completes LED Upgrade',
    excerpt: 'World-class venue transforms with state-of-the-art perimeter and centerhung LED displays.',
    featuredImage: 'https://images.pexels.com/photos/976866/pexels-photo-976866.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    publishDate: '2026-01-10',
    readMinutes: 3,
    isPublished: true
  },
  {
    id: '3',
    slug: 'retail-digital-signage',
    title: 'Retail Digital Signage Trends 2026',
    excerpt: 'How LED displays are revolutionizing the retail shopping experience worldwide.',
    featuredImage: 'https://images.pexels.com/photos/325185/pexels-photo-325185.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    publishDate: '2026-01-05',
    readMinutes: 5,
    isPublished: true
  }
];

// LED应用场景数据
export const FALLBACK_APPLICATIONS = [
  {
    id: '1',
    name: 'Stadium LED Displays',
    title: 'Stadium LED Displays',
    summary: 'Complete LED solutions for sports venues including scoreboards, perimeter boards, and ribbon displays.',
    description: 'Powering world-class sporting events.',
    category: 'Sports Venues',
    image: 'https://images.pexels.com/photos/46798/the-ball-stadion-football-the-pitch-46798.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    imageUrl: 'https://images.pexels.com/photos/46798/the-ball-stadion-football-the-pitch-46798.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    isPublished: true,
    installations: 120,
    satisfaction: 98,
    benefits: ['High visibility displays', 'Real-time scoring']
  },
  {
    id: '2',
    name: 'Retail Digital Signage',
    title: 'Retail Digital Signage',
    summary: 'Eye-catching LED displays for shopping malls, brand stores, and retail environments.',
    description: 'Transforming retail experiences.',
    category: 'Retail',
    image: 'https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    imageUrl: 'https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    isPublished: true,
    installations: 350,
    satisfaction: 96,
    benefits: ['Increased engagement', 'Dynamic content']
  },
  {
    id: '3',
    name: 'Concert & Event Screens',
    title: 'Concert & Event Screens',
    summary: 'High-impact LED screens for concerts, festivals, and live entertainment events.',
    description: 'Creating unforgettable live experiences.',
    category: 'Entertainment',
    image: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    imageUrl: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    isPublished: true,
    installations: 200,
    satisfaction: 99,
    benefits: ['Stunning visuals', 'Quick setup']
  },
  {
    id: '4',
    name: 'Control Room Displays',
    title: 'Control Room Displays',
    summary: 'Mission-critical LED video walls for command centers, monitoring, and operations.',
    description: 'Reliable 24/7 display solutions.',
    category: 'Corporate',
    image: 'https://images.pexels.com/photos/1181354/pexels-photo-1181354.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    imageUrl: 'https://images.pexels.com/photos/1181354/pexels-photo-1181354.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    isPublished: true,
    installations: 85,
    satisfaction: 97,
    benefits: ['24/7 reliability', 'Seamless video walls']
  },
  {
    id: '5',
    name: 'Billboard Advertising',
    title: 'Billboard Advertising',
    summary: 'Large-format outdoor LED billboards for impactful advertising and brand awareness.',
    description: 'Maximum visibility advertising.',
    category: 'Advertising',
    image: 'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    imageUrl: 'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    isPublished: true,
    installations: 500,
    satisfaction: 95,
    benefits: ['High traffic visibility', 'Remote management']
  },
  {
    id: '6',
    name: 'Broadcast Studio',
    title: 'Broadcast Studio',
    summary: 'Professional LED backgrounds and displays for TV studios and virtual production.',
    description: 'Broadcast-quality visuals.',
    category: 'Media',
    image: 'https://images.pexels.com/photos/3379943/pexels-photo-3379943.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    imageUrl: 'https://images.pexels.com/photos/3379943/pexels-photo-3379943.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    isPublished: true,
    installations: 45,
    satisfaction: 98,
    benefits: ['Perfect color accuracy', 'No moiré effect']
  }
];