import { Loader } from "lucide-react";

import { PRIVY } from "@/assets/icons";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerHeader } from "@/components/ui/drawer";
import { useAuthenticationContext } from "@/contexts/authentication";
import { cn } from "@/lib/utils";

import { AuthenticationDrawerBody } from "./components/body";
import { AuthenticationDrawerDescription } from "./components/description";
import { AuthenticationDrawerFooter } from "./components/footer";
import { AuthenticationDrawerHeader } from "./components/header";
import { useAuthenticationDrawerContext } from "./context";

export default function Component() {
    const { isAuthenticated, logout } = useAuthenticationContext();
    const { setDrawerState, drawerState } = useAuthenticationDrawerContext();

    async function handleAuthentication() {
        if (isAuthenticated) {
            setDrawerState((previous) => ({ ...previous, isLoggingOut: true }));

            try {
                await logout();
            } catch (error) {
                console.error("Logout error:", error);
            } finally {
                setDrawerState((previous) => ({ ...previous, isLoggingOut: false }));
            }
        } else {
            setDrawerState((previous) => ({ ...previous, isDrawerOpen: true }));
        }
    }

    return (
        <Drawer
            dismissible={false}
            open={drawerState.isDrawerOpen}
            onOpenChange={(isOpen) =>
                setDrawerState((previous) => ({ ...previous, isDrawerOpen: isOpen }))
            }
        >
            <Button
                className={cn("bg-blue100 h-6 w-15 rounded-[.125rem]")}
                onClick={handleAuthentication}
                disabled={drawerState.isLoggingOut}
            >
                <span className="text-xs">
                    {drawerState.isLoggingOut ? (
                        <i className="size-4">
                            <Loader className="animate-spin" />
                        </i>
                    ) : isAuthenticated ? (
                        "Log out"
                    ) : (
                        "Log in"
                    )}
                </span>
            </Button>

            <DrawerContent>
                <AuthenticationDrawerFooter />

                <DrawerHeader>
                    <AuthenticationDrawerHeader />
                    <AuthenticationDrawerDescription />
                </DrawerHeader>

                <section className="flex flex-col gap-5 p-4">
                    <AuthenticationDrawerBody />
                </section>

                <i className="my-4">
                    <a href="https://privy.io/" target="_blank">
                        {PRIVY()}
                    </a>
                </i>
            </DrawerContent>
        </Drawer>
    );
}
