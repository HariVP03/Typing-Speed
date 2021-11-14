import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import config from "./firebase-config.json";

const firebaseConfig = config;

const firebaseApp = initializeApp(firebaseConfig);

export const googleProvider = GoogleAuthProvider;
export const auth = getAuth();
