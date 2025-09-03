import { type QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, HeadContent, Outlet } from "@tanstack/react-router";
import { Fragment } from "react";

import { TopNavigationBar } from "@/components/top-navigation-bar";

export type RouterContext = {
    queryClient: QueryClient;
    authenticationStore?: AuthenticationState;
};

export const Route = createRootRouteWithContext<RouterContext>()({
    component: () => (
        <Fragment>
            <HeadContent />
            <TopNavigationBar />
            <Outlet />
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
