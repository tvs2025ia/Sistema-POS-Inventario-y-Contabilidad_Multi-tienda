import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Store } from '../types';

interface StoreContextType {
  stores: Store[];
  currentStore: Store | null;
  setCurrentStore: (store: Store) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function useStore() {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}

// Mock stores for demo
const mockStores: Store[] = [
  {
    id: '1',
    name: 'Tienda Principal',
    address: 'Calle 123, Ciudad',
    phone: '+57 300 123 4567',
    email: 'principal@tienda.com',
    isActive: true
  },
  {
    id: '2',
    name: 'Sucursal Norte',
    address: 'Av. Norte 456, Ciudad',
    phone: '+57 300 123 4568',
    email: 'norte@tienda.com',
    isActive: true
  },
  {
    id: '3',
    name: 'Sucursal Sur',
    address: 'Av. Sur 789, Ciudad',
    phone: '+57 300 123 4569',
    email: 'sur@tienda.com',
    isActive: true
  }
];

interface StoreProviderProps {
  children: ReactNode;
}

export function StoreProvider({ children }: StoreProviderProps) {
  const [stores] = useState<Store[]>(mockStores);
  const [currentStore, setCurrentStoreState] = useState<Store | null>(null);

  useEffect(() => {
    // Set first store as default
    if (stores.length > 0 && !currentStore) {
      setCurrentStoreState(stores[0]);
    }
  }, [stores, currentStore]);

  const setCurrentStore = (store: Store) => {
    setCurrentStoreState(store);
    localStorage.setItem('pos_current_store', JSON.stringify(store));
  };

  const value = {
    stores,
    currentStore,
    setCurrentStore
  };

  return (
    <StoreContext.Provider value={value}>
      {children}
    </StoreContext.Provider>
  );
}