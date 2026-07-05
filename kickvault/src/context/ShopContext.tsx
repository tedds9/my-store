import { createContext, useContext, useState, useMemo, useCallback } from 'react';
import { STORE_ASSETS as mockStoreAssets } from '@/data/inventory-assets';
import { NAV_CATEGORIES_LINKS as mockNavCategoryLinks, NAV_PRIMARY_LINKS as mockNavPrimaryLinks } from '@/data/navigation-links';
import { BasketSelection, CartLineItem } from '@/types/basket-selections';
import { MerchandiseAsset } from '@/types/merchandise-assets';
import { NavigationLink } from '@/navigation-links';
import { useSync } from '@/hooks/useSync';
import type { Dispatch, SetStateAction, ReactNode } from 'react';

interface ShopContextType {
  readonly merchandisePool: readonly MerchandiseAsset[];
  readonly categoryLinks: readonly NavigationLink[];
  readonly primaryLinks: readonly NavigationLink[];
  readonly basketSelection: readonly BasketSelection[];
  readonly setBasketSelection: Dispatch<SetStateAction<BasketSelection[]>>;
  readonly hydratedItems: readonly CartLineItem[];
  readonly basketState: 'active' | 'idle';
  readonly addToBasket: (assetId: string, selectedSize: string) => void;
  readonly removeFromBasket: (assetId: string, selectedSize: string) => void;
  readonly toggleBasket: (forceState?: 'active' | 'idle') => void;
  readonly favorite: readonly string[];
  readonly toggleFavorite: (assetId: string) => void;

}

const ShopContext = createContext<ShopContextType | null>(null);

export function ShopProvider({ children }: { children: React.ReactNode }) {
  const [basketSelection, setBasketSelection] = useState<BasketSelection[]>(() => {
    const localPocket = localStorage.getItem('kv_basket_cache');
    return localPocket ? JSON.parse(localPocket) : [];
  });

  const [favorite, setFavorite] = useState<string[]>(() => {
    const localPocket = localStorage.getItem('kv_favorites_cache');
    return localPocket ? JSON.parse(localPocket) : [];
  });

  useSync('kv_basket_cache', basketSelection, setBasketSelection);
  useSync('kv_favorites_cache', favorite, setFavorite);

  const [basketState, setBasketState] = useState<'active' | 'idle'>('idle');

  const toggleBasket = useCallback((forceState?: 'active' | 'idle') => {
    setBasketState((prev) => forceState ?? (prev === 'active' ? 'idle' : 'active'));
  }, []);

  const removeFromBasket = useCallback((assetId: string, selectedSize: string) => {
    setBasketSelection((prev) => {
      const targetId = `${assetId}::${selectedSize}`;
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
      const targetId = `${assetId}::${selectedSize}`;
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

  const toggleFavorite = useCallback((assetId: string) => {
    setFavorite((prev) => 
      prev.includes(assetId) ? prev.filter((id) => id !== assetId) : [...prev, assetId]
    )
  }, []);

  const hydratedItems = basketSelection.map((selection) => {
      const asset = mockStoreAssets.find((item) => item.id === selection.assetId);
      if (!asset) return null;
      return {
        id: selection.id,
        assetId: asset.id,
        name: asset.name,
        brand: asset.brand,
        price: asset.price,
        image: asset.image,
        category: asset.category,
        selectedSize: selection.selectedSize,
        quantity: selection.quantity
      };
    }).filter((item): item is CartLineItem => item !== null);

  const contextValue = useMemo(() => ({
    merchandisePool: mockStoreAssets,
    categoryLinks: mockNavCategoryLinks,
    primaryLinks: mockNavPrimaryLinks,
    basketSelection,
    setBasketSelection,
    hydratedItems,
    basketState,
    addToBasket,
    removeFromBasket,
    favorite,
    toggleFavorite,
    toggleBasket
  }), [basketSelection, basketState, addToBasket, removeFromBasket, favorite, toggleFavorite, toggleBasket]);

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
