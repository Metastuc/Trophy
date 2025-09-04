import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { BellRing, House, TowerControl, TvMinimalPlay, User } from "lucide-react";
import React, { ReactNode } from "react";

import { resetScroll } from "@/lib/utils";

interface NavigationButton {
    href: string;
    icon: ReactNode;
    title: string;
}

const LINKS: Array<NavigationButton> = [
    { title: "home", href: "/", icon: <House /> },
    { title: "discover", href: "/discover", icon: <TowerControl /> },
    { title: "stream", href: "/stream", icon: <TvMinimalPlay /> },
    { title: "notifications", href: "/notifications", icon: <BellRing /> },
    { title: "profile", href: "/profile", icon: <User /> },
];

export function BottomNavigationBar() {
    return (
        <section className="bg-accent/85 fixed bottom-0 z-50 flex w-full items-center justify-center border-t border-t-black/5 py-3.5 backdrop-blur-[.125rem] backdrop-grayscale">
            <ul className="flex w-80 items-center justify-between px-4">
                {LINKS.map((link, index) => (
                    <NavigationButton key={index} {...link} />
                ))}
            </ul>
        </section>
    );
}

function NavigationButton({ href, icon, title }: NavigationButton) {
    const navigate = useNavigate();
    const routerState = useRouterState();

    const linkIsActive = routerState.location.pathname === href;

    function handleClick(event: React.MouseEvent) {
        if (linkIsActive) {
            event.preventDefault();
            resetScroll();
            navigate({ to: href, replace: true });
        }
    }

    return (
        <li>
            <Link
                to={href}
                onClick={handleClick}
                className="flex flex-col items-center justify-center gap-0.5"
                activeProps={{ className: "text-blue100" }}
                resetScroll
            >
                <i className="size-6">{icon}</i>
                <span className="text-[.5rem] capitalize">{title}</span>
            </Link>
        </li>
    );
}
