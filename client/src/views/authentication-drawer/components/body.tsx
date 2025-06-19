import { useAuthenticationDrawerNavigationStore } from "../store";
import { AuthenticationDefaultScreen } from "./default";

export function AuthenticationDrawerBody() {
    const currentScreen = useAuthenticationDrawerNavigationStore((state) => state.screen);

    switch (currentScreen) {
        case "default":
            return <AuthenticationDefaultScreen />;

        case "email":
            return;

        case "farcaster":
            return;

        case "finish":
            return;

        case "otp":
            return;

        case "wallet":
            return;
    }
}
