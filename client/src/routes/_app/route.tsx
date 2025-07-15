import { createFileRoute, Outlet } from "@tanstack/react-router";
import React from "react";

import { BottomNavigationBar } from "@/components/bottom-navigation-bar";
import { TopNavigationBar } from "@/components/top-navigation-bar";

export const Route = createFileRoute("/_app")({
    component() {
        return (
            <React.Fragment>
                <TopNavigationBar />
                <main className="pb-20">
                    <Outlet />
                </main>
                <BottomNavigationBar />
            </React.Fragment>
        );
    },
});
