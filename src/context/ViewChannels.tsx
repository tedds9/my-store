import { createContext, useContext, useState, useCallback, useMemo, ReactNode } from 'react';

interface ViewChannelsType {
  readonly basketState: 'active' | 'idle';
  readonly toggleBasket: (forceState?: 'active' | 'idle') => void;
}

const ViewChannels = createContext<ViewChannelsType | null>(null);

export function ViewChannelsProvider({ children }: { readonly children: ReactNode }) {
  const [basketState, setBasketState] = useState<'active' | 'idle'>('idle');
  const toggleBasket = useCallback((forceState?: 'active' | 'idle') => {
    if (forceState) {
      setBasketState(forceState);
    } else {
      setBasketState((prev) => (prev === 'active' ? 'idle' : 'active'));
    }
  }, []);

  const contextValue = useMemo(() => ({
    basketState,
    toggleBasket
  }), [basketState, toggleBasket]);

  return (
    <ViewChannels value={contextValue}>
      {children}
    </ViewChannels>
  );
  
}

export function useViewChannels() {
  const  layoutChannelContext = useContext(ViewChannels);

  if (!layoutChannelContext) {
    throw new Error('ViewChannelsContextError: useViewChannels must be within ViewChannelsProvider')
  }

  return layoutChannelContext;
}

