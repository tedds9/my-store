import { useCallback, useTransition } from 'react';
import { useShop } from '@/context/ShopContext';

export function useCheckout() {
  const [checkoutToggle, startTransition] = useTransition();
  const { setBasketSelection, hydratedItems } = useShop();

  const checkoutAction = useCallback(() => {
    if (hydratedItems.length === 0 || checkoutToggle) return;

    startTransition(async () => {
      try {
        const response = await fetch('http://localhost:4000/api/checkout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ items: hydratedItems })
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.error || 'Failed to initialize session');
        setBasketSelection([]);
        window.location.href = data.checkoutUrl;
      } catch (error) {
        console.error('Stripe Server Connection Error:', error);
      }
    });
  }, [hydratedItems, checkoutToggle, setBasketSelection]);

  return {
    checkoutToggle,
    checkoutAction
  };
}