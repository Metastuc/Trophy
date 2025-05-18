import { DrawerDescription } from "@/components/ui/drawer";

import { useAuthenticationDrawerContext } from "../context";

export function AuthenticationDrawerDescription() {
    const { state } = useAuthenticationDrawerContext();

    switch (state.type) {
        case "default":
            return (
                <DrawerDescription className="text-black200 mt-7.5 text-center font-light">
                    welcome to <span className="text-black100 font-normal">trophy</span>. Continue
                    with <span className="text-black100 font-normal">farcaster</span>, your{" "}
                    <span className="text-black100 font-normal">wallet</span> or sign up with your{" "}
                    <span className="text-black100 font-normal">email</span>
                </DrawerDescription>
            );

        case "email":
            return;

        case "farcaster":
            return;

        case "finish":
            return (
                <DrawerDescription className="text-black200 mx-auto w-[17.5rem] text-center text-xs font-light">
                    Your account has been created successfully, please enter the details below to
                    finish setup
                </DrawerDescription>
            );

        case "otp":
            return (
                <DrawerDescription className="text-black200 text-center font-light">
                    Please check <span className="text-black100 font-normal">{state.email}</span>{" "}
                    for an email from <span className="text-black100 font-normal">privy.io</span>{" "}
                    and enter your code below.
                </DrawerDescription>
            );

        case "wallet":
            return;
    }
}
