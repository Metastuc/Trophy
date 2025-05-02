import { type QueryClient } from "@tanstack/react-query";
import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";

type RouterContext = {
    queryClient: QueryClient;
};

export const route = createRootRouteWithContext<RouterContext>()({
    component: () => <Outlet />,
});
