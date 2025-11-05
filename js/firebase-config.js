// js/firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCCizLxtCfeVe61HMN25o-dhkw_0CDHClE",
  authDomain: "family-tree-project-45d9a.firebaseapp.com",
  projectId: "family-tree-project-45d9a",
  storageBucket: "family-tree-project-45d9a.firebasestorage.app",
  messagingSenderId: "1076967882077",
  appId: "1:1076967882077:web:41639ed6ccf453785dfcb4"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
