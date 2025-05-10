import { type QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";

import BottomNavigationBar from "@/components/bottom-navigation-bar";
import TopNavigationBar from "@/components/top-navigation-bar";

type RouterContext = {
    queryClient: QueryClient;
    authentication: iAuthenticationContext;
};

export const Route = createRootRouteWithContext<RouterContext>()({
    component: () => (
        <div className="relative min-h-screen">
            <TopNavigationBar />
            <main className="mb-20 border border-red-700">
                <Outlet />
            </main>
            <BottomNavigationBar />
        </div>
    ),
});
