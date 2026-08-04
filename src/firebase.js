import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA9d9McCFfbvg-Yc9qmMAzXztBigUe97Rg",
  authDomain: "travel-buddy-4d5a7.firebaseapp.com",
  projectId: "travel-buddy-4d5a7",
  storageBucket: "travel-buddy-4d5a7.firebasestorage.app",
  messagingSenderId: "150411302209",
  appId: "1:150411302209:web:3a5162d55cf87a6e57bdc0",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export default app;