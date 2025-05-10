import { createFileRoute,Outlet } from "@tanstack/react-router";

import BottomNavigationBar from "@/components/bottom-navigation-bar";
import TopNavigationBar from "@/components/top-navigation-bar";

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
                <BottomNavigationBar />
            </div>
        );
    },
});
