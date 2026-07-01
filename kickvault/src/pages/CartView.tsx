import { useShop } from '@/context/ShopContext';
import { CartItem } from '@/components/shop/CartItem';
import { useCheckout } from '@/hooks/useCheckout';
import styles from './cart-view.module.css';

export function CartView() {
  const { hydratedItems, addToBasket, removeFromBasket } = useShop();
  
  const { isProcessing: checkoutProcessing, 
    executePayment: initiateCheckout } = useCheckout();

  if (hydratedItems.length === 0) {
    return (
      <main className={styles.bagShell}>
        <h1 className={styles.bagHeading}>Your Bag</h1>
        <p className={styles.emptyNotice}>Your bag is currently empty</p>
      </main>
    )
  }

  return (
    <div className={styles.bagShell} >
      <h1 className={styles.bagHeading}>Your Bag</h1>

      <main className={styles.bagMatrix}>
        <section className={styles.itemTrack}>
        {hydratedItems.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            onIncrement={addToBasket}
            onDecrement={removeFromBasket}
            onRemove={removeFromBasket}
          />
        ))}
        </section>
        <aside className={styles.summaryPanel}>
          <h2 className={styles.summaryHeading}>Order Summary</h2>
          <button 
          type="button"
          onClick={initiateCheckout}
          disabled={checkoutProcessing}
          className={styles.checkoutAction}>
            {checkoutProcessing ? 'Processing...' : 'Secure Checkout'}
          </button>
        </aside>
      </main>
    </div>
  );

}
