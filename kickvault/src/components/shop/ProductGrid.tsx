import { ProductCard } from './ProductCard';
import { Product } from '@/types/product';
import styles from './product-grid.module.css';

interface ProductGridProps {
  products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {

  return (
    <div className={styles.cardContainerGrid}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>

  )

}