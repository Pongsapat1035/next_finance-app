import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, connectAuthEmulator } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCHdG7_k4fLvQ6SAAiSLOLx3Q8-X-9PNbE",
    authDomain: "finance-app-fc057.firebaseapp.com",
    projectId: "finance-app-fc057",
    storageBucket: "finance-app-fc057.firebasestorage.app",
    messagingSenderId: "548963231458",
    appId: "1:548963231458:web:d1a6b6792535282e32e0bb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();

connectAuthEmulator(auth, "http://127.0.0.1:9099");

export {
    db, auth
}