// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC266XIyadSH32bEjh2UuKeRl3JJVjaXM8",
  authDomain: "real-time-chat-app-c1c53.firebaseapp.com",
  projectId: "real-time-chat-app-c1c53",
  storageBucket: "real-time-chat-app-c1c53.appspot.com",
  messagingSenderId: "947068139161",
  appId: "1:947068139161:web:b8032a9b953cf0e6cf2a08",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

export { app, auth, database };
