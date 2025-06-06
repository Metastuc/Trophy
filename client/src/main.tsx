import "./index.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { Loader } from "lucide-react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { Toaster } from "@/components/ui/sonner";
import { HuddleContextProvider, PrivyContextProvider } from "@/contexts/authContexts.tsx";
import {
    AuthenticationContextProvider,
    useAuthenticationContext,
} from "@/contexts/authentication.tsx";

import { routeTree } from "./routeTree.gen.ts";

const queryClient = new QueryClient();
const router = createRouter({
    routeTree,
    context: { queryClient, authentication: undefined! },
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
    const authentication = useAuthenticationContext();

    if (!authentication.isReady)
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
                <RouterProvider router={router} context={{ authentication }} />
            </motion.section>
        </AnimatePresence>
    );
}

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <PrivyContextProvider>
                <AuthenticationContextProvider>
                    <HuddleContextProvider>
                        <App />
                    </HuddleContextProvider>
                </AuthenticationContextProvider>
            </PrivyContextProvider>
            <Toaster position="top-center" />
        </QueryClientProvider>
    </StrictMode>,
);
