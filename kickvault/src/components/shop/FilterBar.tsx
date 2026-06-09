import { useParams } from 'react-router-dom';
import { ProductGrid } from './ProductGrid';
import { useShop } from '@/context/ShopContext'


export function FilterBar() {
  const { type } = useParams();
  const { products } = useShop();
  const normalizedType = type?.toLowerCase();
  const pickCategory =
    normalizedType ?
      products.filter((product) =>
        product.category.toLowerCase() === normalizedType)
      : products;

  return (
    <section>
      <ProductGrid products={pickCategory} />
    </section>
  )
}