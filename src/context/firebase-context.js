import React, { useContext, useState, createContext } from 'react';
import Firebase from '../components/Firebase/firebase';

export const FirebaseContext = createContext(null);

export const FirebaseProvider = ({ children }) => {
  return (
    <FirebaseContext.Provider value={new Firebase()}>
      {children}
    </FirebaseContext.Provider>
  );
};

export const useFirebaseValue = () => useContext(FirebaseContext);
