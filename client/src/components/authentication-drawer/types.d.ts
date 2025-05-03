type tAuthOption = "default" | "email" | "farcaster" | "wallet";

type tAuthState = {
    authOption: tAuthOption;
};

type tAction =
    | { type: "SELECT_DEFAULT" }
    | { type: "SELECT_EMAIL" }
    | { type: "SELECT_FARCASTER" }
    | { type: "SELECT_WALLET" };

interface iAuthenticationButton {
    action: {
        type: "SELECT_DEFAULT" | "SELECT_EMAIL" | "SELECT_FARCASTER" | "SELECT_WALLET";
    };
    label: string;
    icon: () => React.ReactNode;
}
