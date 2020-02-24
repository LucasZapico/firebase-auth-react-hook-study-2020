import React, { useState } from 'react';
import {
  useSelectedItemValue,
  useFirebaseValue,
  FirebaseContext,
  useItemsValue,
} from '../../context';
import { FaCircle } from 'react-icons/fa';
import ToMarkdown from '../ToMarkdown/ToMarkdown';

export const ItemContent = () => {
  const { selectedItem } = useSelectedItemValue();

  const { items } = useItemsValue();
  let Item = '';
  if (selectedItem) {
    Item = items.find(item => {
      return item.docId == selectedItem;
    });
  }

  return (
    <div className="item-content grid--stack">
      <h2 className="item-content__title">{Item.title}</h2>
      <h5 className="item-content__parent">{Item.parent}</h5>
      <a
        className="item-content__link neu-pos margin-s margin-y padding-xxs"
        href={Item.link}
      >
        {Item.title} project page
      </a>

      <div className="grid margin-sm margin-y flex--justify-between">
        {Item.tags ? (
          <div className="grid__column--5--md">
            <h5 className="kill-margin">Tags</h5>
            <ItemTags tags={Item.tags} />
          </div>
        ) : (
          undefined
        )}
        {Item.categories ? (
          <div className="grid__column--md--6">
            <h5 className="kill-margin">Categories</h5>
            <ItemCategories cat={Item.categories} />
          </div>
        ) : (
          undefined
        )}
      </div>

      <div className="margin-sm margin-y">
        In current workflow
        <span
          className={
            Item.inWorkFlow ? 'radio radio__pos' : 'radio radio__neg'
          }
        >
          <FaCircle />
        </span>
      </div>

      <hr></hr>
      {Item ? (
        <ToMarkdown text={Item.description} />
      ) : (
        <div>loading</div>
      )}
    </div>
  );
};

const ItemTags = props => {
  return (
    <div className="grid item-content__tags  margin-xs margin-y">
      {props.tags &&
        props.tags.map(t => (
          <div className="item-content__tag grid__column-2">{t}</div>
        ))}
    </div>
  );
};

const ItemCategories = props => {
  return (
    <div className="grid item-content__categories margin-xs margin-y">
      {props.cat &&
        props.cat.map(c => (
          <div className="item-content__category grid__column-2">
            {c}
          </div>
        ))}
    </div>
  );
};
