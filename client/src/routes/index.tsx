import TopNavigationBar from "@/components/top-navigation-bar";

import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
    beforeLoad({ context, location }) {
        if (!context.authentication.isAuthenticated) {
            console.log(context, location);
        }
    },

    component() {
        return (
            <div className="relative min-h-screen">
                <TopNavigationBar />
                <main>
                    <Outlet />
                </main>
            </div>
        );
    },
});
