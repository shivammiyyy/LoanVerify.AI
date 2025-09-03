"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { onAuthStateChanged, User as FirebaseUser } from "firebase/auth";
import { auth } from "@/firebase";
import api, { sessionLogin } from "@/libs/apiClient";

// --- Backend user shape, adjust fields as needed to match your backend /me
export interface BackendUser {
  id: string;
  phone: string;
  name?: string;
  role?: string;
  // Add more fields here if returned by backend /me
}

// What our global context exposes:
interface UserContextType {
  firebaseUser: FirebaseUser | null;
  backendUser: BackendUser | null;
  loading: boolean;
  refreshUser: () => Promise<void>;
  logout: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [backendUser, setBackendUser] = useState<BackendUser | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch backend user by sending session-authenticated GET /me
  const fetchBackendUser = async () => {
    try {
      const res = await api.get<{ user: BackendUser }>("/me");
      setBackendUser(res.data.user);
    } catch (error) {
      console.error("Error fetching backend user:", error);
      setBackendUser(null);
    }
  };

  // Used to re-sync entire user state
  const refreshUser = async () => {
    if (!auth.currentUser) {
      setFirebaseUser(null);
      setBackendUser(null);
      setLoading(false);
      return;
    }
    setLoading(true);
    setFirebaseUser(auth.currentUser);
    await fetchBackendUser();
    setLoading(false);
  };

  // When firebase auth changes:
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
      setLoading(true);
      setFirebaseUser(fbUser);

      if (fbUser) {
        // Always re-start backend session if a fresh sign-in happened
        const idToken = await fbUser.getIdToken();
        try {
          // Sends idToken to backend /sessionLogin (starts session, cookie, etc)
          await sessionLogin(idToken);
        } catch (err) {
          console.error("Error fetching backend user:", err);
          // Optionally: handle backend errors here (session expired or backend down)
        }
        await fetchBackendUser();
      } else {
        setBackendUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Called to log out both frontend and backend session
  const logout = async () => {
    await auth.signOut();
    setFirebaseUser(null);
    setBackendUser(null);
    setLoading(false);
    // Optionally: call backend "/logout" endpoint to destroy session/cookie if needed
  };

  return (
    <UserContext.Provider
      value={{ firebaseUser, backendUser, loading, refreshUser, logout }}
    >
      {children}
    </UserContext.Provider>
  );
};

// Hook for use in components
export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
