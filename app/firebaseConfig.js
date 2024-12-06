// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { auth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBDjdVEZFTSWRBL6IthR_GSQvKpAEn-P-w",
  authDomain: "eventsphere-fc306.firebaseapp.com",
  databaseURL: "https://eventsphere-fc306-default-rtdb.firebaseio.com",
  projectId: "eventsphere-fc306",
  storageBucket: "eventsphere-fc306.firebasestorage.app",
  messagingSenderId: "913701541933",
  appId: "1:913701541933:web:03ca110249db70f03040a4",
  measurementId: "G-8TN86YD9QS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = auth(app);