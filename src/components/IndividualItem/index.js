import React, { useState } from 'react';
import {
  useAuthValue,
  useFirebaseValue,
  FirebaseContext,
  useSelectedItemValue,
  useItemsValue,
} from '../../context/index';

import { FaTrash } from 'react-icons/fa';

const IndividualItem = ({ item }) => {
  const { currentUser } = useAuthValue();
  const { items, setItems } = useItemsValue();
  const firebase = useFirebaseValue(FirebaseContext);

  const deleteItem = () => {
    console.log('delete Item', item.docId);
    firebase.db
      .collection('items')
      .doc(item.docId)
      .delete()
      .then(() => {
        setItems([...items]);
      })
      .catch(error => {
        console.error(error.message);
      });
  };

  return (
    <>
      <span className="">{item.title}</span>
      {currentUser ? (
        <span className="" role="button" onClick={e => deleteItem()}>
          <FaTrash />
        </span>
      ) : (
        undefined
      )}
    </>
  );
};

export default IndividualItem;
