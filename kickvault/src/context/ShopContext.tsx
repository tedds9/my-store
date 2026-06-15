import { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { STORE_ASSETS as mockStoreAssets } from '@/data/inventory-assets';
import { NAV_CATEGORIES_LINKS as mockNavCategoryLinks, NAV_PRIMARY_LINKS as mockNavPrimaryLinks } from '@/data/navigation-links';
import { BasketSelection } from '@/types/basket-selections'
import { MerchandiseAsset } from '@/types/merchandise-assets'
import { NavigationLink } from '@/navigation-links'

interface ShopContextType {
  readonly merchandisePool: MerchandiseAsset[];
  readonly categoryLinks: NavigationLink[];
  readonly primaryLinks: NavigationLink[];
  readonly basketSelection: BasketSelection[];
  readonly basketState: 'active' | 'idle';
  readonly addToBasket: (assetId: string) => void;
  readonly removeFromBasket: (assetId: string) => void;
  readonly toggleBasket: (forceState?: 'active' | 'idle') => void;


}

const ShopContext = createContext<ShopContextType | null>(null);

export function ShopProvider({ children }: { children: React.ReactNode }) {
  const [basketSelection, setBasketSelection] = useState<BasketSelection[]>(() => {
    const localPocket = localStorage.getItem('kv_basket_cache');
    return localPocket ? JSON.parse(localPocket) : [];
  });

  useEffect(() => {
    localStorage.setItem('kv_basket_cache', JSON.stringify(basketSelection));
  }, [basketSelection]);

  const [basketState, setBasketState] = useState<'active' | 'idle'>('idle');

  const toggleBasket = useCallback((forceState?: 'active' | 'idle') => {
    setBasketState((prev) => forceState ?? (prev === 'active' ? 'idle' : 'active'));
  }, []);

  const removeFromBasket = useCallback((assetId: string) => {
    setBasketSelection((prevSelection) => {
      const activeNode = prevSelection.find((node) => node.id === assetId);
      if (!activeNode) return prevSelection;
      if (activeNode.quantity > 1) {
        return prevSelection.map((node) =>
          node.id === assetId ? { ...node, quantity: node.quantity - 1 } : node
        );
      }
      return prevSelection.filter((node) => node.id !== assetId);
    });
  }, []);



  const addToBasket = useCallback((assetId: string) => {
    setBasketSelection((prevSelection) => {
      const activeNode = prevSelection.find((node) => node.id === assetId);
      if (activeNode) {
        return prevSelection.map((node) =>
          node.id === assetId ?
            { ...node, quantity: node.quantity + 1 } : node
        );
      }
      return [...prevSelection, { id: assetId, quantity: 1 }];
    });
  }, []);

  const contextValue = useMemo(() => ({
    merchandisePool: mockStoreAssets,
    categoryLinks: mockNavCategoryLinks,
    primaryLinks: mockNavPrimaryLinks,
    basketSelection,
    basketState,
    addToBasket,
    removeFromBasket,
    toggleBasket
  }), [basketSelection, basketState, addToBasket, removeFromBasket, toggleBasket]);

  return (
    <ShopContext value={contextValue}>
      {children}
    </ShopContext>
  );
}

export function useShop() {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be wrapped within an explicit <ShopProvider />')
  }
  return context;
} 
