// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import { getFirestore } from "firebase/firestore";
require("dotenv").config()

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: "todo-firebase-2f229.firebaseapp.com",
  projectId: "todo-firebase-2f229",
  storageBucket: "todo-firebase-2f229.appspot.com",
  messagingSenderId: "248849358249",
  appId: "1:248849358249:web:3ac51d2225e6f29b10f8b8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);