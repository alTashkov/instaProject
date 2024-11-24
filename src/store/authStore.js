import { create } from "zustand";
const useAuthStore = create((set) => ({
    user: null, // Initialize as null
    login: (user) => {
        localStorage.setItem("user-info", JSON.stringify(user)); // Sync localStorage
        set({ user });
    },
    logout: () => {
        localStorage.removeItem("user-info"); // Remove user info from localStorage
        set({ user: null });
    },
    setUser: (user) => {
        set({ user });
    },
    initializeUser: () => {
        const storedUser = localStorage.getItem("user-info");
        if (storedUser) {
            set({ user: JSON.parse(storedUser) });
        }
    },
}));

export default useAuthStore;
  