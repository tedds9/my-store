import styles from './product-card.module.css';
import { Link } from 'react-router-dom'

export function ProductCard({ image, name, price }) {

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