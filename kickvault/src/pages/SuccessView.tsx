import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useId, JSX } from "react";
import { useAnalytics } from "@/hooks/useAnalytics";
import { ReceiptSnapshot } from "@/types/basket-selections";
import styles from './success-view.module.css';


export function SuccessView(): JSX.Element {
  const navigate = useNavigate();
  const titleId = useId();
  const location = useLocation();
  const { trackPurchase } = useAnalytics();

  const receiptTracker = location.state as ReceiptSnapshot | null;
  const orderId = receiptTracker?.receiptId ?? 'KV-UNKNOWN';
  const itemSnapshot = receiptTracker?.snapshot ?? [];

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
      </header>

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
