import { QueryClient } from "@tanstack/react-query";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { useAuthenticationContext } from "./contexts/authentication.tsx";
import "./index.css";
import { routeTree } from "./routeTree.gen.ts";

const queryClient = new QueryClient();
const router = createRouter({ routeTree, context: { queryClient, authentication: undefined! } });

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
        <App />
    </StrictMode>,
);
