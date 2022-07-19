import { openDB } from 'idb';
import { ContextExclusionPlugin } from 'webpack';

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
export const putDb = async (id, content) => {
  
  //Display message to know that the content is updated 
  console.log("PUT (Update) to the database", id);

  //Create the connection to the database and the version we want to use 
  const jateDB = await openDB('jate', 1);

  //Create a transaction and specify the database and data privileges 
  const tx = jateDB.transaction('jate', 'readwrite');

  //Open up the object store
  const store = tx.objectStore('jate');

  //Update the data from the database 
  const request = store.put({ id: id, content: content });

  //Confirm the request 
  const result = await request;

  //Log to know we successfully request the data 
  console.log("Content is updated", result);

  //Return the result
  return result;
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {

  //Display message to know we are getting all data from database
  console.log("GET all data from the database");

  //Create the connection to the database and the version we want to use 
  const jateDB = await openDB('jate', 1);

  //Create a new transaction and specify the database and data privileges 
  const tx = jateDB.transaction('jate', 'readonly');

  //Open up the object store 
  const store = tx.objectStore('jate');

  //Get all method to get all data in the database 
  const request = store.getAll();
  
  //Confirm the request 
  const result = await request;

  //Log to know we successfully request the data 
  console.log('Getting data from database', result);

  //Return the result 
  return result;
};

initdb();