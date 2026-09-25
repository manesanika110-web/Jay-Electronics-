import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDSypUCiyKblxzFxUwaTUyvWNt5GCfpNUE",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "jepl-website.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "jepl-website",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "jepl-website.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "118646212901",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:118646212901:web:16d86015ff55500843f2cc"
};

// Initialize Firebase safely
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;