import { Link } from 'react-router-dom';
import { Product } from '@/types/product';
import styles from './product-card.module.css';

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { image, name, price } = product;
  
  return (
    <article className={styles.productCard}>
      <div className={styles.mediaWrapper}>
          <img alt={`Sneaker model: ${name}`} 
          className={styles.image} 
          src={image} />
      </div>
      <div className={styles.content}>
          <h3 className={styles.title}>{name}</h3>
          <p className={styles.price} >${price}</p>              
      </div>
      <Link  to="/" className={styles.overlayLink} aria-label={`View details for ${name}`} />
    </article>

  )

}