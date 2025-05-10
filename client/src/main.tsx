import "./index.css";

import { QueryClient } from "@tanstack/react-query";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { Toaster } from "@/components/ui/sonner";
import { useAuthenticationContext } from "@/contexts/authentication.tsx";
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
    return (
        <RouterProvider router={router} context={{ authentication: useAuthenticationContext() }} />
    );
}

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <PrivyContextProvider>
            <App />
        </PrivyContextProvider>
        <Toaster position="top-center" richColors />
    </StrictMode>,
);
