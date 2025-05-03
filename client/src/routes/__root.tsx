import { type QueryClient } from "@tanstack/react-query";
import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";

type RouterContext = {
    queryClient: QueryClient;
    authentication: iAuthenticationContext;
};

export const Route = createRootRouteWithContext<RouterContext>()({
    component: () => <Outlet />,
});
