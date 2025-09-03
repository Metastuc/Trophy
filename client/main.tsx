import "./index.css";

import { QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "sonner";

import { App } from "./App.tsx";
import { AppContextProviders } from "./contexts/index.tsx";
import { queryClient } from "./lib/constants.ts";

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
