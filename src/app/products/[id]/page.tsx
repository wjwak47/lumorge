import { notFound } from 'next/navigation';
import ProductDetail from '@/components/features/ProductDetail';
import { FALLBACK_PRODUCTS } from '@/data/fallbackData';

// 定义路由参数接口
interface ProductPageProps {
  params: Promise<{ id: string }>;
}

// Generate static params for static export
export async function generateStaticParams() {
  return FALLBACK_PRODUCTS.map((product) => ({
    id: String(product.id),
  }));
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id: productId } = await params;

  // 直接从fallback数据获取产品
  const product = FALLBACK_PRODUCTS.find(p => String(p.id) === productId);

  // 如果找不到产品，返回404
  if (!product) {
    notFound();
  }

  return <ProductDetail product={product} />;
}