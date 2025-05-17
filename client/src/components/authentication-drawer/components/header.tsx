import { EMAIL } from "@/assets/icons";
import { DrawerTitle } from "@/components/ui/drawer";

import { useAuthenticationDrawerContext } from "../context";

export function AuthenticationDrawerHeader() {
    const { state } = useAuthenticationDrawerContext();

    switch (state.type) {
        case "default":
            return <DrawerTitle className="text-center font-normal">Log in or sign up</DrawerTitle>;

        case "email":
            return (
                <DrawerTitle className="text-center font-normal">
                    Log in or sign up with email
                </DrawerTitle>
            );

        case "farcaster":

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
