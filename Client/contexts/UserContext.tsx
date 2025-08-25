"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../firebase"; 
import apiClient from "@/libs/apiClient"; // your axios instance

// Types
interface BackendUser {
  id: string;
  phone: string;
  name?: string;
  role?: string;
}

interface UserContextType {
  firebaseUser: User | null;
  backendUser: BackendUser | null;
  loading: boolean;
  refreshUser: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [firebaseUser, setFirebaseUser] = useState<User | null>(null);
  const [backendUser, setBackendUser] = useState<BackendUser | null>(null);
  const [loading, setLoading] = useState(true);

  // 🔹 fetch backend user
  const fetchBackendUser = async (token: string) => {
    try {
      const res = await apiClient.get("/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBackendUser(res.data.user);
    } catch (err) {
      console.error("Failed to fetch backend user:", err);
      setBackendUser(null);
    }
  };

  // 🔹 refresh user manually
  const refreshUser = async () => {
    if (!firebaseUser) return;
    const token = await firebaseUser.getIdToken();
    await fetchBackendUser(token);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
      setFirebaseUser(fbUser);
      if (fbUser) {
        const token = await fbUser.getIdToken();
        await fetchBackendUser(token);
      } else {
        setBackendUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <UserContext.Provider value={{ firebaseUser, backendUser, loading, refreshUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
