import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "./firebase.config";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState(null);

    // Create a password-based account
    const signUpUserWithEmailAndPassword = (email, password) => {
        setIsLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);

    };

    // Sign in a user with an email address and password
    const loginInWithEmailAndPassword = (email, password) => {
        setIsLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    // sign up/sign in with google
    const provider = new GoogleAuthProvider();
    const signInWithGoogle = () => {
        setIsLoading(true);
        return signInWithPopup(auth, provider);
    };

    const logOut = () => {
        setIsLoading(true)
        return signOut(auth)
    }

    // Get the currently signed-in user
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setIsLoading(false)
        });
        return () => unsubscribe();
    }, []);

    const authentication = { user, isLoading, signUpUserWithEmailAndPassword, loginInWithEmailAndPassword, signInWithGoogle, logOut }

    return <AuthContext.Provider value={authentication}>{children}</AuthContext.Provider>

};

export default AuthProvider;