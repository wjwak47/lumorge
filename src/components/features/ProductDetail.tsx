"use client";
import { useState, useMemo } from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowLeft, Check, ChevronRight, Phone, Mail } from 'lucide-react';
import { FALLBACK_PRODUCTS } from '@/data/fallbackData';

interface Product {
  id: string | number;
  name: string;
  category?: string;
  description?: string;
  image?: string;
  images?: string[];
  features?: string[];
}

interface ProductDetailProps {
  product: Product;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const [activeImage, setActiveImage] = useState(0);
  const [activeSection, setActiveSection] = useState('features');

  const images = useMemo(() => {
    const list: string[] = [];
    if (product.image) list.push(product.image);
    if (product.images?.length) list.push(...product.images);
    return list.length > 0 ? list : [
      'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=800',
    ];
  }, [product]);

  const related = FALLBACK_PRODUCTS.filter(p => p.id !== product.id).slice(0, 4);

  return (
    <div className="min-h-screen bg-[#fafafa]">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-[#1a1a2e] via-[#16213e] to-[#0f3460] pt-24 pb-32 overflow-hidden">
        {/* 装饰光效 */}
        <div className="absolute top-20 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[128px]" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-purple-500/15 rounded-full blur-[100px]" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* 面包屑 */}
          <div className="flex items-center gap-2 text-sm text-white/50 mb-8">
            <Link href="/" className="hover:text-white transition">Home</Link>
            <ChevronRight size={14} />
            <Link href="/products" className="hover:text-white transition">Products</Link>
            <ChevronRight size={14} />
            <span className="text-white">{product.name}</span>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* 左侧 - 产品图片 */}
            <div className="order-2 lg:order-1">
              <div className="relative">
                {/* 主图 */}
                <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-white/5 backdrop-blur-sm border border-white/10 shadow-2xl">
                  <img
                    src={images[activeImage]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=800';
                    }}
                  />
                </div>

                {/* 缩略图 */}
                {images.length > 1 && (
                  <div className="flex justify-center gap-3 mt-6">
                    {images.slice(0, 4).map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveImage(idx)}
                        className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all duration-300 ${idx === activeImage
                            ? 'border-blue-400 scale-105'
                            : 'border-white/20 opacity-50 hover:opacity-80'
                          }`}
                      >
                        <img src={img} alt="" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* 右侧 - 产品信息 */}
            <div className="order-1 lg:order-2 text-white">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 border border-blue-400/30 rounded-full text-blue-300 text-sm font-medium mb-6">
                <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                {product.category || 'LED Display'}
              </div>

              <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                {product.name}
              </h1>

              <p className="text-lg text-white/70 leading-relaxed mb-8 max-w-lg">
                {product.description || 'Next-generation LED display technology delivering exceptional visual experiences for premium venues worldwide.'}
              </p>

              {/* 快速规格 */}
              <div className="grid grid-cols-4 gap-4 mb-10">
                {[
                  { label: 'Resolution', value: '4K+' },
                  { label: 'Brightness', value: '5000nit' },
                  { label: 'Refresh', value: '3840Hz' },
                  { label: 'IP Rating', value: 'IP65' },
                ].map((spec, idx) => (
                  <div key={idx} className="text-center p-4 bg-white/5 rounded-2xl border border-white/10">
                    <div className="text-2xl font-bold text-white mb-1">{spec.value}</div>
                    <div className="text-xs text-white/50 uppercase tracking-wider">{spec.label}</div>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg shadow-blue-500/30"
                >
                  Get Quote <ArrowRight size={18} />
                </Link>
                <button className="px-8 py-4 border border-white/20 text-white font-medium rounded-xl hover:bg-white/10 transition-all">
                  Download Specs
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 内容区域 */}
      <section className="max-w-7xl mx-auto px-6 -mt-16 relative z-20">
        {/* 内容卡片 */}
        <div className="bg-white rounded-3xl shadow-xl p-8 lg:p-12">
          {/* Tab导航 */}
          <div className="flex gap-1 p-1 bg-gray-100 rounded-xl w-fit mb-10">
            {['features', 'specifications', 'applications'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveSection(tab)}
                className={`px-6 py-3 rounded-lg text-sm font-medium capitalize transition-all ${activeSection === tab
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Features */}
          {activeSection === 'features' && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: 'Ultra HD Display', desc: '4K resolution with HDR support for stunning visuals', icon: '🖥️' },
                { title: 'High Brightness', desc: 'Up to 8000 nits for perfect outdoor visibility', icon: '☀️' },
                { title: 'Wide Viewing Angle', desc: '160° horizontal and vertical viewing angle', icon: '👁️' },
                { title: 'Weather Resistant', desc: 'IP65 rated for all weather conditions', icon: '🌧️' },
                { title: 'Energy Efficient', desc: 'Smart power management reduces costs by 40%', icon: '⚡' },
                { title: 'Easy Maintenance', desc: 'Front and rear access for quick servicing', icon: '🔧' },
              ].map((feature, idx) => (
                <div key={idx} className="p-6 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors group">
                  <div className="text-3xl mb-4">{feature.icon}</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.desc}</p>
                </div>
              ))}
            </div>
          )}

          {/* Specifications */}
          {activeSection === 'specifications' && (
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { title: 'Display', items: [['Pixel Pitch', 'P2.5 - P5'], ['Resolution', 'Up to 4K'], ['Brightness', '5000-8000 nits'], ['Refresh Rate', '≥3840Hz'], ['Gray Scale', '16bit']] },
                { title: 'Physical', items: [['Cabinet Size', '500×500/1000mm'], ['Weight', '8-12 kg/panel'], ['Material', 'Die-cast Aluminum'], ['Thickness', '65mm'], ['Service', 'Front/Rear']] },
                { title: 'Electrical', items: [['Power', 'Max 650W/m²'], ['Voltage', 'AC 110-240V'], ['Temperature', '-20°C ~ +50°C'], ['IP Rating', 'IP65/IP54'], ['Lifespan', '100,000 hrs']] },
              ].map((section, idx) => (
                <div key={idx}>
                  <h3 className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-4">{section.title}</h3>
                  <div className="space-y-3">
                    {section.items.map(([k, v], i) => (
                      <div key={i} className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-500 text-sm">{k}</span>
                        <span className="text-gray-900 text-sm font-medium">{v}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Applications */}
          {activeSection === 'applications' && (
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { name: 'Sports Stadiums', img: 'https://images.pexels.com/photos/46798/the-ball-stadion-football-the-pitch-46798.jpeg?auto=compress&cs=tinysrgb&w=600' },
                { name: 'Shopping Centers', img: 'https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg?auto=compress&cs=tinysrgb&w=600' },
                { name: 'Concert Venues', img: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=600' },
              ].map((app, idx) => (
                <div key={idx} className="group relative aspect-video rounded-2xl overflow-hidden cursor-pointer">
                  <img src={app.img} alt={app.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-white font-semibold text-lg">{app.name}</h3>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 相关产品 */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">More Products</h2>
          <Link href="/products" className="text-blue-600 font-medium hover:underline flex items-center gap-1">
            View All <ArrowRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {related.map(p => (
            <Link key={p.id} href={`/products/${p.id}`} className="group">
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all">
                <div className="aspect-square bg-gray-100 overflow-hidden">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-4">
                  <span className="text-xs font-medium text-blue-600">{p.category}</span>
                  <h3 className="font-semibold text-gray-900 mt-1 group-hover:text-blue-600 transition">{p.name}</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 联系CTA */}
      <section className="bg-[#1a1a2e] py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">Ready to Transform Your Venue?</h2>
          <p className="text-white/60 mb-8 text-lg">Get in touch with our team for custom solutions</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-blue-500 text-white font-semibold rounded-xl hover:bg-blue-600 transition">
              Contact Sales <ArrowRight size={18} />
            </Link>
            <a href="tel:+1234567890" className="inline-flex items-center gap-2 px-8 py-4 border border-white/20 text-white font-medium rounded-xl hover:bg-white/10 transition">
              <Phone size={18} /> Call Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}