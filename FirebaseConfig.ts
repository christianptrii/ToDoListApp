// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBVnnmBR-XRdi406gSKrbtZNQEJf5yL124",
  authDomain: "todolist-app-142cb.firebaseapp.com",
  projectId: "todolist-app-142cb",
  storageBucket: "todolist-app-142cb.appspot.com",
  messagingSenderId: "743856996053",
  appId: "1:743856996053:web:eecee49c7d3a31f3632c5c"
};


// Initialize Firebase
export const FREBASE_APP = initializeApp(firebaseConfig);
export const FIRESTORE_DB = getFirestore(FREBASE_APP);