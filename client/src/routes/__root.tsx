import { type QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { Fragment } from "react";

import BottomNavigationBar from "@/components/bottom-navigation-bar";
import TopNavigationBar from "@/components/top-navigation-bar";
import { iAuthenticationContext } from "@/contexts/authentication";

export type RouterContext = {
    queryClient: QueryClient;
    authentication: iAuthenticationContext;
};

export const Route = createRootRouteWithContext<RouterContext>()({
    component: () => (
        <Fragment>
            <TopNavigationBar />
            <main className="mb-20">
                <Outlet />
            </main>
            <BottomNavigationBar />
        </Fragment>
    ),
});
