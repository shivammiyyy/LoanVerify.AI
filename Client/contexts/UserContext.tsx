"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import api from "@/libs/apiClient";

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
  backendUser: BackendUser | null;
  loading: boolean;
  refreshUser: () => Promise<void>;
  logout: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [backendUser, setBackendUser] = useState<BackendUser | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch backend user by sending session-authenticated GET /me
  const fetchBackendUser = async () => {
    try {
      setLoading(true);
      const res = await api.get<{ user: BackendUser }>("/me");
      setBackendUser(res.data.user);
    } catch {
      setBackendUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Used to re-sync user state (fetches the user from session/cookie)
  const refreshUser = async () => {
    await fetchBackendUser();
  };

  // Run once on mount to try to fetch user if session cookie exists
  useEffect(() => {
    fetchBackendUser();
  }, []);

  // Called to log out (invalidate backend session/cookie)
  const logout = async () => {
    setLoading(true);
    try {
      await api.post("/logout");
    } catch {
      // ignore backend logout error
    }
    setBackendUser(null);
    setLoading(false);
  };

  return (
    <UserContext.Provider
      value={{ backendUser, loading, refreshUser, logout }}
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
