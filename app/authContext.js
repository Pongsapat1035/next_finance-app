"use client"
import { createContext, useContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { storeCredential } from "./action";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const storeCookie = async (accessToken) => {
        await storeCredential(accessToken)
    }

    // useEffect(() => {
    //     const unsubscribe = onAuthStateChanged(auth, (user) => {
    //         console.log('from context ', user)
    //         setUser(user);
    //         if (user) {
    //             console.log(user.getIdToken())
    //             storeCookie(user.accessToken)
    //         }
    //         setLoading(false);
    //     });

    //     return () => unsubscribe(); // Clean up the listener
    // }, [auth]);

    return (
        <AuthContext.Provider value={{ user, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
