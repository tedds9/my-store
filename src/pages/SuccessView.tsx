import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useId, JSX } from "react";
import { useAnalytics } from "@/hooks/useAnalytics";
import { ReceiptSnapshot, TelemetryNode } from "@/types/basket-selections";
import { useShop } from '@/context/ShopContext';
import styles from './success-view.module.css';

const EMPTY_SNAPSHOT: readonly TelemetryNode[] = [];


export function SuccessView(): JSX.Element {
  const navigate = useNavigate();
  const titleId = useId();
  const location = useLocation();
  const { trackPurchase } = useAnalytics();
  const { merchandisePool } = useShop();

  const receiptTracker = location.state as ReceiptSnapshot | null;
  const orderId = receiptTracker?.receiptId ?? 'KV-UNKNOWN';
  const itemSnapshot = receiptTracker?.snapshot ?? EMPTY_SNAPSHOT;

  const detailedItems = itemSnapshot.map((snapshotNode) => {
    const [assetId, selectedSize] = snapshotNode.sku.split('::');
    const matchedAsset = merchandisePool.find((product) => product.id === assetId);

    return {
      sku: snapshotNode.sku,
      title: matchedAsset?.name ?? 'Premium Allocation',
      size: selectedSize ?? 'OS',
      quantity: snapshotNode.count
    };
  });

  useEffect(() => {
    if (orderId === 'KV-UNKNOWN') return;

    trackPurchase(orderId, itemSnapshot);
  }, [orderId, trackPurchase, itemSnapshot]);

  const handleReturn = (): void => {
    navigate('/', { replace: true });
  };

  return (
    <main className={styles.receiptSurface} aria-labelledby={titleId}>
      <header className={styles.receiptBanner}>
        <h1 id={titleId} className={styles.receiptHero}>Transaction Secured</h1>
        <p className={styles.receiptMessage}>
          Your premium  allocation is officially confirmed.
        </p>
        <p className={styles.receiptMessage}>
          Estimated Dispatch: 24-48 Hours. A tracking link has been routed to your registered email node.
        </p>
      </header>

      {detailedItems.map((item) => (
        <article key={item.sku} className={styles.itemRow}>
          <div className={styles.itemIdentity}>
            <span className={styles.itemHero}>Allocation Node: {item.title}</span>
            <span className={styles.itemVoucher}>Size: {item.size}</span>
          </div>
          <span className={styles.itemCounter}>Qty: {item.quantity}</span>
        </article>
      ))}

      {orderId !== 'KV-UNKNOWN' && (
        <section className={styles.voucherTracker}>
          <span className={styles.voucherAnchor}>Voucher Node:</span>
          <span className={styles.voucherBadge}>{orderId}</span>
        </section>
      )}

      <button type="button" className={styles.receiptAction}
        onClick={handleReturn}>
        Return Storefront
      </button>
    </main>
  );
}
