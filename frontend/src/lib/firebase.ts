import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyDummyDevKeyToPreventAppCrash123",
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "patil-krushi-seva-kendra.firebaseapp.com",
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "patil-krushi-seva-kendra",
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "patil-krushi-seva-kendra.appspot.com",
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "100000000000",
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:100000000000:web:0000000000000000000000",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);