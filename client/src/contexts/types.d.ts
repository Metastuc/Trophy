interface iAuthenticationContext {
    isAuthenticated: boolean;
    login: (user: string) => void;
    logout: () => void;
    user: string;
}
