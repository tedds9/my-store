import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useShop } from '@/context/ShopContext';

export function RouteSnap() {
  const { pathname } = useLocation();
  const { toggleBasket } = useShop();

  useEffect(() => {
    window.scrollTo(0, 0);
    toggleBasket('idle')
  }, [pathname]);

  return null;
}