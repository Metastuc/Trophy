import { getAccessToken, User, useWallets } from "@privy-io/react-auth";
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
            queryClient.removeQueries({ queryKey: ["user"] });
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
            set({ token: (await getAccessToken()) as string });

            const { wallets } = useWallets();
            const response = await authenticateUser();

            if (response) {
                set({
                    user: {
                        ...privyUser,
                        backendUserData: response.data,
                        provider: await wallets[0].getEthereumProvider(),
                    },
                });
            }
        },
    }),
);
