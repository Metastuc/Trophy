type tAuthenticatedUser = {
    id: string;
};

type tAuthenticatedState = {
    isAuthenticated: boolean;
    isLoading: boolean;
    logout: () => void;
    setIsLoading: (isLoading: boolean) => void;
    setUser: (user: tAuthenticatedUser | null) => void;
    user: tAuthenticatedUser | null;
};
