import React, { useState } from 'react';
import { itemSchema } from '../../constants/schema';
import moment from 'moment';
import {
  useFirebaseValue,
  FirebaseContext,
  useSelectedItemValue,
  useItemsValue,
} from '../../context';
import { generatePushId, generateCleanTags } from '../../helpers';
import Sidenav from '../Sidenav';
import { FaDotCircle, FaCircle } from 'react-icons/fa';
import FileDrop from 'react-file-drop';

let count = 0;

const EditItemsPage = () => {
  const { selectedItem, setSelectedItem } = useSelectedItemValue();

  return (
    <div className="grid">
      <div className="grid__column--2--md">
        <Sidenav />
      </div>
      <div className="container grid__column--9">
        {selectedItem ? (
          <EditItem
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
          />
        ) : (
          <AddItem selectedItem={selectedItem} />
        )}
      </div>
    </div>
  );
};

const AddItem = selectedItem => {
  const [item, setItem] = useState(itemSchema);
  const { items, setItems } = useItemsValue();
  const firebase = useFirebaseValue(FirebaseContext);

  const itemId = generatePushId();

  const onTagChange = (e, setType) => {
    let tagsArray = generateCleanTags(e.target.value);
    setItem({ ...item, [setType]: tagsArray });
  };

  const addItem = e => {
    e.preventDefault();
    setItem({ ...item, itemId });
    firebase.db
      .collection('items')
      .add(item)
      .then(() => {
        setItems([...items]);
      });
  };

  return (
    <div className="add-item grid container">
      <h1>Hello from Add Item</h1>

      <form className="form" onSubmit={addItem}>
        {/* title */}
        <label for="item-title" className="form__label">
          Title
        </label>
        <input
          autoComplete="off"
          className="form__title"
          aria-label="Enter item title"
          type="text"
          id="item-title"
          value={item.title}
          onChange={e => setItem({ ...item, title: e.target.value })}
        />
        {/* description */}
        <label for="item-description" className="form__label">
          Description
        </label>
        <textarea
          autoComplete="off"
          className="form__description"
          type="text"
          id="item-description"
          aria-label="Enter description of item"
          value={item.description}
          onChange={e => {
            setItem({ ...item, description: e.target.value });
          }}
        ></textarea>
        {/* parent */}
        <label for="item-parent" className="form__label">
          Parent
        </label>
        <input
          autoComplete="off"
          className=""
          aria-label="Enter item parent"
          type="text"
          id="item-parent"
          value={item.parent}
          onChange={e => setItem({ ...item, parent: e.target.value })}
        />
        {/* link */}
        <label for="item-link" className="form__label">
          Link
        </label>
        <input
          autoComplete="off"
          className=""
          aria-label="Enter link to item source"
          type="text"
          id="item-link"
          value={item.link}
          // add url check
          onChange={e => setItem({ ...item, link: e.target.value })}
        />
        {/* tags */}
        <label for="item-tags" className="form__label">
          Tags
        </label>
        <input
          autoComplete="off"
          className=""
          aria-label="Enter item tags"
          type="text"
          id="item-tags"
          value={item.tag}
          onChange={e => onTagChange(e, 'tags')}
        />
        {/* categories */}
        <label for="item-categories" className="form__label">
          Categories
        </label>
        <input
          autoComplete="off"
          className=""
          aria-label="Enter item tags"
          type="text"
          id="item-categories"
          value={item.categories}
          onChange={e => onTagChange(e, 'categories')}
        />
        {/* in current workflow */}
        <label for="item-link" className="form__label">
          In Current Workflow
        </label>
        <div className="padding-sm">
          <span
            onClick={e =>
              setItem({ ...item, inWorkFlow: !item.inWorkFlow })
            }
            id="item-in-workflow"
            className={
              item.inWorkFlow
                ? 'radio radio__pos'
                : 'radio radio__neg'
            }
            aria-label="Enter item parent"
          >
            <FaCircle />
          </span>
        </div>
        {/* date added */}
        <label for="date-added" className="form__label">
          Date Added
        </label>
        <input
          autoComplete="off"
          type="date"
          id="date-added"
          name="date-added"
          value="2020-01-01"
          min="2016-01-01"
          max="2025-12-31"
          onChange={e => {
            console.log(item);
            setItem({ ...item, dateAdded: e.target.value });
          }}
        ></input>
        {/* date updated */}
        <label for="date-updated" className="form__label">
          Date Updated
        </label>
        <input
          autoComplete="off"
          type="date"
          id="date-updated"
          name="date-updated"
          value="2020-01-01"
          min="2016-01-01"
          max="2025-12-31"
          onChange={e =>
            setItem({ ...item, dateUpdated: e.target.value })
          }
        ></input>{' '}
        <button
          type="submit"
          className="btn button"
          tabIndex={0}
          role="button"
        >
          Add Item
        </button>
      </form>
    </div>
  );
};

const EditItem = ({ selectedItem, setSelectedItem }) => {
  const { items, setItems } = useItemsValue();
  const [editing, setEditing] = useState(false);
  const [item, setItem] = useState(items[0]);

  const firebase = useFirebaseValue(FirebaseContext);

  const onTagChange = (e, setType) => {
    let tagsArray = generateCleanTags(e.target.value);
    setItem({ ...item, [setType]: tagsArray });
  };

  const handleDrop = (files, event) => {
    console.log(files, event);
  };

  const reSizeTextArea = e => {
    e.target.style.height = 'inherit';
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  if (selectedItem === null) {
    setItem(items[0]);
    setEditing(true);
  } else if (selectedItem !== item.docId) {
    console.log('doc update');
    firebase.db
      .collection('items')
      .doc(selectedItem)
      .get()
      .then(doc => {
        if (
          doc.exists &&
          JSON.stringify(doc.data()) !== JSON.stringify(item)
        ) {
          setItem({ ...doc.data(), docId: selectedItem });
          setEditing(true);
        }
      })
      .catch(error => {
        console.error(error.message);
      });
  }

  const updateItem = e => {
    e.preventDefault();
    setItem({ item });
    firebase.db
      .collection('items')
      .doc(selectedItem)
      .update(item)
      .then(() => {
        setItems([...items]);
      });
  };

  return (
    <div className="add-item grid container">
      <h1>Hello from Edit Item</h1>

      <form className="form" onSubmit={updateItem}>
        {/* title */}
        <label for="item-title" className="form__label">
          Title
        </label>
        <input
          autoComplete="off"
          className="form__title"
          aria-label="Enter item title"
          type="text"
          id="item-title"
          value={item.title}
          onChange={e => setItem({ ...item, title: e.target.value })}
        ></input>
        {/* description */}
        <label for="item-description" className="form__label">
          Description
        </label>
        <textarea
          autoComplete="off"
          className="form__description"
          type="text"
          id="item-description"
          aria-label="Enter description of item"
          value={item.description}
          onChange={e => {
            reSizeTextArea(e);
            setItem({ ...item, description: e.target.value });
          }}
        ></textarea>
        {/* Imaes */}
        <label for="item-parent" className="form__label">
          Images
        </label>
        <FileDrop onDrop={handleDrop}>Drop some files here!</FileDrop>
        {/* parent */}
        <label for="item-parent" className="form__label">
          Parent
        </label>
        <input
          autoComplete="off"
          className=""
          aria-label="Enter item parent"
          type="text"
          id="item-parent"
          value={item.parent}
          onChange={e => setItem({ ...item, parent: e.target.value })}
        />
        {/* link */}
        <label for="item-link" className="form__label">
          Link
        </label>
        <input
          autoComplete="off"
          className=""
          aria-label="Enter link to item source"
          type="text"
          id="item-link"
          value={item.link}
          // add url check
          onChange={e => setItem({ ...item, link: e.target.value })}
        />
        {/* tags */}
        <label for="item-tags" className="form__label">
          Tags
        </label>
        <input
          autoComplete="off"
          className=""
          aria-label="Enter item tags"
          type="text"
          id="item-tags"
          value={item.tags}
          onChange={e => onTagChange(e, 'tags')}
        />
        {/* categories */}
        <label for="item-categories" className="form__label">
          Categories
        </label>
        <input
          autoComplete="off"
          className=""
          aria-label="Enter item tags"
          type="text"
          id="item-categories"
          value={item.categories}
          onChange={e => onTagChange(e, 'categories')}
        />
        {/* in current workflow */}
        <label for="item-link" className="form__label">
          In Current Workflow
        </label>
        <div className="padding-sm">
          <span
            onClick={e =>
              setItem({ ...item, inWorkFlow: !item.inWorkFlow })
            }
            id="item-in-workflow"
            className={
              item.inWorkFlow
                ? 'radio radio__pos'
                : 'radio radio__neg'
            }
            aria-label="Enter item parent"
          >
            <FaCircle />
          </span>
        </div>

        {/* date added */}
        <label for="date-added" className="form__label">
          Date Added
        </label>
        <input
          autoComplete="off"
          type="date"
          id="date-added"
          name="date-added"
          value="2020-01-01"
          min="2016-01-01"
          max="2025-12-31"
          onChange={e => {
            console.log(item);
            setItem({ ...item, dateAdded: e.target.value });
          }}
        ></input>
        {/* date updated */}
        <label for="date-added" className="form__label">
          Date Updated
        </label>
        <input
          autoComplete="off"
          type="date"
          id="date-updated"
          name="date-updated"
          value="2020-01-01"
          min="2016-01-01"
          max="2025-12-31"
          onChange={e =>
            setItem({ ...item, dateUpdated: e.target.value })
          }
        ></input>
        <button
          type="submit"
          className="btn button"
          tabIndex={0}
          role="button"
        >
          Update Item
        </button>
        <button
          onClick={() => setSelectedItem(null)}
          className="btn button"
          tabIndex={0}
          role="button"
        >
          Add New Item
        </button>
      </form>
    </div>
  );
};

export default EditItemsPage;

export { AddItem, EditItem };
