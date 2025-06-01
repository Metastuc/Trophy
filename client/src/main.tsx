import "./index.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Loader } from "lucide-react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { Toaster } from "@/components/ui/sonner";
import {
    AuthenticationContextProvider,
    useAuthenticationContext,
} from "@/contexts/authentication.tsx";
import { PrivyContextProvider } from "@/contexts/privy.tsx";

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
        <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.15 }}
            className="relative min-h-screen"
        >
            <RouterProvider router={router} context={{ authentication }} />
        </motion.section>
    );
}

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <PrivyContextProvider>
                <AuthenticationContextProvider>
                    <App />
                </AuthenticationContextProvider>
            </PrivyContextProvider>
            <Toaster position="top-center" />
        </QueryClientProvider>
    </StrictMode>,
);
