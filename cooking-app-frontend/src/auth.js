import { auth } from './firebase-config';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from 'firebase/auth';
import { useState, useEffect } from 'react';
import { setPersistence, browserSessionPersistence } from 'firebase/auth';

export const signUp = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
};

export const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
};

export const logout = () => {
    return signOut(auth);
};

export const useAuth = () => {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            setCurrentUser(user);
        });
        return unsubscribe;
    }, []);

    return currentUser;
};
