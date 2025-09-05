import { usePrivy } from "@privy-io/react-auth";
import { Loader } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useShallow } from "zustand/shallow";

import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerHeader } from "@/components/ui/drawer";
import { useAuthenticationStore } from "#~/store/authentication.ts";

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
    const [isLoggingOut, setIsLoggingOut] = useState<boolean>(false);

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

    return (
        <Drawer
            dismissible={false}
            open={isOpen}
            onOpenChange={(isDrawerOpen) => (isDrawerOpen ? openDrawer() : closeDrawer())}
            repositionInputs={false}
        >
            <Button className="bg-blue100 h-6 w-15 rounded-xs" onClick={handleAuthentication} disabled={isLoggingOut}>
                <AnimatePresence mode="wait" initial={false}>
                    {isLoggingOut ? (
                        <motion.i
                            key="loading"
                            className="size-4"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.2 }}
                        >
                            <Loader className="animate-spin" />
                        </motion.i>
                    ) : isAuthenticated ? (
                        <motion.span
                            key="logout"
                            className="text-xs capitalize"
                            initial={{ opacity: 0, y: 4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -4 }}
                            transition={{ duration: 0.2 }}
                        >
                            log out
                        </motion.span>
                    ) : (
                        <motion.span
                            key="login"
                            className="text-xs capitalize"
                            initial={{ opacity: 0, y: 4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -4 }}
                            transition={{ duration: 0.2 }}
                        >
                            log in
                        </motion.span>
                    )}
                </AnimatePresence>
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
                            <img src="/privy.svg" alt="protected-by-privy" />
                        </a>
                    </i>
                ) : null}
            </DrawerContent>
        </Drawer>
    );
}
