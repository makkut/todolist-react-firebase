import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: 'AIzaSyCx8KHJy43LR4bKaozrvSpGnjc0sGP8ncI',
    authDomain: 'todo-list-3c0da.firebaseapp.com',
    databaseURL: 'https://todo-list-3c0da-default-rtdb.firebaseio.com',
    projectId: 'todo-list-3c0da',
    storageBucket: 'todo-list-3c0da.appspot.com',
    messagingSenderId: '912964128388',
    appId: '1:912964128388:web:5844d76936f3c4b369fcd1',
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth();
