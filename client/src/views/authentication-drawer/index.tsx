import { usePrivy } from "@privy-io/react-auth";
import { Loader } from "lucide-react";
import React from "react";
import { useShallow } from "zustand/shallow";

import { PRIVY } from "@/assets/icons";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerHeader } from "@/components/ui/drawer";
import { useAuthenticationStore } from "@/store/authentication";

import { AuthenticationDrawerBody } from "./components/body";
import { AuthenticationDrawerDescription } from "./components/description";
import { AuthenticationDrawerFooter } from "./components/footer";
import { AuthenticationDrawerHeader } from "./components/header";
import { usePrivyLoginTrigger } from "./hooks";
import { useAuthenticationDrawerNavigationStore, useAuthenticationDrawerStateStore } from "./store";

export function AuthenticationDrawer() {
    const { logout } = usePrivy();
    usePrivyLoginTrigger();

    const { closeDrawer, isOpen, openDrawer } = useAuthenticationDrawerStateStore(
        useShallow((state) => ({
            closeDrawer: state.closeDrawer,
            isOpen: state.isOpen,
            openDrawer: state.openDrawer,
        })),
    );

    const isAuthenticated = useAuthenticationStore((state) => state.isAuthenticated);
    const [isLoggingOut, setIsLoggingOut] = React.useState<boolean>(false);

    const currentScreen = useAuthenticationDrawerNavigationStore((state) => state.screen);
    const showPrivyLogo =
        currentScreen === "default" || currentScreen === "email" || currentScreen === "otp";

    function handleAuthentication() {
        if (isAuthenticated) {
            setIsLoggingOut(true);
            logout()
                .then(() => {
                    closeDrawer();
                    useAuthenticationStore.getState().logout();
                })
                .catch((error) => console.error("Logout error:", error))
                .finally(() => setIsLoggingOut(false));
        } else {
            openDrawer();
        }
    }

    return (
        <Drawer
            dismissible={false}
            open={isOpen}
            onOpenChange={(isDrawerOpen) => (isDrawerOpen ? openDrawer() : closeDrawer())}
        >
            <Button
                className="bg-blue100 h-6 w-15 rounded-[.125rem]"
                onClick={handleAuthentication}
                disabled={isLoggingOut}
            >
                {isLoggingOut ? (
                    <i className="size-4">
                        <Loader className="animate-spin" />
                    </i>
                ) : isAuthenticated ? (
                    <span className="text-xs capitalize">log out</span>
                ) : (
                    <span className="text-xs capitalize">log in</span>
                )}
            </Button>

            <DrawerContent>
                <AuthenticationDrawerFooter />

                {/* <button onClick={() => logout()}>logout</button> */}

                <DrawerHeader>
                    <AuthenticationDrawerHeader />
                    <AuthenticationDrawerDescription />
                </DrawerHeader>

                <section className="flex flex-col gap-5 p-4">
                    <AuthenticationDrawerBody />
                </section>

                {showPrivyLogo ? (
                    <i className="my-4">
                        <a href="https://privy.io/" target="_blank">
                            {PRIVY()}
                        </a>
                    </i>
                ) : null}
            </DrawerContent>
        </Drawer>
    );
}
