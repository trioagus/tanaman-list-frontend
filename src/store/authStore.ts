import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { register, login, logout } from "../api/auth";

interface User {
  id?: string;
  username: string;
  password: string;
  role?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  isLoggedIn: boolean;
  login: (user: User) => Promise<void>;
  logout: () => Promise<void>;
  register: (user: User) => Promise<void>;
}

export const useAuth = () => {
  return useAuthStore((state) => state);
};

export const useAuthStore = create<AuthState>()(
  persist<AuthState>(
    (set) => ({
      user: null as User | null,
      token: null as string | null,
      loading: false as boolean,
      error: null as string | null,
      isLoggedIn: false,
      login: async (user) => {
        set({ loading: true });
        try {
          const response = await login(user);
          const { user: loggedInUser, token } = response.data;
          set({
            user: loggedInUser,
            token,
            loading: false,
            isLoggedIn: true,
          });
        } catch (error) {
          set({ error: String(error), loading: false });
        }
      },
      logout: async () => {
        set({ loading: true });
        try {
          await logout();
          set({ user: null, token: null, loading: false, isLoggedIn: false });
        } catch (error) {
          set({ error: String(error), loading: false });
        }
      },
      register: async (user) => {
        set({ loading: true });
        try {
          const response = await register(user);
          const { user: registeredUser, token } = response.data;
          set({
            user: registeredUser,
            token,
            loading: false,
            isLoggedIn: true,
          });
        } catch (error) {
          set({ error: String(error), loading: false });
        }
      },
    }),
    {
      name: "auth",
      storage: createJSONStorage(() => {
        if (typeof window !== "undefined") {
          return sessionStorage;
        }
        return sessionStorage;
      }),
    }
  )
);
