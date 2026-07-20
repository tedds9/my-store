import { useState, useEffect } from 'react';
import { MerchandiseAsset } from '@/types/merchandise-assets';

export function useCollection() {
  const [ merchandisePool, setMerchandisePool] = 
  useState<readonly MerchandiseAsset[]>([]);

  useEffect(() => {
    const fetchCatalog = async () => {
      try {
        const response = await fetch('/api/products');
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