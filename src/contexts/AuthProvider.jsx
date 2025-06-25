import React, { createContext, useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';
import { auth } from '../firebase/firebase.init';

// Create the context to share authentication data and functions
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);         // Track current logged-in user
  const [loading, setLoading] = useState(true);   // Track loading state during auth

  const googleProvider = new GoogleAuthProvider();

  // Create user with email and password
  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Sign in user with email and password
  const signInUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Sign in with Google popup
  const signInWithGoogle = () => {
    return signInWithPopup(auth, googleProvider);
  };

  // Log out the user
  const logOut = () => {
    return signOut(auth);
  };

  // Subscribe to authentication state changes when component mounts
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);
      setLoading(false); // Done loading once auth state is known
    });

    // Clean up subscription on unmount
    return () => unsubscribe();
  }, []);

  // The object with all auth info & methods to provide through context
  const authInfo = {
    user,
    loading,
    createUser,
    signInUser,
    signInWithGoogle,
    logOut,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

