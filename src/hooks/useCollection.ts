import { useState, useEffect } from 'react';
import { MerchandiseAsset } from '@/types/merchandise-assets';

export function useCollection() {
  const [ merchandisePool, setMerchandisePool] = 
  useState<readonly MerchandiseAsset[]>([]);

  useEffect(() => {
    const fetchCatalog = async () => {
      try {


  // NOTE: If customers inside TikTok are seeing empty product pools, 
  // check this BASE_URL. PROD means live web, localhost means my laptop.
        const BASE_URL = import.meta.env.PROD ? 'https://my-store-eiys.onrender.com'
        : 'http://localhost:4000';

        const response = await fetch(`${BASE_URL}/api/products`);
        if (!response.ok) throw new Error('Network asset asynchronization failed');
        const data = await response.json();
        setMerchandisePool(data);
      } catch (error) {
        console.log('Database connection tunnel error:', error);
      }
    };
    fetchCatalog();
  }, []);

  return { merchandisePool };
}