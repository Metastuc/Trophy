import { usePrivy } from "@privy-io/react-auth";
import { Loader } from "lucide-react";
import React from "react";
import { useShallow } from "zustand/shallow";

import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerHeader } from "@/components/ui/drawer";
import { useAuthenticationStore } from "@/store/authentication";

import { AuthenticationDrawerFooter } from "./components/footer";
import { AuthenticationDrawerHeader } from "./components/header";
import { useAuthenticationDrawerStateStore } from "./store";

export function AuthenticationDrawer() {
    const { logout } = usePrivy();

    const { closeDrawer, isOpen, openDrawer } = useAuthenticationDrawerStateStore(
        useShallow((state) => ({
            closeDrawer: state.closeDrawer,
            isOpen: state.isOpen,
            openDrawer: state.openDrawer,
        })),
    );

    const isAuthenticated = useAuthenticationStore((state) => state.isAuthenticated);
    const [isLoggingOut, setIsLoggingOut] = React.useState<boolean>(false);

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

                <DrawerHeader>
                    <AuthenticationDrawerHeader />
                </DrawerHeader>
            </DrawerContent>
        </Drawer>
    );
}
