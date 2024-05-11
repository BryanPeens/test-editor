const { openDB } = require('idb');

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

// Method to add content to the database
const putDb = async (content) => {
  console.log('Adding content to the database:', content);
  const db = await openDB('jate', 1);
  const tx = db.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  await store.add({ content });
  await tx.done;
  console.log('Content added successfully.');
};

// Method to get all content from the database
const getDb = async () => {
  console.log('Fetching all content from the database');
  const db = await openDB('jate', 1);
  const tx = db.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  const content = await store.getAll();
  console.log('All content retrieved from the database:', content);
  return content;
};

initdb();

module.exports = { putDb, getDb };
