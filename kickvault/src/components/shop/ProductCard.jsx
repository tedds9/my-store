import styles from './product-card.module.css';
import { Link } from 'react-router-dom'

export function ProductCard({ image, name, price }) {

  return (
    <article className={styles.productCard}>
      <div className={styles.mediaWrapper}>
        <Link to="/" className={styles.imageLink}>
          <img alt="product sneaker" 
          className={styles.image} 
          src={image} >
          </img>
        </Link>
      </div>
      <div className={styles.content}>
        <Link  to="/">
          <h3 className={styles.title}>{name}</h3>
        </Link>
        <Link  to="/">
          <p className={styles.price} >${price}</p>
        </Link>
      </div>
    </article>

  )

}