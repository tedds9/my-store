import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import styles from './success-view.module.css';
import { useAnalytics } from "@/hooks/useAnalytics";

interface ReceiptSnapshot {
  readonly orderId?: string;
}

export function SuccessView() {
  const navigate = useNavigate();
  const location = useLocation();
  const { trackPurchase } = useAnalytics();

  const receiptTracker = location.state as ReceiptSnapshot | null;
  const orderId = receiptTracker?.orderId || 'KV-UNKNOWN';

  useEffect(() => {
    if (orderId === 'KV-UNKNOWN') return;

    trackPurchase(orderId);
  }, [orderId, trackPurchase]);

  return (
    <section className={styles.receiptSurface}>
      <h1 className={styles.receiptTitle}>Transaction Secured</h1>
      <p className={styles.receiptMessage}>
        Your premium  allocation is officially confirmed.
      </p>

      <button className={styles.receiptAction} onClick={() => navigate('/')}>
        Return Storefront
      </button>
    </section>
  );
}
