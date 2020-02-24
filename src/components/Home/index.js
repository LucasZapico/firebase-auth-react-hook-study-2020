import React from 'react';
import Sidenav from '../Sidenav';
import { ItemContent } from '../ItemContent/ItemContent';
import { useSelectedItemValue, useItemsValue } from '../../context';

const HomePage = () => {
  const { selectedItem, setSelectedItem } = useSelectedItemValue();
  const { items } = useItemsValue();

  if (selectedItem == null && items.length > 0) {
    setSelectedItem(items[0].docId);
  }
  return (
    <div className="grid">
      <div className="grid__column--2--md">
        <Sidenav />
      </div>
      <div className="container grid__column margin-md margin-x">
        {selectedItem ? <ItemContent /> : <div>loading</div>}
      </div>
    </div>
  );
};

export default HomePage;
