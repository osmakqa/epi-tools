import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCTQkfUKhXgc0WAVEOWVb5PQs-vgmLCFEY",
  authDomain: "epi-tools.firebaseapp.com",
  projectId: "epi-tools",
  storageBucket: "epi-tools.firebasestorage.app",
  messagingSenderId: "398269619743",
  appId: "1:398269619743:web:7d6702d50d86339958bf2a",
  measurementId: "G-C4HJR5TQJH"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);