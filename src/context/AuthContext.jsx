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
  deleteUser,
} from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, setDoc, getDoc, deleteDoc, updateDoc } from "firebase/firestore";

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
          role: "customer",
          ...additionalData,
        });
      } catch (error) {
        console.error("Error creating user document", error);
      }
    }
  };

  // 1. Sign up with Email & Password
  const signup = async (email, password, fullName, phone) => {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // Update Auth Profile immediately
    await updateProfile(user, { displayName: fullName });

    // Create Firestore Document
    await createUserDocument(user, { fullName, phone });

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

  // 6b. Update User Document (Firestore)
  const updateUserDocument = async (userId, data) => {
    try {
      const userRef = doc(db, "users", userId);
      // Use setDoc with merge: true to ensure it works even if doc is missing
      await setDoc(userRef, data, { merge: true });

      // Update local state to reflect changes immediately
      setCurrentUser((prev) => ({ ...prev, ...data }));
    } catch (error) {
      console.error("Error updating user document:", error);
      throw error;
    }
  };

  // 7. Delete Account
  const deleteAccount = async () => {
    if (!currentUser) return;

    try {
      // 1. Delete Firestore Document
      await deleteDoc(doc(db, "users", currentUser.uid));

      // 2. Delete Auth User
      await deleteUser(currentUser);

      setCurrentUser(null);
    } catch (error) {
      console.error("Error deleting account:", error);
      throw error;
    }
  };

  // 7. GLOBAL AUTH OBSERVER
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          // Fetch user data from Firestore
          const userRef = doc(db, "users", user.uid);
          const userSnap = await getDoc(userRef);

          if (userSnap.exists()) {
            setCurrentUser({ ...user, ...userSnap.data() });
          } else {
            console.log("No user document found, creating one...");
            // Create user document for legacy/google users who might lack one
            await createUserDocument(user);

            // Refetch to ensure we have the clean data source of truth
            const newUserSnap = await getDoc(userRef);
            if (newUserSnap.exists()) {
              setCurrentUser({ ...user, ...newUserSnap.data() });
            } else {
              // Fallback if even creation failed (unlikely)
              setCurrentUser(user);
            }
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          setCurrentUser(user);
        }
      } else {
        setCurrentUser(null);
      }
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
    updateUserDocument,
    deleteAccount,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
