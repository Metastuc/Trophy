import { getAccessToken, User } from "@privy-io/react-auth";
import { create, StoreApi, UseBoundStore } from "zustand";

import { authenticateUser } from "@/api/authenticate-user";
import { queryClient } from "@/lib/constants";

export const useAuthenticationStore: UseBoundStore<StoreApi<AuthenticationState>> = create<AuthenticationState>()(
    (set) => ({
        isAuthenticated: false,

        isLoading: true,

        token: null,

        user: null,

        logout() {
            set({ isAuthenticated: false, isLoading: false, token: null, user: null });
            queryClient.removeQueries({ queryKey: ["get-my-profile"] });
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

        async refreshAuthenticatedUser(privyUser: User) {
            const accessToken = await getAccessToken();
            set({ token: accessToken as string });

            const response = await authenticateUser();
            if (response) {
                set({
                    user: {
                        ...privyUser,
                        backendUserData: response.data,
                    },
                });
            }
        },
    }),
);
