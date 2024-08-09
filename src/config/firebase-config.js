// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBha_nV9KmpPIctkze95kxiySd7JTYvevk",
  authDomain: "pocket-buddy-119dd.firebaseapp.com",
  projectId: "pocket-buddy-119dd",
  storageBucket: "pocket-buddy-119dd.appspot.com",
  messagingSenderId: "134924896250",
  appId: "1:134924896250:web:d774c205489781de3fc643",
  measurementId: "G-FSR1JNGYCD",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
