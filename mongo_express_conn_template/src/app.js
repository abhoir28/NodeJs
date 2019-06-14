import express from 'express';
const app = express();

import initializeDatabases from '../db/connection';
import routes from '../routes/model';

import {
  DATABASE_URL,
  DATABASE_NAME,
  DATABASE_USER,
  DATABASE_PASS
} from '../config';

initializeDatabases().then(db => {
  // Initialize the application once database connections are ready.
  routes(app, db).listen(3000, () => console.log('Listening on port 3000'));
}).catch(err => {
  console.error('Failed to make all database connections!');
  console.error(err);
  process.exit(1);
});