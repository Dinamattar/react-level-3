// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDd4QmOCHOYpmJ-7fYONbObsT_n033i41o",
  authDomain: "react-level2-738fa.firebaseapp.com",
  projectId: "react-level2-738fa",
  storageBucket: "react-level2-738fa.firebasestorage.app",
  messagingSenderId: "210122086478",
  appId: "1:210122086478:web:f45d9b06b45aa463d64b1f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export  const db = getFirestore(app);
