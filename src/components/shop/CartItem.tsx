import { CartLineItem} from '@/types/basket-selections'
import styles from './cart-item.module.css';

interface CartItemProps {
  readonly item: CartLineItem;
  readonly onIncrement: (assetId: string, selectedSize: string) => void;
  readonly onDecrement: (assetId: string, selectedSize: string) => void;
  readonly onRemove: (assetId: string, selectedSize: string, purge: boolean) => void;
}

export function CartItem({ item, onIncrement, onDecrement, onRemove}: CartItemProps) {
  return (
    <article className={styles.rowLayout}>
      <img src={item.image} alt={item.name} className={styles.productGraphic} loading="lazy" 
      style={{width: 'var(--space-2xl)', height: 'var(--space-2xl)' }} />

      <div className={styles.productText}>
        <h3 className={styles.productHeading}>{item.name}</h3>
        <p className={styles.variantLabel}>Size: {item.selectedSize}</p>
      </div>

      <div className={styles.actionTriggers}>
        <div className={styles.quantityCounter}>
          <button 
          type="button"
          onClick={() => onDecrement(item.assetId, item.selectedSize)} 
          className={styles.counterTrigger} 
          aria-label="Decrease quantity">-</button>
          <span className={styles.counterDisplay}>{item.quantity}</span>
          <button 
          type="button"
          onClick={() => onIncrement(item.assetId, item.selectedSize)} 
          className={styles.counterTrigger}
          aria-label="Increase quantity">+</button>
        </div>
        <button 
        onClick={() => onRemove(item.assetId, item.selectedSize, true)} 
        className={styles.removeTrigger}>Remove</button>
      </div>
      <span className={styles.priceLabel}>${(item.price * item.quantity).toFixed(2)}</span>
    </article>
  )
}