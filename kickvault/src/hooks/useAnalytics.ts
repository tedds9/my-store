import { useCallback } from 'react';
import { useShop } from '@/context/ShopContext';

export function useAnalytics() {

  const { hydratedItems } = useShop();

  const trackPurchase = useCallback((orderId: string) => {
    if (hydratedItems.length === 0) return;

    const financialValue = hydratedItems.reduce(
      (total, item) => total + item.price * item.quantity, 0
    );

    const purchasePayload = {
      event: 'purchase',
      transactionId: orderId,
      value: financialValue,
      currency: 'USD',
      items: hydratedItems.map((item) => ({
        id: item.assetId,
        name: item.name,
        brand: item.brand || 'KickVault',
        price: item.price,
        quantity: item.quantity,
        category: item.category || 'all',
        size: item.selectedSize || null
      }))
    };

    console.group(`📊 [Analytics Engine] Meta/TikTok Event: Purchase Verified`);
    console.log(`Order Reference:`, orderId);
    console.log(`Financial Total: $${financialValue}`);
    console.log(`Payload Contract Structure:`, purchasePayload);
    console.groupEnd();

  }, [hydratedItems]);

  return { trackPurchase };
}