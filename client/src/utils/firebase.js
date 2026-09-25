
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDv8kyJB6YOJUCrL_QYTcO9qXPJbdrVyVA",
  authDomain: "interview-iq-6dff1.firebaseapp.com",
  projectId: "interview-iq-6dff1",
  storageBucket: "interview-iq-6dff1.firebasestorage.app",
  messagingSenderId: "67883892579",
  appId: "1:67883892579:web:75cd30c8ca98e3f316dd56"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const provider = new GoogleAuthProvider()

export {auth , provider}