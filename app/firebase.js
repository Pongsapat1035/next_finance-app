
import { initializeApp } from "firebase/app";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getAuth, connectAuthEmulator } from "firebase/auth";

// const firebaseConfig = {
//     apiKey: "AIzaSyCHdG7_k4fLvQ6SAAiSLOLx3Q8-X-9PNbE",
//     authDomain: "finance-app-fc057.firebaseapp.com",
//     projectId: "finance-app-fc057",
//     storageBucket: "finance-app-fc057.firebasestorage.app",
//     messagingSenderId: "548963231458",
//     appId: "1:548963231458:web:d1a6b6792535282e32e0bb"
// };

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FB_APIKEY,
    authDomain: process.env.NEXT_PUBLIC_FB_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FB_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FB_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FB_MESSAGIN_ID,
    appId: process.env.NEXT_PUBLIC_FB_APP_ID
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();

// connectFirestoreEmulator(db, '127.0.0.1', 8090);
// connectAuthEmulator(auth, "http://127.0.0.1:9099");

export {
    db, auth
}