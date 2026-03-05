import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const config = {
  apiKey: "AIzaSyDqus5MVvcgB7krRo0HHlQ1aBjJL50shns",
  authDomain: "decola-beauty.firebaseapp.com",
  projectId: "decola-beauty",
  storageBucket: "decola-beauty.firebasestorage.app",
  messagingSenderId: "524299034988",
  appId: "1:524299034988:web:6a3ed9e0246308d1431349",
  measurementId: "G-P86FDZ55S1"
}

const app = initializeApp(config);

export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;