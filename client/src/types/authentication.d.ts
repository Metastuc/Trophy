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
        };
    }

    type tAuthenticatedUser = PrivyUser & {
        backendUserData: iBackendUser;
    };

    type tAuthenticatedState = {
        isAuthenticated: boolean;
        isLoading: boolean;
        logout: () => void;
        setIsLoading: (isLoading: boolean) => void;
        setUser: (user: tAuthenticatedUser | null) => void;
        user: tAuthenticatedUser | null;
    };
}

export {};
