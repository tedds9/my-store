import { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { STORE_ASSETS as mockStoreAssets } from '@/data/inventory-assets';
import { NAV_CATEGORIES_LINKS as mockNavCategoryLinks, NAV_PRIMARY_LINKS as mockNavPrimaryLinks } from '@/data/navigation-links';
import { BasketSelection, CartLineItem } from '@/types/basket-selections'
import { MerchandiseAsset } from '@/types/merchandise-assets'
import { NavigationLink } from '@/navigation-links'

interface ShopContextType {
  readonly merchandisePool: readonly MerchandiseAsset[];
  readonly categoryLinks: readonly NavigationLink[];
  readonly primaryLinks: readonly NavigationLink[];
  readonly basketSelection: readonly BasketSelection[];
  readonly hydratedItems: readonly CartLineItem[];
  readonly basketState: 'active' | 'idle';
  readonly checkoutProcessing: boolean;
  readonly initiateCheckout: () => Promise<void>;
  readonly addToBasket: (assetId: string, selectedSize: string) => void;
  readonly removeFromBasket: (assetId: string, selectedSize: string) => void;
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

  const [checkoutProcessing, setCheckoutProcessing] = useState<boolean>(false);

  const toggleBasket = useCallback((forceState?: 'active' | 'idle') => {
    setBasketState((prev) => forceState ?? (prev === 'active' ? 'idle' : 'active'));
  }, []);

  const removeFromBasket = useCallback((assetId: string, selectedSize: string) => {
    setBasketSelection((prev) => {
      const targetId = `${assetId}_${selectedSize}`;
      const activeNode = prev.find((node) => node.id === targetId);
      if (!activeNode) return prev;
      if (activeNode.quantity > 1) {
        return prev.map((node) =>
          node.id === targetId ? { ...node, quantity: node.quantity - 1 } : node
        );
      }
      return prev.filter((node) => node.id !== targetId);
    });
  }, []);

  const addToBasket = useCallback((assetId: string, selectedSize: string) => {
    setBasketSelection((prev) => {
      const targetId = `${assetId}_${selectedSize}`;
      const activeNode = prev.find((node) => node.id === targetId);
      if (activeNode) {
        return prev.map((node) =>
          node.id === targetId ?
            { ...node, quantity: node.quantity + 1 } : node
        );
      }
      return [...prev, { id: targetId, assetId, selectedSize, quantity: 1 }];
    });
  }, []);

  const hydratedItems = useMemo<readonly CartLineItem[]>(() => {
    return basketSelection.map((selection) => {
      const asset = mockStoreAssets.find((item) => item.id === selection.assetId);
      if (!asset) throw new Error(`Catalog structural break: ID ${selection.assetId} invalid`);
      return {
        id: asset.id,
        name: asset.name,
        brand: asset.brand,
        price: asset.price,
        image: asset.image,
        category: asset.category,
        isFavorite: asset.isFavorite,
        selectedSize: selection.selectedSize,
        quantity: selection.quantity
      };
    })
  }, [basketSelection]);

  const initiateCheckout = useCallback(async () => {
    if (basketSelection.length === 0) return;

    setCheckoutProcessing(true);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    setBasketSelection([]);
    setCheckoutProcessing(false);
    setBasketState('idle');

    window.location.href = '/success';
  }, [basketSelection, setBasketState]);

  const contextValue = useMemo(() => ({
    merchandisePool: mockStoreAssets,
    categoryLinks: mockNavCategoryLinks,
    primaryLinks: mockNavPrimaryLinks,
    basketSelection,
    hydratedItems,
    basketState,
    checkoutProcessing,
    initiateCheckout,
    addToBasket,
    removeFromBasket,
    toggleBasket
  }), [basketSelection, hydratedItems, basketState, checkoutProcessing, initiateCheckout,
    addToBasket, removeFromBasket, toggleBasket]);

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
