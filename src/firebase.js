
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyCbTQAoaqC85Q5IsA8CHEPOxFvmJv30c4c",
  authDomain: "my-project-aba94.firebaseapp.com",
  projectId: "my-project-aba94",
  storageBucket: "my-project-aba94.appspot.com",
  messagingSenderId: "267261930825",
  appId: "1:267261930825:web:7785c3be5a8efdd9947e98"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);

 export {app, auth, db};