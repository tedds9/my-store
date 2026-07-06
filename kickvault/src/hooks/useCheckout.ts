import { useCallback, useTransition } from 'react';
import { useShop } from '@/context/ShopContext';

export function useCheckout() {
  const { setBasketSelection, hydratedItems } = useShop();
  const [checkoutToggle, startTransition] = useTransition();

  const checkoutAction = useCallback(() => {
    if (hydratedItems.length === 0 || checkoutToggle) return;

    startTransition(() => {
      try {
        const publicApiKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
        if (!publicApiKey) throw new Error('VITE_STRIPE_PUBLISHABLE_KEY is missing.');

        const checkoutParams = new URLSearchParams();
        checkoutParams.append('public_key', publicApiKey);

        hydratedItems.forEach((item, index) => {
          checkoutParams.append(`item_${index}_id`, item.assetId);
          checkoutParams.append(`item_${index}_qty`, String(item.quantity));
          checkoutParams.append(`item_${index}_sz`, item.selectedSize);
        });

        checkoutParams.append('cancel_url', 
          window.location.origin + window.location.pathname);
        checkoutParams.append('success_url', `${window.location.origin}/success`);

        const baseSandboxTerminal = 'https://stripe.com';

        setBasketSelection([]);

        window.location.href = 
        `${baseSandboxTerminal}?${checkoutParams.toString()}`;
      } catch (error) {
        console.error('Stripe Redirect Error:', error);
      }
    });
  }, [hydratedItems, checkoutToggle, setBasketSelection]);

  return {
    checkoutToggle,
    checkoutAction
  };
}