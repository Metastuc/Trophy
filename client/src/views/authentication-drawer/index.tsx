import { usePrivy } from "@privy-io/react-auth";
import { Loader } from "lucide-react";
import React from "react";
import { useShallow } from "zustand/shallow";

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
    const showPrivyLogo = currentScreen === "default" || currentScreen === "email" || currentScreen === "otp";

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

    const formContainerRef = React.useRef<HTMLDivElement | null>(null);

    React.useEffect(() => {
        const handleResize = () => {
            if (formContainerRef.current) {
                formContainerRef.current.style.setProperty("bottom", `env(safe-area-inset-bottom)`);
            }
        };

        if (window.visualViewport) {
            window.visualViewport.addEventListener("resize", handleResize);
            handleResize();
        }

        return () => {
            if (window.visualViewport) {
                window.visualViewport.removeEventListener("resize", handleResize);
            }
        };
    }, []);

    return (
        <Drawer
            dismissible={false}
            open={isOpen}
            onOpenChange={(isDrawerOpen) => (isDrawerOpen ? openDrawer() : closeDrawer())}
        >
            <Button className="bg-blue100 h-6 w-15 rounded-xs" onClick={handleAuthentication} disabled={isLoggingOut}>
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

            <DrawerContent ref={formContainerRef}>
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
                            <img src="/privy.svg" alt="protected-by-privy" />
                        </a>
                    </i>
                ) : null}
            </DrawerContent>
        </Drawer>
    );
}
