import { openDB } from 'idb';

const dbPromise = openDB('orderDatabase', 1, {
  upgrade(db) {
    const store = db.createObjectStore('order', {
      keyPath: 'id',
      autoIncrement: true,
    });
    store.createIndex('id', 'id');
  },
});

async function addOrder(order) {
  const db = await dbPromise;
  const tx = db.transaction('order', 'readwrite');
  const store = tx.objectStore('order');
  store.add(order);
  return tx.done;
}

async function getAllOrder() {
  const db = await dbPromise;
  const tx = db.transaction('order', 'readonly');
  const store = tx.objectStore('order');
  const getAll = store.getAll();

  return getAll;
}

async function updateOrder(order, id) {
  const db = await dbPromise;
  const tx = db.transaction('order', 'readwrite');
  const store = tx.objectStore('order');
  store.put(order, id);
  return tx.done;
}

async function deleteOrder(id) {
  const db = await dbPromise;
  const tx = db.transaction('order', 'readwrite');
  const store = tx.objectStore('order');
  store.delete(id);
  return tx.done;
}

export {
  addOrder, getAllOrder, updateOrder, deleteOrder,
};
