import { type User as PrivyUser } from "@privy-io/react-auth";

import { AuthenticateUserResponse } from "#~/schema/user.ts";

declare global {
    type tAuthenticatedUser = PrivyUser & {
        backendUserData: AuthenticateUserResponse;
    };

    type AuthenticationState = {
        isAuthenticated: boolean;
        isLoading: boolean;
        token: string | null;
        user: tAuthenticatedUser | null;

        logout: () => void;
        setIsLoading: (isLoading: boolean) => void;
        setToken: (token: string) => void;
        setUser: (user: tAuthenticatedUser | null) => void;
    };
}

export {};
