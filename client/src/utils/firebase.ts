import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";

// Your Firebase configuration from mock-interview-hub
const firebaseConfig = {
  apiKey: "AIzaSyDv8kyJB6YOJUCrL_QYTcO9qXPJbdrVyVA",
  authDomain: "interview-iq-6dff1.firebaseapp.com",
  projectId: "interview-iq-6dff1",
  storageBucket: "interview-iq-6dff1.firebasestorage.app",
  messagingSenderId: "67883892579",
  appId: "1:67883892579:web:75cd30c8ca98e3f316dd56"
};

// Initialize Firebase safely
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: 'select_account'
});

export { app, auth, provider, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut };
