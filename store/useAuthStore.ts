"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

type Role = "developer" | "manager";

interface AuthState {
  user: { username: string; role: Role } | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

const users = {
  SayanManager: { password: "manager123", role: "manager" },
  SayanDev: { password: "devpass", role: "developer" },
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      login: (username, password) => {
        const found = users[username as keyof typeof users];
        if (found && found.password === password) {
          set({ user: { username, role: found.role as Role } });
          return true;
        }
        return false;
      },
      logout: () => set({ user: null }),
    }),
    {
      name: "auth-storage",
    }
  )
);
