import { type QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, HeadContent, Outlet } from "@tanstack/react-router";
import { Fragment } from "react";

import { AppShell } from "@/components/layout/app-shell";

export type RouterContext = {
    queryClient: QueryClient;
    authenticationStore?: AuthenticationState;
};

export const Route = createRootRouteWithContext<RouterContext>()({
    component: () => (
        <Fragment>
            <HeadContent />
            <AppShell>
                <Outlet />
            </AppShell>
        </Fragment>
    ),

    head() {
        return {
            meta: [
                {
                    name: "description",
                    content: "Creators are the best",
                },
                { title: "Trophy" },
            ],
        };
    },
});
