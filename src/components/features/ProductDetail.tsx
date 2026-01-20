"use client";
import { useState, useMemo } from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronRight, Check, Phone, Mail, MapPin } from 'lucide-react';
import { FALLBACK_PRODUCTS } from '@/data/fallbackData';

interface Product {
  id: string | number;
  name: string;
  category?: string;
  description?: string;
  image?: string;
  images?: string[];
  features?: string[];
  specifications?: Record<string, any>;
}

interface ProductDetailProps {
  product: Product;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('overview');

  // 图片列表
  const imageList = useMemo(() => {
    if (product.images && Array.isArray(product.images) && product.images.length > 0) {
      return product.images;
    }
    if (product.image) {
      return [product.image];
    }
    return ['https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'];
  }, [product]);

  // 特性列表
  const features = [
    { title: 'Ultra HD Resolution', desc: 'Crystal clear 4K display with exceptional detail' },
    { title: 'High Brightness', desc: '5000-8000 nits for outdoor visibility' },
    { title: 'Wide Viewing Angle', desc: '160° horizontal and vertical viewing' },
    { title: 'Weather Resistant', desc: 'IP65 rated for all weather conditions' },
    { title: 'Energy Efficient', desc: 'Low power consumption design' },
    { title: 'Easy Maintenance', desc: 'Front and rear service access' },
  ];

  // 规格表
  const specs = {
    'Display': [
      ['Pixel Pitch', 'P2.5 / P3 / P4 / P5'],
      ['Resolution', 'Up to 3840×2160 (4K)'],
      ['Brightness', '5000-8000 cd/m²'],
      ['Refresh Rate', '≥3840Hz'],
      ['Gray Scale', '16bit'],
    ],
    'Physical': [
      ['Cabinet Size', '500×500mm / 500×1000mm'],
      ['Cabinet Weight', '8-12 kg'],
      ['Material', 'Die-cast Aluminum'],
      ['Thickness', '65mm'],
    ],
    'Electrical': [
      ['Power Consumption', 'Max 650W/m², Avg 220W/m²'],
      ['Input Voltage', 'AC 110-240V'],
      ['Operating Temp', '-20°C ~ +50°C'],
      ['IP Rating', 'Front IP65 / Rear IP54'],
    ],
  };

  // 应用场景
  const applications = [
    { name: 'Sports Stadiums', image: 'https://images.pexels.com/photos/46798/the-ball-stadion-football-the-pitch-46798.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { name: 'Shopping Malls', image: 'https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { name: 'Concert Venues', image: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=400' },
  ];

  // 相关产品
  const relatedProducts = FALLBACK_PRODUCTS.filter(p => p.id !== product.id).slice(0, 4);

  return (
    <div className="w-full min-h-screen bg-white pt-20">
      {/* 面包屑 */}
      <div className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <ChevronRight size={14} />
            <Link href="/products" className="hover:text-blue-600">Products</Link>
            <ChevronRight size={14} />
            <span className="text-gray-900">{product.name}</span>
          </div>
        </div>
      </div>

      {/* 产品主区域 */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* 左侧 - 图片区 */}
            <div className="space-y-4">
              <div className="aspect-square bg-gray-50 rounded-2xl overflow-hidden">
                <img
                  src={imageList[currentImageIndex]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=800';
                  }}
                />
              </div>
              {imageList.length > 1 && (
                <div className="flex gap-3">
                  {imageList.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition ${idx === currentImageIndex ? 'border-blue-600' : 'border-gray-200'
                        }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* 右侧 - 信息区 */}
            <div>
              <div className="inline-block px-3 py-1 bg-blue-50 text-blue-600 text-sm font-medium rounded-full mb-4">
                {product.category || 'LED Display'}
              </div>

              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>

              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                {product.description || 'Professional LED display solution designed for world-class venues. Delivering exceptional visual quality with industry-leading brightness and reliability.'}
              </p>

              {/* 快速规格 */}
              <div className="grid grid-cols-2 gap-4 p-6 bg-gray-50 rounded-xl mb-8">
                <div>
                  <div className="text-sm text-gray-500 mb-1">Pixel Pitch</div>
                  <div className="text-lg font-semibold text-gray-900">P2.5 - P5</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">Brightness</div>
                  <div className="text-lg font-semibold text-gray-900">5000+ nits</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">Resolution</div>
                  <div className="text-lg font-semibold text-gray-900">Up to 4K</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">IP Rating</div>
                  <div className="text-lg font-semibold text-gray-900">IP65</div>
                </div>
              </div>

              {/* CTA按钮 */}
              <div className="flex gap-4 mb-8">
                <Link
                  href="/contact"
                  className="flex-1 inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition"
                >
                  Request Quote
                  <ArrowRight size={18} className="ml-2" />
                </Link>
                <button className="px-8 py-4 border-2 border-gray-200 text-gray-700 font-medium rounded-xl hover:border-gray-300 transition">
                  Download PDF
                </button>
              </div>

              {/* 联系信息 */}
              <div className="flex flex-wrap gap-6 text-sm text-gray-600">
                <a href="tel:+1234567890" className="flex items-center gap-2 hover:text-blue-600">
                  <Phone size={16} />
                  +1 (234) 567-890
                </a>
                <a href="mailto:sales@lumorge.com" className="flex items-center gap-2 hover:text-blue-600">
                  <Mail size={16} />
                  sales@lumorge.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tab导航区 */}
      <section className="border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-8 border-b border-gray-100">
            {['overview', 'specifications', 'applications'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 text-sm font-medium capitalize transition border-b-2 -mb-px ${activeTab === tab
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-900'
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Tab内容 */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          {/* Overview */}
          {activeTab === 'overview' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Key Features</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {features.map((feature, idx) => (
                  <div key={idx} className="p-6 bg-gray-50 rounded-xl">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                      <Check size={20} className="text-blue-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-600 text-sm">{feature.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Specifications */}
          {activeTab === 'specifications' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Technical Specifications</h2>
              <div className="grid md:grid-cols-3 gap-8">
                {Object.entries(specs).map(([category, items]) => (
                  <div key={category}>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                      {category}
                    </h3>
                    <dl className="space-y-3">
                      {items.map(([key, value], idx) => (
                        <div key={idx} className="flex justify-between">
                          <dt className="text-gray-500 text-sm">{key}</dt>
                          <dd className="text-gray-900 text-sm font-medium">{value}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Applications */}
          {activeTab === 'applications' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Applications</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {applications.map((app, idx) => (
                  <div key={idx} className="group relative aspect-[4/3] rounded-xl overflow-hidden">
                    <img src={app.image} alt={app.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <h3 className="text-white font-semibold text-lg">{app.name}</h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 相关产品 */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Related Products</h2>
            <Link href="/products" className="text-blue-600 font-medium hover:underline flex items-center gap-1">
              View All <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <Link key={p.id} href={`/products/${p.id}`} className="group">
                <div className="bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-lg transition">
                  <div className="aspect-square bg-gray-50">
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition line-clamp-1">
                      {p.name}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">{p.category}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 底部CTA */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-gray-400 mb-8">
            Contact us for pricing and custom solutions
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center px-8 py-4 bg-white text-gray-900 font-semibold rounded-xl hover:bg-gray-100 transition"
          >
            Contact Sales
            <ArrowRight size={18} className="ml-2" />
          </Link>
        </div>
      </section>
    </div>
  );
}