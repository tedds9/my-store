import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useShop } from '@/context/ShopContext';

export function useCheckout() {
  const navigate = useNavigate();
  const { basketSelection, setBasketSelection } = useShop();
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const executePayment = useCallback(async () => {
    if (basketSelection.length === 0 || isProcessing) return;

    setIsProcessing(true);

    const rawUuid = crypto.randomUUID();
    const cleanSegment = rawUuid.split('-')[0].toUpperCase();
    const orderId = `KV-${cleanSegment}`;

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const trackingSnapshot = basketSelection.map((node) => ({
        sku: node.id,
        count: node.quantity,
      }));

      setBasketSelection([]);

      navigate('/success', {
        state: {
          receiptId: orderId,
          snapshot: trackingSnapshot,
        },
        replace: true,
      });
    } catch (error) {
      console.error('Payment failure:', error);
    } finally {
      setIsProcessing(false);
    }
  }, [isProcessing, navigate, setBasketSelection, basketSelection.length]);

  return {
    isProcessing,
    executePayment
  };
}