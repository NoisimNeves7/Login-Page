// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_KEY,
  authDomain: "login-page-c3b59.firebaseapp.com",
  projectId: "login-page-c3b59",
  storageBucket: "login-page-c3b59.appspot.com",
  messagingSenderId: "262024847037",
  appId: "1:262024847037:web:e360fc72981cad189b21d4",
  measurementId: "G-9F23XF66Z0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();