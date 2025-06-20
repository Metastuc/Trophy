import { useAuthenticationDrawerNavigationStore } from "../store";
import { AuthenticationDefaultScreen } from "./default";
import { AuthenticateWithEmail } from "./email";
import { CompleteProfile } from "./form";
import { ValidateOTP } from "./otp";

export function AuthenticationDrawerBody() {
    const currentScreen = useAuthenticationDrawerNavigationStore((state) => state.screen);

    switch (currentScreen) {
        case "default":
            return <AuthenticationDefaultScreen />;

        case "email":
            return <AuthenticateWithEmail />;

        case "farcaster":
            return;

        case "finish":
            return <CompleteProfile />;

        case "otp":
            return <ValidateOTP />;

        case "wallet":
            return;
    }
}
