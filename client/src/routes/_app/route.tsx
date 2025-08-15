import { createFileRoute, Outlet } from "@tanstack/react-router";

import { BottomNavigationBar } from "@/components/bottom-navigation-bar";
import { MobileOnlyView } from "@/components/layouts/mobile-only-wrapper";
import { TopNavigationBar } from "@/components/top-navigation-bar";

export const Route = createFileRoute("/_app")({
    component: () => <Page />,
});

function Page() {
    return (
        <MobileOnlyView>
            <TopNavigationBar />
            <main className="pb-20">
                <Outlet />
            </main>
            <BottomNavigationBar />
        </MobileOnlyView>
    );
}
