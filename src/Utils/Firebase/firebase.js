// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC9DfdvGl9bxYKGs3ddDzQJeCXummRyXzI",
  authDomain: "parkspotter-backend.firebaseapp.com",
  projectId: "parkspotter-backend",
  storageBucket: "parkspotter-backend.appspot.com",
  messagingSenderId: "805993286721",
  appId: "1:805993286721:web:1ad156d8b7e5370b778ac0",
  measurementId: "G-BX4551K73Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db };
