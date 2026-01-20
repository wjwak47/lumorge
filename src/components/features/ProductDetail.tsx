"use client";
import { useState, useMemo } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, ChevronDown, ChevronUp, Check, Download, Share2, Phone } from 'lucide-react';
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
  const [activeSpec, setActiveSpec] = useState<string | null>('Display Specifications');

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
      return product.features;
    }
    return ['4K Ultra HD Resolution', 'High Brightness 5000+ nits', 'Wide Viewing Angle 160°', 'Energy Efficient Design', 'Remote Management', 'Weather Resistant IP65'];
  }, [product]);

  // 规格数据
  const specifications = useMemo(() => {
    if (product.specifications && typeof product.specifications === 'object') {
      return Object.entries(product.specifications).map(([key, value]) => ({
        category: key,
        items: Array.isArray(value) ? value : [{ name: 'Details', value: String(value) }]
      }));
    }
    return [
      {
        category: 'Display Specifications',
        items: [
          { name: 'Pixel Pitch', value: 'P2.5 / P3 / P4 / P5' },
          { name: 'Resolution', value: 'Up to 4K (3840×2160)' },
          { name: 'Brightness', value: '5000-8000 nits (outdoor)' },
          { name: 'Refresh Rate', value: '3840Hz' },
          { name: 'Contrast Ratio', value: '5000:1' },
        ]
      },
      {
        category: 'Physical Specifications',
        items: [
          { name: 'Cabinet Size', value: '500×500mm / 500×1000mm' },
          { name: 'Cabinet Material', value: 'Die-cast Aluminum' },
          { name: 'Weight', value: '8-12 kg/panel' },
          { name: 'Installation', value: 'Front/Rear Service' },
        ]
      },
      {
        category: 'Environmental',
        items: [
          { name: 'IP Rating', value: 'IP65 (front) / IP54 (rear)' },
          { name: 'Operating Temp', value: '-20°C to +50°C' },
          { name: 'Power Consumption', value: '≤350W/m²' },
          { name: 'Lifespan', value: '100,000 hours' },
        ]
      }
    ];
  }, [product]);

  // 相关产品
  const relatedProducts = FALLBACK_PRODUCTS.filter(p => p.id !== product.id).slice(0, 3);

  return (
    <div className="w-full min-h-screen bg-white pt-20">
      {/* 面包屑导航 */}
      <div className="bg-[#FAFBFD] border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-[#64748B] hover:text-[#0A1628]">Home</Link>
            <span className="text-[#CBD5E0]">/</span>
            <Link href="/products" className="text-[#64748B] hover:text-[#0A1628]">Products</Link>
            <span className="text-[#CBD5E0]">/</span>
            <span className="text-[#0A1628] font-medium">{product.name}</span>
          </div>
        </div>
      </div>

      {/* 主要内容区 - 左右两栏布局 */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* 左侧 - 产品图片 */}
            <div className="space-y-4">
              {/* 主图 */}
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-[#FAFBFD] border border-[#E2E8F0]">
                <img
                  src={imageList[currentImageIndex]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=800';
                  }}
                />

                {/* 图片导航箭头 */}
                {imageList.length > 1 && (
                  <>
                    <button
                      onClick={() => setCurrentImageIndex(prev => prev === 0 ? imageList.length - 1 : prev - 1)}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white shadow-lg flex items-center justify-center transition-all"
                    >
                      <ArrowLeft size={18} className="text-[#0A1628]" />
                    </button>
                    <button
                      onClick={() => setCurrentImageIndex(prev => (prev + 1) % imageList.length)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white shadow-lg flex items-center justify-center transition-all"
                    >
                      <ArrowRight size={18} className="text-[#0A1628]" />
                    </button>
                  </>
                )}
              </div>

              {/* 缩略图 */}
              {imageList.length > 1 && (
                <div className="flex gap-3">
                  {imageList.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${index === currentImageIndex
                          ? 'border-[#2563EB] shadow-lg'
                          : 'border-[#E2E8F0] hover:border-[#94A3B8]'
                        }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* 右侧 - 产品信息 */}
            <div className="space-y-6">
              {/* 分类标签 */}
              <span className="inline-block px-3 py-1 bg-[#2563EB]/10 text-[#2563EB] text-sm font-semibold rounded-full">
                {product.category || 'LED Display'}
              </span>

              {/* 产品名称 */}
              <h1 className="text-3xl md:text-4xl font-bold text-[#0A1628]">
                {product.name}
              </h1>

              {/* 产品描述 */}
              <p className="text-lg text-[#64748B] leading-relaxed">
                {product.description || 'Premium LED display solution designed for professional applications. Delivering exceptional visual quality, reliability, and seamless integration for world-class venues.'}
              </p>

              {/* 核心特性 */}
              <div className="pt-4">
                <h3 className="text-sm font-semibold text-[#0A1628] uppercase tracking-wider mb-4">Key Features</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {features.slice(0, 6).map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-[#10B981]/10 flex items-center justify-center flex-shrink-0">
                        <Check size={12} className="text-[#10B981]" />
                      </div>
                      <span className="text-[#4A5568] text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 操作按钮 */}
              <div className="pt-6 space-y-4">
                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/contact"
                    className="flex-1 min-w-[200px] inline-flex items-center justify-center px-8 py-4 bg-[#0A1628] text-white font-semibold rounded-xl hover:bg-[#1E293B] transition-all"
                  >
                    <Phone size={18} className="mr-2" />
                    Request Quote
                  </Link>
                  <button className="px-4 py-4 border-2 border-[#E2E8F0] rounded-xl hover:border-[#0A1628] transition-all">
                    <Download size={20} className="text-[#64748B]" />
                  </button>
                  <button className="px-4 py-4 border-2 border-[#E2E8F0] rounded-xl hover:border-[#0A1628] transition-all">
                    <Share2 size={20} className="text-[#64748B]" />
                  </button>
                </div>

                {/* 快速联系 */}
                <p className="text-sm text-[#64748B]">
                  Need help? Call us at <a href="tel:+1234567890" className="text-[#2563EB] font-medium hover:underline">+1 (234) 567-890</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 技术规格区域 */}
      <section className="py-16 bg-[#FAFBFD]">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-[#0A1628] mb-8">Technical Specifications</h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {specifications.map((spec, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden"
              >
                {/* 规格标题 */}
                <button
                  onClick={() => setActiveSpec(activeSpec === spec.category ? null : spec.category)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-[#FAFBFD] transition-colors"
                >
                  <span className="font-semibold text-[#0A1628]">{spec.category}</span>
                  {activeSpec === spec.category ? (
                    <ChevronUp size={20} className="text-[#2563EB]" />
                  ) : (
                    <ChevronDown size={20} className="text-[#64748B]" />
                  )}
                </button>

                {/* 规格内容 */}
                <div className={`transition-all duration-300 ${activeSpec === spec.category ? 'max-h-96' : 'max-h-0'} overflow-hidden`}>
                  <div className="px-5 pb-5 border-t border-[#E2E8F0]">
                    <table className="w-full mt-4">
                      <tbody>
                        {spec.items.map((item: any, i: number) => (
                          <tr key={i} className="border-b border-[#F1F5F9] last:border-0">
                            <td className="py-3 text-sm text-[#64748B]">{item.name}</td>
                            <td className="py-3 text-sm text-[#0A1628] font-medium text-right">{item.value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 相关产品 */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-8">
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
                <div className="rounded-2xl overflow-hidden bg-[#FAFBFD] border border-[#E2E8F0] hover:border-[#2563EB]/30 hover:shadow-xl transition-all duration-300">
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
      <section className="py-16 bg-[#0A1628]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Transform Your Venue?
          </h2>
          <p className="text-white/70 mb-8">
            Get in touch with our team for custom configurations and pricing
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center px-8 py-4 bg-white text-[#0A1628] font-semibold rounded-xl hover:bg-[#F1F5F9] transition-all"
            >
              Contact Sales
              <ArrowRight size={18} className="ml-2" />
            </Link>
            <Link
              href="/products"
              className="inline-flex items-center px-8 py-4 border-2 border-white/30 text-white font-medium rounded-xl hover:bg-white/10 transition-all"
            >
              Browse Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}