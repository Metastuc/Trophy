import BottomNavigationBar from "@/components/bottom-navigation-bar";
import TopNavigationBar from "@/components/top-navigation-bar";

import { type QueryClient } from "@tanstack/react-query";
import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";

type RouterContext = {
    queryClient: QueryClient;
    authentication: iAuthenticationContext;
};

export const Route = createRootRouteWithContext<RouterContext>()({
    component: () => (
        <div className="relative min-h-screen">
            <TopNavigationBar />
            <main>
                <Outlet />
            </main>
            <BottomNavigationBar />
        </div>
    ),
});
