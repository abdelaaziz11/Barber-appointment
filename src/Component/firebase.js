// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDGaVJhUb2LjIPEVk8bEf_b9K_TwBDyeCA",
  authDomain: "barber-app-3e4cc.firebaseapp.com",
  projectId: "barber-app-3e4cc",
  storageBucket: "barber-app-3e4cc.firebasestorage.app",
  messagingSenderId: "849988732906",
  appId: "1:849988732906:web:9ba614c27d2c7f9e9c1493",
  measurementId: "G-K2D4658N1P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

export const auth = getAuth();
export const db = getFirestore(app);
export default app;

