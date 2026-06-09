import { useParams } from 'react-router-dom';
import { useShop } from '@/context/ShopContext';

export function ProductDetailPage() {
  const { id } = useParams();
  const { products } = useShop();
  const product = products.find((sneakers)=> sneakers.id === id);
}