import { createContext, useContext, useState, useMemo, useCallback } from 'react';
import { products as mockProducts } from '../data/sneakers';
import { NAV_CATEGORIES as mockNAV_CATEGORIES, NAV_MENU_ITEMS as mockNAV_MENU_ITEMS } from '../data/navData.js';

const ShopContext = createContext(null);

export function ShopProvider({ children }) {
  const [cart, setCart] = useState([]);
  const products = useMemo(() => mockProducts, [])
  const NAV_CATEGORIES =
    useMemo(() => mockNAV_CATEGORIES, []);
  const NAV_MENU_ITEMS =
    useMemo(() => mockNAV_MENU_ITEMS, []);


  const addToCart = useCallback((productId) => {
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
    products,
    NAV_CATEGORIES,
    NAV_MENU_ITEMS,
    cart,
    addToCart
  }), [products, NAV_CATEGORIES, NAV_MENU_ITEMS, cart, addToCart])

  return (
    <ShopContext.Provider
      value={contextValue}>
      {children}
    </ShopContext.Provider>
  );
}

export function useShop() {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be wrapped within an explicit <ShopProvider />')
  }
  return context;
} 