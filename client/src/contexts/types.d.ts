interface iAuthenticationContext {
    isAuthenticated: boolean;
    logout: () => void;
    user: User | null;
}
