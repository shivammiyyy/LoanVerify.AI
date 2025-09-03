"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import api from "@/libs/apiClient";
import { User } from "@/types";



type AuthContextType = {
  user: User | null;
  loading: boolean;
  refreshUser: () => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: false,
  refreshUser: async () => {},
  logout: async () => {},
});

function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch user from backend session (/me endpoint)
  const fetchUser = async () => {
    setLoading(true);
    try {
      const res = await api.get<{ user: User }>("/me");
      setUser(res.data.user);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Refresh user info (call after login or to reload user)
  const refreshUser = async () => {
    await fetchUser();
  };

  useEffect(() => {
    // On mount, try to fetch user session
    fetchUser();
  }, []);

  // Logout function to clear session on backend and frontend state
  const logout = async () => {
    setLoading(true);
    try {
      await api.post("/logout");
    } catch {
      // ignore errors on logout
    }
    setUser(null);
    setLoading(false);
  };

  return (
    <AuthContext.Provider value={{ user, loading, refreshUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default UserProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
