// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBCZJRjQCtS0nxMZYtUigz46DYzWEp8JDs",
  authDomain: "splitz-457db.firebaseapp.com",
  projectId: "splitz-457db",
  storageBucket: "splitz-457db.appspot.com",
  messagingSenderId: "320345983202",
  appId: "1:320345983202:web:4bd9e2c7e780b58ed4f6bb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);