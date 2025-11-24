import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: null,
  access: null,
  refresh: null,

  login: (user, access, refresh) => set({ user, access, refresh }),

  logout: () => set({ user: null, access: null, refresh: null }),
}));
