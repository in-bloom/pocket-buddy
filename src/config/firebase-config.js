// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey:
    process.env.REACT_APP_FIREBASE_API_KEY ||
    functions.config().firebase.api_key,
  authDomain:
    process.env.REACT_APP_FIREBASE_AUTH_DOMAIN ||
    functions.config().firebase.auth_domain,
  projectId:
    process.env.REACT_APP_FIREBASE_PROJECT_ID ||
    functions.config().firebase.project_id,
  storageBucket:
    process.env.REACT_APP_FIREBASE_STORAGE_BUCKET ||
    functions.config().firebase.storage_bucket,
  messagingSenderId:
    process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID ||
    functions.config().firebase.messaging_sender_id,
  appId:
    process.env.REACT_APP_FIREBASE_APP_ID || functions.config().firebase.app_id,
  measurementId:
    process.env.REACT_APP_FIREBASE_MEASUREMENT_ID ||
    functions.config().firebase.measurement_id,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);
