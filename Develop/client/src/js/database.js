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
export const putDb = async (content) => { 
  console.log('Attempting to store data:', content, typeof content);
// Open (or create) the 'jate' database with version 1.
const db = await openDB('jate', 1);

// Start a transaction on the 'jate' object store with readwrite permissions.
// This allows us to modify the data.
const tx = db.transaction('jate', 'readwrite');

// Access the 'jate' object store within the transaction.
const store = tx.objectStore('jate');

//  method on the store and pass in the content.
  const request = store.put({id: 1, value: content });

// Wait for the transaction to complete and then return its status.
const result = await request;
console.log('data saved to the database', result.valueOf);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {console.log('GET from the database');
// Open (or create) the 'jate' database with version 1.
const db = await openDB('jate', 1);

// Start a transaction on the 'jate' object store with readonly permissions.
// This allows us to fetch the data without modifying it.
const tx = db.transaction('jate', 'readonly');

// Access the 'jate' object store within the transaction.
const store = tx.objectStore('jate');

// method to get all data in the database.
  const request = store.get(1);

// Return all the fetched content.
const result = await request;
console.log('Data retrieved from DB:', result, typeof result);
  result ? console.log("Data retreived from the database", result.valueOf) : console.log("data not found")
  return result?.valueOf;
};
initdb();
