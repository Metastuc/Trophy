import "./index.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRouter, Link, RouterProvider } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "sonner";
import { useShallow } from "zustand/shallow";

import { LoadingScreen } from "./components/layouts/loading.tsx";
import { AppContextProviders } from "./contexts/index.tsx";
import { routeTree } from "./routeTree.gen.ts";
import { useAuthenticationStore } from "./store/authentication.ts";

const queryClient = new QueryClient();
const router = createRouter({
    routeTree,
    context: {
        queryClient,
        authenticationStore: undefined,
    },
    defaultErrorComponent() {
        return (
            <div>
                <p>An error has occured!</p>
                <Link to="/">Go home</Link>
            </div>
        );
    },
    defaultPendingComponent() {
        return <LoadingScreen />;
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

function App() {
    const authenticationStore = useAuthenticationStore(useShallow((state) => state));

    // this is a hack to make the app work on faracster android mini app
    useEffect(function () {
        try {
            // @ts-expect-error navigator.__defineGetter__ is not defined in the TypeScript type definitions
            const os = navigator?.userAgentData?.platform;

            if (os !== "android") {
                // @ts-expect-error navigator.__defineGetter__ is not defined in the TypeScript type definitions
                navigator.__defineGetter__(
                    "userAgent",
                    () =>
                        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Safari/605.1.15",
                );
            } else {
                // @ts-expect-error navigator.__defineGetter__ is not defined in the TypeScript type definitions
                navigator.__defineGetter__(
                    "userAgent",
                    () =>
                        "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Mobile Safari/537.36",
                );
            }
        } catch (error) {
            console.error("Error defining getter for navigator:", error);
        }
    }, []);

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

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <AppContextProviders>
                <App />
            </AppContextProviders>
        </QueryClientProvider>
        <Toaster position="top-center" />
    </StrictMode>,
);
