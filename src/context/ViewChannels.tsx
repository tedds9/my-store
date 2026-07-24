import { createContext, useContext, useState, useCallback, useMemo, ReactNode } from 'react';

interface ViewChannelsType {
  readonly drawerState: 'active' | 'idle';
  readonly toggleBasket: (forceState?: 'active' | 'idle') => void;
}

const ViewChannels = createContext<ViewChannelsType | null>(null);

export function ViewChannelsProvider({ children }: { readonly children: ReactNode }) {
  const [drawerState, setDrawerState] = useState<'active' | 'idle'>('idle');
  const toggleBasket = useCallback((forceState?: 'active' | 'idle') => {
    if (forceState) {
      setDrawerState(forceState);
    } else {
      setDrawerState((prev) => (prev === 'active' ? 'idle' : 'active'));
    }
  }, []);

  const contextValue = useMemo(() => ({
    drawerState,
    toggleBasket
  }), [drawerState, toggleBasket]);

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

