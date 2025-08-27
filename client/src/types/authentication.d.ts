import { type User as PrivyUser } from "@privy-io/react-auth";

declare global {
    interface iBackendUser {
        isBasicProfileComplete: boolean;
        user: {
            bio: string;
            email: string;
            privyId: string;
            profilePicture: string;
            username: string;
            creatorToken: string;
        };
    }

    type tAuthenticatedUser = PrivyUser & {
        backendUserData: iBackendUser;
    };

    type tAuthenticatedState = {
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
