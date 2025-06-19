import { EMAIL } from "@/assets/icons";
import { DrawerTitle } from "@/components/ui/drawer";

import { useAuthenticationDrawerNavigationStore } from "../store";

export function AuthenticationDrawerHeader() {
    const currentScreen = useAuthenticationDrawerNavigationStore((state) => state.screen);

    switch (currentScreen) {
        case "default":
            return <DrawerTitle className="text-center font-normal">Log in or sign up</DrawerTitle>;

        case "email":
            return (
                <DrawerTitle className="text-center font-normal">
                    Log in or sign up with email
                </DrawerTitle>
            );

        case "farcaster":
            return;

        case "finish":
            return <DrawerTitle className="text-center font-normal">Finish setup</DrawerTitle>;

        case "otp":
            return (
                <DrawerTitle className="flex items-center justify-center">
                    <i className="size-10 text-black">{EMAIL()}</i>
                </DrawerTitle>
            );

        case "wallet":
            return;
    }
}
