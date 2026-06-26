import { useEffect } from 'react';

export function useSync<T>(key: string, stateValue: T,  
  updateState: (newValue: T) => void ): void 
{
  useEffect(() => {
  localStorage.setItem(key, JSON.stringify(stateValue)); 

}, [key, stateValue]);

useEffect(() => {
 const handleStorage = (e: StorageEvent) => {
  if (e.key !== key || !e.newValue) return;
  try {
    const parsed = JSON.parse(e.newValue) as T;
    updateState(parsed);
  } catch {
    console.error(`Storage corruption detected on key: ${key}`);
  }

 };
 window.addEventListener('storage', handleStorage);
 return () => window.removeEventListener('storage', handleStorage);
}, [key, updateState]);
}