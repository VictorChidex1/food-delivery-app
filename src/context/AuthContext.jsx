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

  // --- HELPER: Create/Update User Document ---
  // This ensures that whether a user signs up via Email or Google,
  // we always have a corresponding document in the 'users' collection.
  const createUserDocument = async (user, additionalData = {}) => {
    if (!user) return;

    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      const { email, displayName, photoURL } = user;
      const createdAt = new Date().toISOString();

      try {
        await setDoc(userRef, {
          uid: user.uid,
          email,
          fullName: displayName || additionalData.fullName || "User",
          photoURL: photoURL || null,
          createdAt,
          role: "customer", // Default role
          ...additionalData,
        });
      } catch (error) {
        console.error("Error creating user document", error);
      }
    }
  };

  // 1. Sign up with Email & Password
  const signup = async (email, password, fullName) => {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // Update Auth Profile immediately
    await updateProfile(user, { displayName: fullName });

    // Create Firestore Document
    await createUserDocument(user, { fullName });

    return user;
  };

  // 2. Login with Email & Password
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // 3. Login with Google (POPUP METHOD)
  // Much more reliable than Redirect for SPAs, avoids page reload loops.
  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });

    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // Create Firestore Document if it doesn't exist
    await createUserDocument(user);

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

  // 6. Update Profile Wrapper
  const updateUserProfile = async (user, profileData) => {
    if (!user) return;
    await updateProfile(user, profileData);
    // Force a re-render/update if needed by spreading state (optional in this flow)
    setCurrentUser({ ...user, ...profileData });
  };

  // 7. GLOBAL AUTH OBSERVER
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
    updateUserProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
