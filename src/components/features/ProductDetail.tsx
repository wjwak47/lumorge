"use client";
import { useState, useMemo } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, ChevronDown, Check, Download, Share2, X } from 'lucide-react';
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
  const [showSpecs, setShowSpecs] = useState(false);
  const [selectedPitch, setSelectedPitch] = useState('P2.5');
  const [selectedSize, setSelectedSize] = useState('500×500mm');

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
  const features = useMemo(() => {
    if (Array.isArray(product.features) && product.features.length > 0) {
      return product.features.slice(0, 4);
    }
    return ['4K Resolution', 'High Brightness', 'Wide Angle', 'IP65 Rated'];
  }, [product]);

  // 规格数据
  const specifications = [
    {
      category: 'Display',
      items: [
        { name: 'Pixel Pitch', value: selectedPitch },
        { name: 'Resolution', value: 'Up to 4K' },
        { name: 'Brightness', value: '5000-8000 nits' },
        { name: 'Refresh Rate', value: '3840Hz' },
      ]
    },
    {
      category: 'Physical',
      items: [
        { name: 'Cabinet Size', value: selectedSize },
        { name: 'Material', value: 'Die-cast Aluminum' },
        { name: 'Weight', value: '8-12 kg/panel' },
        { name: 'Service', value: 'Front/Rear' },
      ]
    },
    {
      category: 'Environment',
      items: [
        { name: 'IP Rating', value: 'IP65/IP54' },
        { name: 'Temperature', value: '-20°C to +50°C' },
        { name: 'Power', value: '≤350W/m²' },
        { name: 'Lifespan', value: '100,000 hrs' },
      ]
    }
  ];

  // 相关产品
  const relatedProducts = FALLBACK_PRODUCTS.filter(p => p.id !== product.id).slice(0, 3);

  // 像素间距选项
  const pitchOptions = ['P1.5', 'P2.5', 'P3', 'P4', 'P5'];
  const sizeOptions = ['500×500mm', '500×1000mm', '1000×1000mm'];

  return (
    <div className="w-full min-h-screen bg-[#0A1628]">
      {/* 顶部导航栏 */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-[#0A1628]/80 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/products" className="flex items-center gap-2 text-white/70 hover:text-white transition-colors">
            <ArrowLeft size={18} />
            <span className="text-sm font-medium">Products</span>
          </Link>

          <div className="flex items-center gap-3">
            <button className="p-2 rounded-full hover:bg-white/10 transition-colors">
              <Share2 size={18} className="text-white/70" />
            </button>
            <button className="p-2 rounded-full hover:bg-white/10 transition-colors">
              <Download size={18} className="text-white/70" />
            </button>
          </div>
        </div>
      </div>

      {/* 主要内容区 - 全屏产品展示 */}
      <section className="relative min-h-screen pt-16 pb-24 flex items-center">
        {/* 背景光效 */}
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-[#2563EB]/20 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-[#8B5CF6]/15 rounded-full blur-[120px]" />

        {/* 产品大图 */}
        <div className="absolute inset-0 pt-16 pb-24 flex items-center justify-center px-6">
          <div className="relative w-full max-w-4xl aspect-video">
            <img
              src={imageList[currentImageIndex]}
              alt={product.name}
              className="w-full h-full object-contain drop-shadow-2xl"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=800';
              }}
            />
          </div>

          {/* 图片导航 */}
          {imageList.length > 1 && (
            <>
              <button
                onClick={() => setCurrentImageIndex(prev => prev === 0 ? imageList.length - 1 : prev - 1)}
                className="absolute left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center text-white transition-all"
              >
                <ArrowLeft size={20} />
              </button>
              <button
                onClick={() => setCurrentImageIndex(prev => (prev + 1) % imageList.length)}
                className="absolute right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center text-white transition-all"
              >
                <ArrowRight size={20} />
              </button>
            </>
          )}
        </div>

        {/* 悬浮信息卡片 - 毛玻璃效果 */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-full max-w-3xl px-6">
          <div className="bg-white/10 backdrop-blur-2xl rounded-3xl border border-white/20 p-8 shadow-2xl">
            {/* 产品标题 */}
            <div className="flex items-start justify-between mb-6">
              <div>
                <span className="inline-block px-3 py-1 bg-[#2563EB] text-white text-xs font-semibold rounded-full mb-3">
                  {product.category || 'LED Display'}
                </span>
                <h1 className="text-3xl md:text-4xl font-bold text-white">
                  {product.name}
                </h1>
              </div>
            </div>

            {/* 配置选择器 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* 像素间距 */}
              <div>
                <label className="block text-white/60 text-sm mb-2">Pixel Pitch</label>
                <div className="flex flex-wrap gap-2">
                  {pitchOptions.map(pitch => (
                    <button
                      key={pitch}
                      onClick={() => setSelectedPitch(pitch)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedPitch === pitch
                          ? 'bg-white text-[#0A1628]'
                          : 'bg-white/10 text-white hover:bg-white/20'
                        }`}
                    >
                      {pitch}
                    </button>
                  ))}
                </div>
              </div>

              {/* 尺寸 */}
              <div>
                <label className="block text-white/60 text-sm mb-2">Cabinet Size</label>
                <div className="flex flex-wrap gap-2">
                  {sizeOptions.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedSize === size
                          ? 'bg-white text-[#0A1628]'
                          : 'bg-white/10 text-white hover:bg-white/20'
                        }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 核心特性 */}
            <div className="flex flex-wrap gap-4 mb-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-[#10B981]/20 flex items-center justify-center">
                    <Check size={12} className="text-[#10B981]" />
                  </div>
                  <span className="text-white/80 text-sm">{feature}</span>
                </div>
              ))}
            </div>

            {/* 操作按钮 */}
            <div className="flex gap-4">
              <Link
                href="/contact"
                className="flex-1 inline-flex items-center justify-center px-8 py-4 bg-white text-[#0A1628] font-semibold rounded-xl hover:bg-[#F1F5F9] transition-all"
              >
                Request Quote
                <ArrowRight size={18} className="ml-2" />
              </Link>
              <button
                onClick={() => setShowSpecs(true)}
                className="px-8 py-4 border-2 border-white/30 text-white font-medium rounded-xl hover:bg-white/10 transition-all flex items-center gap-2"
              >
                View Specs
                <ChevronDown size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* 图片指示器 */}
        {imageList.length > 1 && (
          <div className="absolute bottom-48 left-1/2 -translate-x-1/2 flex gap-2">
            {imageList.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${index === currentImageIndex ? 'bg-white w-6' : 'bg-white/40 hover:bg-white/60'
                  }`}
              />
            ))}
          </div>
        )}
      </section>

      {/* 规格弹窗 */}
      {showSpecs && (
        <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-6">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[80vh] overflow-auto">
            {/* 弹窗头部 */}
            <div className="sticky top-0 bg-white border-b border-[#E2E8F0] px-8 py-5 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-[#0A1628]">Technical Specifications</h2>
              <button
                onClick={() => setShowSpecs(false)}
                className="p-2 rounded-full hover:bg-[#F1F5F9] transition-colors"
              >
                <X size={24} className="text-[#64748B]" />
              </button>
            </div>

            {/* 规格内容 */}
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {specifications.map((spec, index) => (
                  <div key={index} className="bg-[#FAFBFD] rounded-2xl p-6">
                    <h3 className="font-semibold text-[#0A1628] mb-4">{spec.category}</h3>
                    <div className="space-y-3">
                      {spec.items.map((item, i) => (
                        <div key={i} className="flex justify-between">
                          <span className="text-[#64748B] text-sm">{item.name}</span>
                          <span className="text-[#0A1628] text-sm font-medium">{item.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* 下载按钮 */}
              <div className="mt-8 text-center">
                <button className="inline-flex items-center px-6 py-3 bg-[#0A1628] text-white font-medium rounded-xl hover:bg-[#1E293B] transition-all">
                  <Download size={18} className="mr-2" />
                  Download Full Spec Sheet
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 相关产品区域 */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-2xl font-bold text-[#0A1628]">Related Products</h2>
            <Link href="/products" className="text-[#2563EB] font-medium hover:underline flex items-center gap-1">
              View All <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <Link
                key={relatedProduct.id}
                href={`/products/${relatedProduct.id}`}
                className="group block"
              >
                <div className="rounded-2xl overflow-hidden bg-[#FAFBFD] border border-[#E2E8F0] hover:shadow-xl transition-all duration-300">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={relatedProduct.image}
                      alt={relatedProduct.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=800';
                      }}
                    />
                  </div>
                  <div className="p-5">
                    <span className="text-xs font-semibold text-[#2563EB] uppercase">
                      {relatedProduct.category}
                    </span>
                    <h3 className="text-lg font-bold text-[#0A1628] mt-1 group-hover:text-[#2563EB] transition-colors">
                      {relatedProduct.name}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 底部CTA */}
      <section className="bg-[#0A1628] py-16 border-t border-white/10">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Transform Your Venue?
          </h2>
          <p className="text-white/60 mb-8">
            Get in touch with our team for custom configurations and pricing
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center px-8 py-4 bg-white text-[#0A1628] font-semibold rounded-xl hover:bg-[#F1F5F9] transition-all"
          >
            Contact Sales
            <ArrowRight size={18} className="ml-2" />
          </Link>
        </div>
      </section>
    </div>
  );
}