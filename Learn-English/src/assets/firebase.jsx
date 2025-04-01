// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCuNoFK2futLj3zTI95OpmmH6rEOJuPNwE",
  authDomain: "learn-english-beb88.firebaseapp.com",
  projectId: "learn-english-beb88",
  storageBucket: "learn-english-beb88.firebasestorage.app",
  messagingSenderId: "263238685002",
  appId: "1:263238685002:web:fe3bac9ca122e090b6f1b3",
  measurementId: "G-SLD58FPENN"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Obtener una instancia de Firestore
const db = getFirestore(app);

export { db };