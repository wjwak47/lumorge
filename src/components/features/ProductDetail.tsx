"use client";
import { useState, useMemo } from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowLeft, Check, Star, Shield, Zap, Globe, ChevronRight } from 'lucide-react';
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
  const [selectedImage, setSelectedImage] = useState(0);

  // 图片列表
  const images = useMemo(() => {
    const list = [];
    if (product.image) list.push(product.image);
    if (product.images?.length) list.push(...product.images);
    if (list.length === 0) {
      list.push(
        'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=800'
      );
    }
    return list.slice(0, 4);
  }, [product]);

  // 相关产品
  const related = FALLBACK_PRODUCTS.filter(p => p.id !== product.id).slice(0, 3);

  // 规格数据
  const specs = [
    { label: 'Pixel Pitch', value: 'P2.5 - P5' },
    { label: 'Resolution', value: 'Up to 4K' },
    { label: 'Brightness', value: '5000+ nits' },
    { label: 'Refresh Rate', value: '3840Hz' },
    { label: 'IP Rating', value: 'IP65' },
    { label: 'Viewing Angle', value: '160°' },
  ];

  // 特性
  const highlights = [
    { icon: Zap, title: 'High Performance', desc: 'Ultra-fast refresh rate for smooth visuals' },
    { icon: Shield, title: 'Durable Build', desc: 'Weather-resistant for any environment' },
    { icon: Globe, title: 'Global Support', desc: '24/7 technical assistance worldwide' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white pt-20">
      {/* 面包屑 */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex items-center gap-2 text-sm">
          <Link href="/" className="text-slate-500 hover:text-blue-600 transition">Home</Link>
          <ChevronRight size={14} className="text-slate-300" />
          <Link href="/products" className="text-slate-500 hover:text-blue-600 transition">Products</Link>
          <ChevronRight size={14} className="text-slate-300" />
          <span className="text-slate-900 font-medium">{product.name}</span>
        </div>
      </div>

      {/* 主产品区 */}
      <section className="max-w-7xl mx-auto px-6 pb-16">
        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 overflow-hidden">
          <div className="grid lg:grid-cols-5 gap-0">
            {/* 左侧图片区 - 3列 */}
            <div className="lg:col-span-3 p-8 bg-gradient-to-br from-slate-100 to-slate-50">
              {/* 主图 */}
              <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-white shadow-lg mb-4">
                <img
                  src={images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=800';
                  }}
                />
              </div>

              {/* 缩略图 - 水平排列 */}
              <div className="flex gap-3">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`relative w-20 h-20 rounded-xl overflow-hidden transition-all ${idx === selectedImage
                        ? 'ring-2 ring-blue-600 ring-offset-2'
                        : 'opacity-60 hover:opacity-100'
                      }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* 右侧信息区 - 2列 */}
            <div className="lg:col-span-2 p-8 flex flex-col">
              {/* 标签 */}
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                  {product.category || 'LED Display'}
                </span>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map(i => (
                    <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
                  ))}
                  <span className="text-xs text-slate-500 ml-1">(128)</span>
                </div>
              </div>

              {/* 标题 */}
              <h1 className="text-3xl font-bold text-slate-900 mb-4">
                {product.name}
              </h1>

              {/* 描述 */}
              <p className="text-slate-600 leading-relaxed mb-6">
                {product.description || 'Professional LED display solution with exceptional visual quality, designed for world-class venues and installations.'}
              </p>

              {/* 规格网格 */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                {specs.map((spec, idx) => (
                  <div key={idx} className="text-center p-3 bg-slate-50 rounded-xl">
                    <div className="text-xs text-slate-500 mb-1">{spec.label}</div>
                    <div className="text-sm font-semibold text-slate-900">{spec.value}</div>
                  </div>
                ))}
              </div>

              {/* 分隔线 */}
              <div className="border-t border-slate-100 my-4" />

              {/* CTA */}
              <div className="mt-auto space-y-3">
                <Link
                  href="/contact"
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 transition shadow-lg shadow-blue-600/25"
                >
                  Request Quote
                  <ArrowRight size={18} />
                </Link>
                <button className="w-full px-6 py-4 border-2 border-slate-200 text-slate-700 font-medium rounded-xl hover:border-slate-300 hover:bg-slate-50 transition">
                  Download Datasheet
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 特性区 */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-bold text-slate-900 text-center mb-12">Why Choose This Product</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {highlights.map((item, idx) => (
            <div key={idx} className="group p-8 bg-white rounded-2xl border border-slate-100 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-100/50 transition-all">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <item.icon size={24} className="text-white" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">{item.title}</h3>
              <p className="text-slate-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 详细规格 */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-10 text-white">
          <h2 className="text-2xl font-bold mb-8">Technical Specifications</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Display */}
            <div>
              <h3 className="text-blue-400 font-semibold mb-4 uppercase text-sm tracking-wider">Display</h3>
              <dl className="space-y-3">
                {[['Pixel Pitch', 'P2.5 / P3 / P4 / P5'], ['Resolution', 'Up to 4K'], ['Brightness', '5000-8000 nits'], ['Refresh', '≥3840Hz']].map(([k, v]) => (
                  <div key={k} className="flex justify-between border-b border-slate-700 pb-2">
                    <dt className="text-slate-400">{k}</dt>
                    <dd className="font-medium">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
            {/* Physical */}
            <div>
              <h3 className="text-blue-400 font-semibold mb-4 uppercase text-sm tracking-wider">Physical</h3>
              <dl className="space-y-3">
                {[['Cabinet', '500×500 / 500×1000mm'], ['Weight', '8-12 kg'], ['Material', 'Die-cast Aluminum'], ['Service', 'Front/Rear']].map(([k, v]) => (
                  <div key={k} className="flex justify-between border-b border-slate-700 pb-2">
                    <dt className="text-slate-400">{k}</dt>
                    <dd className="font-medium">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
            {/* Environment */}
            <div>
              <h3 className="text-blue-400 font-semibold mb-4 uppercase text-sm tracking-wider">Environment</h3>
              <dl className="space-y-3">
                {[['IP Rating', 'IP65 / IP54'], ['Temperature', '-20°C ~ +50°C'], ['Power', '≤350W/m²'], ['Lifespan', '100,000 hrs']].map(([k, v]) => (
                  <div key={k} className="flex justify-between border-b border-slate-700 pb-2">
                    <dt className="text-slate-400">{k}</dt>
                    <dd className="font-medium">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* 相关产品 */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-slate-900">Related Products</h2>
          <Link href="/products" className="text-blue-600 font-medium hover:underline flex items-center gap-1">
            View All <ArrowRight size={16} />
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {related.map(p => (
            <Link key={p.id} href={`/products/${p.id}`} className="group">
              <div className="bg-white rounded-2xl overflow-hidden border border-slate-100 hover:shadow-xl transition-all">
                <div className="aspect-[3/2] bg-slate-100 overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5">
                  <span className="text-xs font-medium text-blue-600">{p.category}</span>
                  <h3 className="text-lg font-semibold text-slate-900 mt-1 group-hover:text-blue-600 transition">
                    {p.name}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 底部CTA */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Get Started?</h2>
          <p className="text-blue-100 mb-8">Contact us for pricing and custom solutions</p>
          <Link
            href="/contact"
            className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition"
          >
            Contact Sales <ArrowRight size={18} className="ml-2" />
          </Link>
        </div>
      </section>
    </div>
  );
}