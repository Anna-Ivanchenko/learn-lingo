
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyC9PoOCVIST93z6iZT4faFvVxOkkDd-04M',
  authDomain: 'learn-lingo-7770e.firebaseapp.com',
  databaseURL:
    'https://learn-lingo-7770e-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'learn-lingo-7770e',
  storageBucket: 'learn-lingo-7770e.firebasestorage.app',
  messagingSenderId: '804068113822',
  appId: '1:804068113822:web:80834cc0bbb68c185c6a8f',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const database = getDatabase(app);
