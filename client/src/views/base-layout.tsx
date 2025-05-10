import { Outlet } from "@tanstack/react-router";

import TopNavigationBar from "@/components/top-navigation-bar";

export default function Layout() {
    return (
        <div className="relative min-h-screen">
            <TopNavigationBar />
            <main>
                <Outlet />
            </main>
        </div>
    );
}
