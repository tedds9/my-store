import { useShop } from '@/context/ShopContext';
import { CartItem } from '@/components/shop/CartItem';
import { useCheckout } from '@/hooks/useCheckout';
import styles from './cart-view.module.css';

export function CartView() {
  const { hydratedItems, addToBasket, removeFromBasket } = useShop();

  const totalCartCost = hydratedItems.reduce((accumulator, item) => {
    return accumulator + (item.price * item.quantity);
  }, 0);
  
  const { checkoutToggle: checkoutProcessing, 
    checkoutAction: initiateCheckout } = useCheckout();

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

          <div className={styles.priceRow}>
            <span className={styles.priceLabel}>Subtotal</span>
            <span className={styles.priceValue}>${totalCartCost.toFixed(2)}</span>
          </div>
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
