import { Link } from 'react-router-dom';
import { MerchandiseAsset } from '@/types/merchandise-assets';
import styles from './collection-node.module.css';

interface CollectionNodeProps {
  displayAsset: MerchandiseAsset
}

export function CollectionNode({ displayAsset }: CollectionNodeProps) {
  const { id, image, name, price } = displayAsset;

  return (
    <div className ={styles.nodeFrame} >
    <article className={styles.nodeAnchor}>
      <Link to={`/products/${id}`} className={styles.nodeTrigger}
       aria-label={`View details for ${name}`} >
        <div className={styles.nodeStage}>
          <img alt={`Sneaker model: ${name}`}
            className={styles.nodeAsset}
            src={image}
            loading="lazy" />
        </div>
        <div className={styles.nodeDeck}>
          <h3 className={styles.nodeHeading}>{name}</h3>
          <p className={styles.nodeValue} >${price}</p>
        </div>
      </Link>
    </article>
    </div>
  )

}