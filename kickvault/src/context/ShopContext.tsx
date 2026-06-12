import { createContext, useContext, useState, useMemo, useCallback } from 'react';
import { STORE_ASSETS as mockStoreAssets } from '@/data/inventory-assets';
import { NAV_CATEGORIES_LINKS as mockNavCategoryLinks, NAV_PRIMARY_LINKS as mockNavPrimaryLinks } from '@/data/navigation-links';
import { BasketSelection } from '@/types/basket-selections'
import { MerchandiseAsset } from '@/types/merchandise-assets'
import { NavigationLink } from '@/types/navigation-links'

interface ShopContextType {
  merchandisePool: MerchandiseAsset[];
  categoryLinks: NavigationLink[];
  primaryLinks: NavigationLink[];
  basketSelection: BasketSelection[];
  addToBasket: (assetId: string) => void;
}

const ShopContext = createContext<ShopContextType | null >(null);

export function ShopProvider({ children }: { children: React.ReactNode }) {
  const [basketSelection, setBasketSelection] = useState<BasketSelection[]>([]);

  const addToBasket = useCallback((assetId: string) => {
    setBasketSelection((prevSelection) => {
      const activeNode = prevSelection.find((node)=> node.id === assetId);
      if (activeNode) {
        return prevSelection.map((node)=> 
          node.id === assetId ? 
        {...node, quantity: node.quantity + 1} : node
        );
      }
      return [...prevSelection,{ id: assetId, quantity: 1}];
    });
  },[]);

  const contextValue = useMemo(()=> ({
    merchandisePool: mockStoreAssets,
    categoryLinks : mockNavCategoryLinks,
    primaryLinks : mockNavPrimaryLinks,
    basketSelection,
    addToBasket
  }), [basketSelection, addToBasket])

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
