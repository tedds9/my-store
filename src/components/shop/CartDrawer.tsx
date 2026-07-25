import { useShop } from '@/context/ShopContext';
import styles from './cart-drawer.module.css';
import { useCheckout } from '@/hooks/useCheckout';
import { useViewChannels } from '@/context/ViewChannels';

export function CartDrawer() {

  const { basketSelection, merchandisePool, addToBasket, removeFromBasket } = useShop();
  const { basketState, toggleBasket } = useViewChannels()
    const { checkoutToggle: checkoutProcessing, 
      checkoutAction: initiateCheckout } = useCheckout();

    const drawerSubtotal = basketSelection.reduce((total, node) => {
      const asset = merchandisePool.find(item => item.id === node.assetId);
      return total + (asset ? asset.price * node.quantity : 0);
    }, 0)

  return (
    <div className={styles.basketContext}
      data-state={basketState}
    >
      <div className={styles.drawerBackdrop}
        onClick={() => toggleBasket('idle')} />
      <aside className={styles.basketPanel} role="dialog" data-state={basketState} >
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
            const productAsset = merchandisePool.find((asset) => asset.id === selectionNode.assetId);
            if (!productAsset) return null;
            return (
              <div key={selectionNode.id} className={styles.basketFrame} >
                <div className={styles.quantityControl}>
                  <button type="button" className={styles.adjustAction}
                    onClick={() => removeFromBasket(selectionNode.assetId, selectionNode.selectedSize)} aria-label="Decrease quantity" >
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
                    onClick={() => addToBasket(selectionNode.assetId, selectionNode.selectedSize)}
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
                  {selectionNode.selectedSize ? (
                    <p className={styles.sizeIndicator}>
                      Size: {selectionNode.selectedSize}
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
            <div className={styles.bagSummary}>
        <div className={styles.priceRow}>
          <span className={styles.priceMarker}>Subtotal</span>
          <span className={styles.priceValue} >${drawerSubtotal.toLocaleString()}</span>
        </div>
        <button type="button" onClick={initiateCheckout} 
        disabled={checkoutProcessing || basketSelection.length === 0}
        className={styles.checkoutTrigger}>
          {checkoutProcessing ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"
            className={styles.triggerSpinner}>
              <circle cx="12" cy="12" r="10" strokeDasharray="32" strokeLinecap="round" />
        
            </svg>
          ) : (
            'Secure Checkout'
          )}
        </button>
      </div>
      </aside >
  
    </div >
  );

}