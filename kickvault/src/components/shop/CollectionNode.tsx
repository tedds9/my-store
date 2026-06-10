import { Link } from 'react-router-dom';
import { MerchandiseAsset } from '@/types/merchandise-assets';
import styles from './collection-node.module.css';

interface CollectionNodeProps {
  displayAsset: MerchandiseAsset
}

export function CollectionNode({ displayAsset }: CollectionNodeProps) {
  const { id, image, name, price } = displayAsset;
  
  return (
    <article className={styles.showcaseShell}>
      <div className={styles.mediaViewer}>
          <img alt={`Sneaker model: ${name}`} 
          className={styles.showcaseImage} 
          src={image}
          loading="lazy" />
      </div>
      <div className={styles.labelGroup}>
          <h3 className={styles.assetHeading}>{name}</h3>
          <p className={styles.priceTag} >${price}</p>              
      </div>
      <Link  to={`/products/${id}`} className={styles.navigationOverlay} aria-label={`View details for ${name}`} />
    </article>

  )

}