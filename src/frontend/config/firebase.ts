import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyCaR2L28eKYbYS0WYTCGQaPLclzgKB6azY",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "snipenthub.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "snipenthub",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "snipenthub.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "292567328402",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:292567328402:web:589f584f3834de614da84b",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
