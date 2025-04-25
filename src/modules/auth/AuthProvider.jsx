import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from '../../firebase';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  onAuthStateChanged
} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import * as Sentry from '@sentry/browser';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  // Clear auth errors when not needed
  const clearAuthError = () => setAuthError(null);

  async function signup(email, password, profileData) {
    clearAuthError();
    try {
      console.log("Creating user account with email:", email);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("User account created successfully, setting up profile");
      
      // Add default Mobile Legends-related fields
      const enhancedProfile = {
        ...profileData,
        createdAt: new Date().toISOString(),
        favoriteHeroes: [],
        rank: "Unranked",
        wins: 0,
        losses: 0,
        level: 1
      };
      
      await setDoc(doc(db, "users", userCredential.user.uid), enhancedProfile);
      console.log("User profile created successfully");
      return userCredential;
    } catch (error) {
      console.error("Signup error:", error);
      Sentry.captureException(error);
      setAuthError(error.message);
      throw error;
    }
  }

  async function login(email, password) {
    clearAuthError();
    try {
      console.log("Attempting login for user:", email);
      const result = await signInWithEmailAndPassword(auth, email, password);
      console.log("Login successful");
      return result;
    } catch (error) {
      console.error("Login error:", error);
      Sentry.captureException(error);
      setAuthError(error.message);
      throw error;
    }
  }

  async function logout() {
    clearAuthError();
    try {
      console.log("Logging out user");
      return await signOut(auth);
    } catch (error) {
      console.error("Logout error:", error);
      Sentry.captureException(error);
      setAuthError(error.message);
      throw error;
    }
  }

  async function resetPassword(email) {
    clearAuthError();
    try {
      console.log("Sending password reset email to:", email);
      return await sendPasswordResetEmail(auth, email);
    } catch (error) {
      console.error("Reset password error:", error);
      Sentry.captureException(error);
      setAuthError(error.message);
      throw error;
    }
  }

  async function fetchUserProfile(uid) {
    try {
      console.log("Fetching user profile for:", uid);
      const userDoc = await getDoc(doc(db, "users", uid));
      if (userDoc.exists()) {
        console.log("User profile found");
        return userDoc.data();
      }
      console.log("No user profile found");
      return null;
    } catch (error) {
      console.error("Error fetching user profile:", error);
      Sentry.captureException(error);
      return null;
    }
  }

  async function updateUserProfile(data) {
    try {
      if (!currentUser) {
        throw new Error("No authenticated user");
      }
      
      console.log("Updating profile for user:", currentUser.uid);
      await updateDoc(doc(db, "users", currentUser.uid), data);
      
      // Update local state
      const updatedProfile = await fetchUserProfile(currentUser.uid);
      setUserProfile(updatedProfile);
      
      return true;
    } catch (error) {
      console.error("Error updating profile:", error);
      Sentry.captureException(error);
      throw error;
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log("Auth state changed:", user ? "User logged in" : "User logged out");
      setCurrentUser(user);
      
      if (user) {
        try {
          const profile = await fetchUserProfile(user.uid);
          setUserProfile(profile);
        } catch (error) {
          console.error("Error in auth state change:", error);
          Sentry.captureException(error);
        }
      } else {
        setUserProfile(null);
      }
      
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userProfile,
    loading,
    authError,
    signup,
    login,
    logout,
    resetPassword,
    fetchUserProfile,
    updateUserProfile,
    clearAuthError
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}