import { ProductCard } from './ProductCard';
import styles from './product-grid.module.css'

export function ProductGrid({ products }) {

  return (
    <div className={styles.cardContainerGrid}>
      {products.map(({ id, image, name, price }) => (
            <ProductCard key={id} image={image} name={name} price={price}  ></ProductCard>
        ))}
    </div>

  )

}