import { type QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";

export type RouterContext = {
    queryClient: QueryClient;
    authenticationStore?: tAuthenticatedState;
};

export const Route = createRootRouteWithContext<RouterContext>()({
    component: () => <Outlet />,
});
