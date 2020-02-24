import React, { useState, createContext, useContext } from 'react';

export const SelectedItemContext = createContext(null);
export const SelectedItemProvider = ({ children }) => {
  const [selectedItem, setSelectedItem] = useState();

  return (
    <SelectedItemContext.Provider
      value={{ selectedItem, setSelectedItem }}
    >
      {children}
    </SelectedItemContext.Provider>
  );
};

export const useSelectedItemValue = () =>
  useContext(SelectedItemContext);
