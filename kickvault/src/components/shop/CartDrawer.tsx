import { useShop } from '@/context/ShopContext';
import styles from './cart-drawer.module.css';

export function CartDrawer() {

  const { basketSelection, merchandisePool, addToBasket, removeFromBasket,
    basketState, toggleBasket } = useShop();

  return (
    <div className={styles.basketContext}
      data-state={basketState}
    >
      <div className={styles.drawerBackdrop}
        onClick={() => toggleBasket('idle')} />
      <aside className={styles.basketPanel} >
        <header className={styles.panelHeader} >
          <h2 className={styles.panelTitle} >Your Bag</h2>
          <button type="button" className={styles.closeAction}
            onClick={() => toggleBasket('idle')} aria-label="Close bag" >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="2" >
              <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round"
                strokeLinejoin="round" />
            </svg>
          </button>
        </header>
        <div className={styles.basketMatrix} >
          {basketSelection.map((selectionNode) => {

            const [baseId, itemSize] = selectionNode.id.split('_');

            const productAsset =
              merchandisePool.find((asset) => asset.id === baseId);

            if (!productAsset) return null;
            return (
              <div key={selectionNode.id} className={styles.basketFrame} >
                <div className={styles.quantityControl}>
                  <button type="button" className={styles.adjustAction}
                    onClick={() => removeFromBasket(selectionNode.id)} aria-label="Decrease quantity" >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                      strokeWidth="2" >
                      <path d="M5 12h14" strokeLinecap="round"
                        strokeLinejoin="round" />
                    </svg>
                  </button>
                  <span className={styles.countIndicator} >
                    {selectionNode.quantity}
                  </span>
                  <button type="button" className={styles.adjustAction}
                    onClick={() => addToBasket(selectionNode.id)}
                    aria-label="Increase quantity" >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                      strokeWidth="2" >
                      <path d="M12 5v14M5 12h14" strokeLinecap="round"
                        strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>
                <div className={styles.visualFrame}>
                  <img
                    src={productAsset.image}
                    alt={productAsset.name}
                    loading="lazy"
                    decoding="async"
                    className={styles.nodeGraphic}
                  />
                </div>
                <div className={styles.metaCluster} >
                  <h3 className={styles.nodeTitle} >{productAsset.name}</h3>
                  {itemSize ? (
                    <p className={styles.sizeIndicator}>
                      Size: {itemSize}
                    </p>
                  ) : null}

                  <p className={styles.priceIndicator} >
                    ${productAsset.price * selectionNode.quantity}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </aside >

    </div >
  );

}