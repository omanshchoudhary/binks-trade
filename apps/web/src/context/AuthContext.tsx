import { useCallback, useEffect, useState, type ReactNode } from "react";
import type { User } from "@binks/types";
import { api } from "../lib/api";
import { AuthContext, type AuthContextValue } from "./auth";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    try {
      setUser(await api.get<User>("/auth/me"));
    } catch {
      setUser(null);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;

    void (async () => {
      try {
        const me = await api.get<User>("/auth/me");
        if (!cancelled) setUser(me);
      } catch {
        if (!cancelled) setUser(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const login = useCallback<AuthContextValue["login"]>(
    async (email, password) => {
      setUser(await api.post<User>("/auth/login", { email, password }));
    },
    [],
  );

  const signup = useCallback<AuthContextValue["signup"]>(async (data) => {
    setUser(await api.post<User>("/auth/signup", data));
  }, []);

  const logout = useCallback<AuthContextValue["logout"]>(async () => {
    await api.post<void>("/auth/logout");
    setUser(null);
  }, []);

  const value = { user, loading, login, signup, logout, refresh };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
