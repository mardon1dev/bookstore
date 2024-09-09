import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBZ_KHq7Tyop_w-InmO3oSreUH3fQN2BTw",
  authDomain: "bookshelf-f2673.firebaseapp.com",
  projectId: "bookshelf-f2673",
  storageBucket: "bookshelf-f2673.appspot.com",
  messagingSenderId: "570485274905",
  appId: "1:570485274905:web:928ba55bf6b3763e916d88"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore(app);
export const storage = getStorage(app)
export default app;