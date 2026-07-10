import { useEffect, useRef, useCallback } from 'react';

export function useTimeout(onTrigger: () => void, delayMs = 2500) {
  const pointerCell = useRef<ReturnType<typeof setTimeout> | null>(null);

  const startClock = useCallback(() => {

    if (pointerCell.current) clearTimeout(pointerCell.current);

    pointerCell.current = setTimeout(()=> {
      onTrigger();
    }, delayMs);
  }, [onTrigger, delayMs]);

  useEffect(() => {
    return () => {
      if (pointerCell.current) clearTimeout(pointerCell.current);
    };
  }, []);

  return startClock;
}