import "./index.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "sonner";

import { usePrivy } from "@privy-io/react-auth";
import { Loader } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { AppContextProviders } from "./contexts/index.tsx";
import { routeTree } from "./routeTree.gen.ts";
import { useAuthenticationStore } from "./store/authentication.ts";

const queryClient = new QueryClient();
const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    getScrollRestorationKey(location) {
        const paths = ["/"];
        return paths.includes(location.pathname)
            ? location.pathname
            : (location.state.key as string);
    },
});

declare module "@tanstack/react-router" {
    interface Register {
        router: typeof router;
    }
}

function App() {
    const isAuthenticationReady = useAuthenticationStore((state) => !state.isLoading);
    const isPrivyReady = usePrivy().ready;

    if (!isAuthenticationReady || !isPrivyReady)
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
                <RouterProvider router={router} />
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
