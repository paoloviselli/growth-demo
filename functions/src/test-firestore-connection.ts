process.env.FIRESTORE_EMULATOR_HOST = '127.0.0.1:8081';
process.env.GCLOUD_PROJECT = 'fyxer-demo'; // or whatever your project id is

import { initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

initializeApp();

const db = getFirestore();

db.collection('test')
  .add({ hello: 'world' })
  .then(() => {
    console.log('Success!');
    process.exit(0);
  })
  .catch(err => {
    console.error('Error:', err);
    process.exit(1);
  });
