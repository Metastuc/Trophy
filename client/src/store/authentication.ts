import { create, StoreApi, UseBoundStore } from "zustand";

export const useAuthenticationStore: UseBoundStore<StoreApi<tAuthenticatedState>> = create<tAuthenticatedState>()(
    (set) => ({
        isAuthenticated: false,

        isLoading: true,

        token: null,

        user: null,

        logout() {
            set({ isAuthenticated: false, isLoading: false, token: null, user: null });
        },

        setIsLoading(isLoading) {
            set({ isLoading });
        },

        setToken(token) {
            set({ token });
        },

        setUser(user) {
            set({ isAuthenticated: true, isLoading: false, user });
        },
    }),
);
