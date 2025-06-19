import { create, StoreApi, UseBoundStore } from "zustand";

export const useAuthenticationStore: UseBoundStore<StoreApi<tAuthenticatedState>> =
    create<tAuthenticatedState>()((set) => ({
        isAuthenticated: false,

        isLoading: false,

        logout() {
            set({ isAuthenticated: false, isLoading: false, user: null });
        },

        setIsLoading(isLoading) {
            set({ isLoading });
        },

        setUser(user) {
            set({ isAuthenticated: true, isLoading: false, user });
        },

        user: null,
    }));
