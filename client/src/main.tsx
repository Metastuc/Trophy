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
import { useCustomScriptLoader } from "./hooks/script.ts";
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
    const status = useCustomScriptLoader({
        src: "https://cdn.jsdelivr.net/npm/eruda",
    });

    useEffect(() => {
        if (status === "ready") {
            // @ts-expect-error window.eruda is not defined in the TypeScript type definitions
            if (window.eruda) {
                // @ts-expect-error window.eruda.init is not defined in the TypeScript type definitions
                window.eruda.init();
            }
        }
    }, [status]);

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
