import { Fragment, ReactNode } from "react";

import { BottomNavigationBar } from "../bottom-navigation-bar";
import { TopNavigationBar } from "../top-navigation-bar";

export function AppShell({ children }: { children: ReactNode }) {
    return (
        <Fragment>
            <TopNavigationBar />
            <main className="pb-20">{children}</main>
            <BottomNavigationBar />
        </Fragment>
    );
}
