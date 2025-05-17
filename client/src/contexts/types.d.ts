interface iAuthenticationContext {
    isAuthenticated: boolean;
    logout: () => Promise<void>;
    user: User | null;
}
