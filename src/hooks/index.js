import { useState, useEffect } from 'react';
import moment from 'moment';
import { aggregateItemsExist } from '../helpers';
import { useFirebaseValue, FirebaseContext } from '../context';

export const useItems = () => {
  const firebase = useFirebaseValue(FirebaseContext);
  const [items, setItems] = useState([]);

  console.log('firebase', firebase);

  useEffect(() => {
    firebase.db
      .collection('items')
      .orderBy('dateAdded')
      .get()
      .then(snapshot => {
        const allItems = snapshot.docs.map(item => ({
          ...item.data(),
          docId: item.id,
        }));
        console.log('all items', allItems);
        if (JSON.stringify(allItems) !== JSON.stringify(items)) {
          setItems(allItems);
        }
      });
  }, [items]);

  return { items, setItems };
};
