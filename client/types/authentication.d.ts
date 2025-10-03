import { type User as PrivyUser } from "@privy-io/react-auth";

declare global {
    type AuthenticatedUser = PrivyUser & {
        backendUserData: AuthenticateUserResponse["data"];
    };

    type AuthenticationState = {
        isAuthenticated: boolean;
        isLoading: boolean;
        token: string | null;
        user: AuthenticatedUser | null;

        logout: () => void;
        refreshAuthenticatedUser: (privyUser: PrivyUser) => Promise<void>;
        setIsLoading: (isLoading: boolean) => void;
        setToken: (token: string | null) => void;
        setUser: (user: AuthenticatedUser | null) => void;
    };
}
export {};
