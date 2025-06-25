// src/firebase/firebase.init.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBqayQ3xebM-UWKF_5_Vlxz1ssM9gEBoUI",
  authDomain: "tree-plants-bd.firebaseapp.com",
  projectId: "tree-plants-bd",
  storageBucket: "tree-plants-bd.firebasestorage.app",
  messagingSenderId: "304873294000",
  appId: "1:304873294000:web:5e93b44d9167faaf24d375"
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Initialize and export Firebase Authentication service
export const auth = getAuth(app);
