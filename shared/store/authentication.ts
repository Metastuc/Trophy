import { create, StoreApi, UseBoundStore } from "zustand";

import { queryClient } from "@/lib/constants";

export const useAuthenticationStore: UseBoundStore<StoreApi<AuthenticationState>> = create<AuthenticationState>()(
    (set) => ({
        isAuthenticated: false,

        isLoading: true,

        token: null,

        user: null,

        logout() {
            set({ isAuthenticated: false, isLoading: false, token: null, user: null });
            queryClient.clear();
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
