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

  // 1. Sign up with Email & Password
  const signup = async (email, password, fullName) => {
    // 1a. Create User in Auth
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // 1b. Update Display Name
    await updateProfile(user, { displayName: fullName });

    // 1c. Create User Doc (Non-blocking)
    try {
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: user.email,
        fullName: fullName,
        createdAt: new Date().toISOString(),
        role: "customer",
      });
    } catch (e) {
      console.error("Error saving user profile:", e);
    }

    return user;
  };

  // 2. Login with Email & Password
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // 3. Login with Google
  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    // Force account selection
    provider.setCustomParameters({ prompt: "select_account" });

    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // Check/Create User Doc
    try {
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        await setDoc(userRef, {
          uid: user.uid,
          email: user.email,
          fullName: user.displayName,
          createdAt: new Date().toISOString(),
          role: "customer",
        });
      }
    } catch (e) {
      console.error("Error checking user profile:", e);
    }

    return user;
  };

  // 4. Logout
  const logout = () => {
    return signOut(auth);
  };

  // 5. Reset Password
  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  // 6. SINGLE SOURCE OF TRUTH: onAuthStateChanged
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
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
