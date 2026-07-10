import { Link } from 'react-router-dom';
import { useShop } from '@/context/ShopContext';
import { CollectionShowcase } from '@/components/shop/CollectionShowcase';
import styles from './favorites-view.module.css';

export function FavoritesView() {
  const { merchandisePool, favorite } = useShop();

  const savedAssets = merchandisePool.filter((asset) => favorite.includes(asset.id));

  return (
    <div className={styles.favoritesContext}>
      <header className={styles.editorialGroup}>
        <h1 className={styles.mainHeading}>Saved Favorites</h1>
      </header>
      {savedAssets.length === 0 ? (
        <section className={styles.noticePanel}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"
          className={styles.noticeIcon} aria-hidden="true">
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
          </svg>
          <p className={styles.noticeMessage}>Your saved list is empty.</p>
          <Link to ="/products" className={styles.noticeAction}>
          Continue Shopping</Link>

          <div className={styles.noticeCluster}>
            <Link to="/category/luxury-sneakers" className={styles.noticeLink}>
            New Arrivals
            </Link>
            <Link to="/products" className={styles.noticeLink}>
            Best Sellers
            </Link>
          </div>
        </section>
      ) : (
        <CollectionShowcase inventorySelection={savedAssets} />
      )}
    </div>
  );
}