import { notFound } from 'next/navigation';
import { getProductById, getProducts } from '@/utils/api';
import { Product } from '@/data/products';
import ProductDetail from '@/components/features/ProductDetail';

// 定义路由参数接口
interface ProductPageProps {
  params: Promise<{ id: string }>;
}

// Generate static params for static export
export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((product: any) => ({
    id: String(product.id),
  }));
}

export default async function ProductPage({ params }: ProductPageProps) {
  // 正确地await params
  const { id: productId } = await params;
  
  // 从API获取产品数据
  const product = await getProductById(productId) as Product | null;
  
  // 如果找不到产品，返回404
  if (!product) {
    notFound();
  }
  
  return <ProductDetail product={product} />;
} 