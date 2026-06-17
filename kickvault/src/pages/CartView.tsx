import { useShop } from '@/context/ShopContext';
import styles from './cart-view.module.css';

export function CartView() {
  const { basketSelection, merchandisePool, addToBasket, removeFromBasket } = useShop();


  return (
    <div className={styles.bagShell} >
      <h1 className={styles.bagHeading}>Your Bag</h1>
      <div className={styles.bagMatrix}>
        {basketSelection.map((selectionNode) => {
          const [baseId, itemSize] = selectionNode.id.split('_');
          const productAsset = merchandisePool.find((asset) => asset.id === baseId);
          console.log(selectionNode);
          if (!productAsset) return null;

          return (
            <div key={selectionNode.id} className={styles.assetRow} >
              <div className={styles.assetToggle}>
                <button type="button" onClick={() => removeFromBasket(selectionNode.id)}
                  className={styles.toggleDecrement}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    strokeWidth="2" className={styles.toggleVector}>
                    <path d="M5 12h14" />
                  </svg>
                </button>
                <span className={styles.toggleDisplay}>{selectionNode.quantity}</span>
                <button type="button" onClick={() => addToBasket(selectionNode.id)}
                  className={styles.toggleIncrement}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    strokeWidth="2" className={styles.toggleVector}>
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </button>
              </div>
              <div className={styles.assetVisual}>
                <img src={productAsset.image} alt={productAsset.name} loading="lazy"
                  decoding="async" className={styles.visualGraphic} />
              </div>
              <div className={styles.assetMeta} >
                <h3 className={styles.metaTitle}>{productAsset.name}</h3>
                {itemSize ? ( <p className={styles.metaSize}>Size: {itemSize}</p>
                ) : null }
                <p className={styles.metaPrice}>
                  ${productAsset.price * selectionNode.quantity}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  )

}
