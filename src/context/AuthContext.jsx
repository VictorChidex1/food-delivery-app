import React, { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  updateProfile,
} from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Sign up with Email & Password
  const signup = async (email, password, fullName) => {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // Update profile display name
    await updateProfile(user, { displayName: fullName });

    // Create user document in Firestore
    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      email: user.email,
      fullName: fullName,
      createdAt: new Date().toISOString(),
      role: "customer", // Default role
    });

    setCurrentUser(user);
    return user;
  };

  // Login with Email & Password
  const login = async (email, password) => {
    const result = await signInWithEmailAndPassword(auth, email, password);
    setCurrentUser(result.user);
    return result;
  };

  // Login with Google
  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // Check if user exists in Firestore, if not create them
    try {
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (!userDoc.exists()) {
        await setDoc(doc(db, "users", user.uid), {
          uid: user.uid,
          email: user.email,
          fullName: user.displayName,
          createdAt: new Date().toISOString(),
          role: "customer",
        });
      }
    } catch (error) {
      console.error("Firestore Error (non-critical):", error);
      // We do NOT re-throw here. We allow the user to be "logged in" even if their profile doc failed.
      // This prevents the "Redirected but not logged in" state.
    }

    // MANUAL STATE UPDATE:
    // Ensure the UI updates immediately, even if the onAuthStateChanged listener is slow
    setCurrentUser(user);
    setLoading(false);

    return user;
  };

  // Logout
  const logout = () => {
    return signOut(auth);
  };

  // Reset Password
  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  useEffect(() => {
    console.log("AuthContext: Setting up onAuthStateChanged listener...");
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log(
        "AuthContext: Auth State Changed:",
        user ? `User ${user.uid} logged in` : "No user logged in"
      );
      if (user) {
        try {
          const token = await user.getIdToken();
          console.log("AuthContext: User Token:", token);
          console.log("AuthContext: User Metadata:", user.metadata);
        } catch (e) {
          console.error("AuthContext: Error fetching token", e);
        }
      }
      setCurrentUser(user);
      setLoading(false);
    });

    return () => {
      console.log("AuthContext: Cleaning up listener");
      unsubscribe();
    };
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    googleSignIn,
    logout,
    resetPassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
