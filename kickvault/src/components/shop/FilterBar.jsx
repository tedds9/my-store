import { useParams } from 'react-router-dom';
import { ProductGrid } from './ProductGrid';
import { useShop } from '../../context/ShopContext'


export function FilterBar() {
  const { type } = useParams();
  const { products } = useShop();
  const pickCategory = products.filter((product) => 
    product.category === type)

  return (
    <section>
      <ProductGrid products={pickCategory} />
    </section>
  )
}