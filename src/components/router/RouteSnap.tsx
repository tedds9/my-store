import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useViewChannels } from '@/context/ViewChannels';

export function RouteSnap() {
  const { pathname } = useLocation();
  const { toggleBasket } = useViewChannels();

  useEffect(() => {
    window.scrollTo(0, 0);
    toggleBasket('idle')
  }, [pathname]);

  return null;
}