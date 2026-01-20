"use client";
import { useState, useMemo } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, ChevronDown, ChevronUp, CheckCircle } from 'lucide-react';
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
  const [activeSpec, setActiveSpec] = useState<string | null>(null);

  // 处理图片列表
  const imageList = useMemo(() => {
    if (product.images && Array.isArray(product.images) && product.images.length > 0) {
      return product.images;
    }
    if (product.image) {
      return [product.image];
    }
    return ['https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'];
  }, [product]);

  // 处理特性列表
  const features = useMemo(() => {
    if (Array.isArray(product.features)) {
      return product.features;
    }
    return ['High Resolution', 'Energy Efficient', 'Easy Installation', 'Remote Control'];
  }, [product]);

  // 处理规格
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
          { name: 'Pixel Pitch', value: 'P2.5 - P10' },
          { name: 'Resolution', value: 'Up to 4K' },
          { name: 'Brightness', value: '5000-8000 nits' },
        ]
      },
      {
        category: 'Physical',
        items: [
          { name: 'Cabinet Size', value: '500x500mm / 500x1000mm' },
          { name: 'Weight', value: '8-12 kg/panel' },
          { name: 'IP Rating', value: 'IP65 (front) / IP54 (rear)' },
        ]
      }
    ];
  }, [product]);

  // 相关产品
  const relatedProducts = FALLBACK_PRODUCTS.filter(p => p.id !== product.id).slice(0, 3);

  // 切换图片
  const nextImage = () => setCurrentImageIndex(prev => (prev + 1) % imageList.length);
  const prevImage = () => setCurrentImageIndex(prev => prev === 0 ? imageList.length - 1 : prev - 1);

  return (
    <div className="w-full min-h-screen bg-white">
      {/* 全屏产品大图 */}
      <section className="relative h-[60vh] min-h-[500px] bg-[#0A1628] overflow-hidden">
        {/* 背景光效 */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#2563EB]/15 rounded-full blur-[100px]" />

        {/* 产品图片 */}
        <div className="absolute inset-0 flex items-center justify-center p-8">
          <img
            src={imageList[currentImageIndex]}
            alt={product.name}
            className="max-w-full max-h-full object-contain"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=800';
            }}
          />
        </div>

        {/* 图片导航 */}
        {imageList.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center text-white transition-all"
            >
              <ArrowLeft size={20} />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center text-white transition-all"
            >
              <ArrowRight size={20} />
            </button>

            {/* 图片指示器 */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
              {imageList.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${index === currentImageIndex ? 'bg-white w-6' : 'bg-white/40 hover:bg-white/60'
                    }`}
                />
              ))}
            </div>
          </>
        )}

        {/* 返回按钮 */}
        <Link
          href="/products"
          className="absolute top-8 left-8 flex items-center gap-2 text-white/70 hover:text-white transition-colors"
        >
          <ArrowLeft size={18} />
          <span className="text-sm font-medium">Back to Products</span>
        </Link>
      </section>

      {/* 产品信息区 */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-6">
          {/* 分类 */}
          <span className="text-sm font-medium text-[#2563EB] uppercase tracking-wider">
            {product.category || 'LED Display'}
          </span>

          {/* 标题 */}
          <h1 className="text-4xl md:text-5xl font-bold text-[#0A1628] mt-2 mb-6">
            {product.name}
          </h1>

          {/* 描述 */}
          <p className="text-lg text-[#64748B] leading-relaxed mb-8">
            {product.description || 'Premium LED display solution designed for professional applications. Delivering exceptional visual quality and reliability.'}
          </p>

          {/* CTA按钮 */}
          <div className="flex flex-wrap gap-4 mb-12">
            <Link
              href="/contact"
              className="inline-flex items-center px-8 py-4 bg-[#0A1628] text-white font-semibold rounded-full hover:bg-[#1E293B] transition-all"
            >
              Get Quote
              <ArrowRight size={18} className="ml-2" />
            </Link>
            <button className="inline-flex items-center px-8 py-4 border-2 border-[#E2E8F0] text-[#0A1628] font-medium rounded-full hover:border-[#0A1628] transition-all">
              Download Spec Sheet
            </button>
          </div>
        </div>
      </section>

      {/* 核心特性 */}
      <section className="py-16 bg-[#FAFBFD]">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-[#0A1628] mb-8 text-center">Key Features</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {features.slice(0, 4).map((feature, index) => (
              <div key={index} className="text-center p-6 bg-white rounded-2xl">
                <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-[#2563EB]/10 flex items-center justify-center">
                  <CheckCircle size={24} className="text-[#2563EB]" />
                </div>
                <p className="font-medium text-[#0A1628]">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 技术规格 */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-[#0A1628] mb-8">Technical Specifications</h2>

          <div className="space-y-3">
            {specifications.map((spec, index) => (
              <div key={index} className="border border-[#E2E8F0] rounded-xl overflow-hidden">
                <button
                  onClick={() => setActiveSpec(activeSpec === spec.category ? null : spec.category)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-[#FAFBFD] transition-colors"
                >
                  <span className="font-semibold text-[#0A1628]">{spec.category}</span>
                  {activeSpec === spec.category ? (
                    <ChevronUp size={20} className="text-[#64748B]" />
                  ) : (
                    <ChevronDown size={20} className="text-[#64748B]" />
                  )}
                </button>

                {activeSpec === spec.category && (
                  <div className="px-5 pb-5 border-t border-[#E2E8F0]">
                    <table className="w-full mt-4">
                      <tbody>
                        {spec.items.map((item: any, i: number) => (
                          <tr key={i} className="border-b border-[#F1F5F9] last:border-0">
                            <td className="py-3 text-[#64748B]">{item.name}</td>
                            <td className="py-3 text-[#0A1628] font-medium text-right">{item.value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 相关产品 */}
      <section className="py-16 bg-[#FAFBFD]">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-[#0A1628] mb-8">Related Products</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedProducts.map((relatedProduct) => (
              <Link
                key={relatedProduct.id}
                href={`/products/${relatedProduct.id}`}
                className="group block"
              >
                <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-white mb-4">
                  <img
                    src={relatedProduct.image}
                    alt={relatedProduct.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=800';
                    }}
                  />
                </div>
                <h3 className="font-semibold text-[#0A1628] group-hover:text-[#2563EB] transition-colors">
                  {relatedProduct.name}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 底部CTA */}
      <section className="py-20 bg-[#0A1628]">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-white/70 mb-8">
            Contact our team for pricing and custom configurations
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center px-8 py-4 bg-white text-[#0A1628] font-semibold rounded-full hover:bg-[#F1F5F9] transition-all"
          >
            Request a Quote
            <ArrowRight size={18} className="ml-2" />
          </Link>
        </div>
      </section>
    </div>
  );
}