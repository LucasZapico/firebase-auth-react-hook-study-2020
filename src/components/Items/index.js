import React, { useState } from 'react';
import IndividualItem from '../IndividualItem';
import {
  useSelectedItemValue,
  useItemsValue,
} from '../../context/index';

const Items = ({ activeValue = null }) => {
  const { selectedItem, setSelectedItem } = useSelectedItemValue();
  const { items } = useItemsValue();

  if (selectedItem == null && items.length > 0) {
    setSelectedItem(items[0].docId);
  }

  return (
    items &&
    items.map(item => (
      <li
        key={item.docId}
        data-docs-id={item.docId}
        data-testid=""
        className={
          selectedItem === item.docId
            ? 'active sidenav__item'
            : 'sidenav__item'
        }
        onClick={() => {
          setSelectedItem(item.docId);
        }}
      >
        <IndividualItem item={item} />
      </li>
    ))
  );
};

export default Items;
