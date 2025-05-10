import { type QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext,Outlet } from "@tanstack/react-router";

type RouterContext = {
    queryClient: QueryClient;
    authentication: iAuthenticationContext;
};

export const Route = createRootRouteWithContext<RouterContext>()({
    component: () => <Outlet />,
});
