import { createRouter, RouterProvider } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { useShallow } from "zustand/shallow";

import { useAuthenticationStore } from "#~/store/authentication.ts";

import { LoadingScreen } from "./components/loading-screen.tsx";
import { useRunningInBrowser } from "./hooks/running-in-browser-init.ts";
import { queryClient } from "./lib/constants.ts";
import { routeTree } from "./routeTree.gen.ts";

const router = createRouter({
    routeTree,
    context: {
        queryClient,
        authenticationStore: undefined,
    },
    defaultPendingComponent() {
        return <LoadingScreen isPending />;
    },
    scrollRestoration: true,
    getScrollRestorationKey(location) {
        const paths = ["/"];
        return paths.includes(location.pathname) ? location.pathname : (location.state.key as string);
    },
});

declare module "@tanstack/react-router" {
    interface Register {
        router: typeof router;
    }
}

export function App() {
    useRunningInBrowser();

    const authenticationStore = useAuthenticationStore(useShallow((state) => state));
    if (authenticationStore.isLoading) return <LoadingScreen />;

    return (
        <AnimatePresence mode="wait">
            <motion.section
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.25 }}
                className="relative min-h-dvh"
            >
                <RouterProvider router={router} context={{ authenticationStore }} />
            </motion.section>
        </AnimatePresence>
    );
}
