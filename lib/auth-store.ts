import { create } from "zustand";

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
  hydrate: () => void;
}

const setAuthCookie = (token: string) => {
  if (typeof window !== "undefined") {
    document.cookie = `auth_token=${token}; path=/; max-age=86400; SameSite=Strict`;
  }
};

const clearAuthCookie = () => {
  if (typeof window !== "undefined") {
    document.cookie = "auth_token=; path=/; max-age=0";
  }
};

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  isAuthenticated: false,
  login: (token: string) => {
    localStorage.setItem("auth_token", token);
    setAuthCookie(token);
    set({ token, isAuthenticated: true });
  },
  logout: () => {
    localStorage.removeItem("auth_token");
    clearAuthCookie();
    set({ token: null, isAuthenticated: false });
  },
  hydrate: () => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      setAuthCookie(token);
      set({ token, isAuthenticated: true });
    }
  },
}));
