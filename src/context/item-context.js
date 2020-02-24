import React, { createContext, useContext } from 'react';
import { useItems } from '../hooks/';

export const ItemsContext = createContext();
export const ItemsProvider = ({ children }) => {
  const { items, setItems } = useItems();

  return (
    <ItemsContext.Provider value={{ items, setItems }}>
      {children}
    </ItemsContext.Provider>
  );
};

export const useItemsValue = () => useContext(ItemsContext);
