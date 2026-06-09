import { createContext, useContext, useState, useMemo, useCallback } from 'react';
import { products as mockProducts } from '@/data/sneakers';
import { NAV_CATEGORIES as mockNAV_CATEGORIES, NAV_MENU_ITEMS as mockNAV_MENU_ITEMS } from '@/data/navData';
import { CartItem } from '@/types/cart'
import { Product } from '@/types/product'
import { NavItem } from '@/types/navigation'



interface ShopContextType {
  products: Product[];
  NAV_CATEGORIES: NavItem[];
  NAV_MENU_ITEMS: NavItem[];
  cart: CartItem[];
  addToCart: (productId: string) => void;
}

const ShopContext = createContext<ShopContextType | null >(null);

export function ShopProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = useCallback((productId: string) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item)=> 
        item.id === productId);
      if (existingItem) {
        return prevCart.map((item)=> 
          item.id === productId ? 
        {...item, quantity: item.quantity + 1} : item
        );
      }
      return [...prevCart,{ id: productId, quantity: 1}];
    });
  },[]);

  const contextValue = useMemo(()=> ({
    products: mockProducts,
    NAV_CATEGORIES : mockNAV_CATEGORIES,
    NAV_MENU_ITEMS : mockNAV_MENU_ITEMS,
    cart,
    addToCart
  }), [cart, addToCart])

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