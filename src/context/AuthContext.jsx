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

  // Helper: Update Profile
  const updateUserProfile = async (user, profileData) => {
    await updateProfile(user, profileData);
    // Refresh user state
    setCurrentUser({ ...user, ...profileData });
  };

  // Sign up with Email & Password
  const signup = async (email, password, fullName) => {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // Use helper to update profile
    await updateUserProfile(user, { displayName: fullName });

    // Create user document in Firestore
    try {
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: user.email,
        fullName: fullName,
        createdAt: new Date().toISOString(),
        role: "customer",
      });
    } catch (error) {
      console.error("Error creating user document:", error);
    }

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
    provider.setCustomParameters({ prompt: "select_account" });

    try {
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
      } catch (dbError) {
        console.error("Firestore Error (non-critical):", dbError);
      }

      // MANUAL STATE UPDATE:
      setCurrentUser(user);
      return user;
    } catch (error) {
      console.error("Google Sign In Error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Logout
  const logout = () => {
    setLoading(true);
    return signOut(auth).then(() => {
      setCurrentUser(null);
      setLoading(false);
    });
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
    updateUserProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
