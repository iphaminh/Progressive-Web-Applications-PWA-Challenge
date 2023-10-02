import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => { console.error('putDb not implemented');
// Open (or create) the 'jate' database with version 1.
const db = await openDB('jate', 1);

// Start a transaction on the 'jate' object store with readwrite permissions.
// This allows us to modify the data.
const tx = db.transaction('jate', 'readwrite');

// Access the 'jate' object store within the transaction.
const store = tx.objectStore('jate');

// Add or update the content in the object store.
// If a record with the same key exists, it will be updated. Otherwise, a new record will be added.
await store.put({ content: content });

// Wait for the transaction to complete and then return its status.
return tx.done;
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {console.error('getDb not implemented');
// Open (or create) the 'jate' database with version 1.
const db = await openDB('jate', 1);

// Start a transaction on the 'jate' object store with readonly permissions.
// This allows us to fetch the data without modifying it.
const tx = db.transaction('jate', 'readonly');

// Access the 'jate' object store within the transaction.
const store = tx.objectStore('jate');

// Retrieve all records from the object store.
const allContent = await store.getAll();

// Return all the fetched content.
return allContent;
};
initdb();
