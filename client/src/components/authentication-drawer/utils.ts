export function AuthenticationReducer(state: tAuthState, action: tAction): tAuthState {
    switch (action.type) {
        case "SELECT_DEFAULT":
            return { authOption: "default" };

        case "SELECT_EMAIL":
            return { authOption: "email" };

        case "SELECT_FARCASTER":
            return { authOption: "farcaster" };

        case "SELECT_WALLET":
            return { authOption: "wallet" };

        default:
            return state;
    }
}
