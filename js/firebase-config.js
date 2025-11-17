// js/firebase-config.js
// Modular SDK v10 — copy & paste করে আপনার js ফোল্ডারে রাখবেন

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-storage.js";

// আপনার দেওয়া config (আপনি যেভাবে দিয়েছেন তাই রেখেছি)
const firebaseConfig = {
  apiKey: "AIzaSyAPdLm5GIKVxXikDLySlqVPcuK3o0FO6Tc",
  authDomain: "mondol-family-tree.firebaseapp.com",
  databaseURL: "https://mondol-family-tree-default-rtdb.firebaseio.com",
  projectId: "mondol-family-tree",
  storageBucket: "mondol-family-tree.firebasestorage.app",
  messagingSenderId: "972420975737",
  appId: "1:972420975737:web:780666820835483e0b18a8",
  measurementId: "G-YMDN3ZP1KS"
};

// Initialize app + services
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Export storage too (optional — আপনি ব্যবহার করবেন/নাই করবেন বলে থাকতে পারেন)
export const storage = getStorage(app);
