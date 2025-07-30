import "./index.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { Loader } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "sonner";
import { useShallow } from "zustand/shallow";

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

    if (authenticationStore.isLoading)
        return (
            <section className="flex h-screen w-screen items-center justify-center">
                <Loader className="animate-spin" />
            </section>
        );

    return (
        <AnimatePresence mode="wait">
            <motion.section
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.25 }}
                className="relative min-h-screen"
            >
                <RouterProvider router={router} context={{ authenticationStore }} />
            </motion.section>
        </AnimatePresence>
    );
}

const root = createRoot(document.getElementById("root")!);
root.render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <AppContextProviders>
                <App />
            </AppContextProviders>
        </QueryClientProvider>
        <Toaster position="top-center" />
    </StrictMode>,
);
