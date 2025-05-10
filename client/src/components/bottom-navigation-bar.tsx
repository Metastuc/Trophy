import { Link } from "@tanstack/react-router";
import React from "react";

import { NAV_DISCOVER, NAV_HOME, NAV_NOTIFICATIONS, NAV_PROFILE, NAV_STREAM } from "./icons";

interface iNavigationButton {
    href: string;
    icon: () => React.ReactNode;
    title: string;
}

const LINKS: Array<iNavigationButton> = [
    { title: "home", href: "/", icon: NAV_HOME },
    { title: "discover", href: "/discover", icon: NAV_DISCOVER },
    { title: "stream", href: "/stream", icon: NAV_STREAM },
    { title: "notifications", href: "/notifications", icon: NAV_NOTIFICATIONS },
    { title: "profile", href: "/profile", icon: NAV_PROFILE },
];

export default function Component() {
    return (
        <section className="bg-accent fixed bottom-0 z-50 flex w-full items-center justify-center border-t border-t-black/5 py-3.5">
            <ul className="flex w-80 items-center justify-between">
                {LINKS.map((link, index) => (
                    <NavigationButton key={index} {...link} />
                ))}
            </ul>
        </section>
    );
}

function NavigationButton({ href, icon, title }: iNavigationButton) {
    return (
        <li>
            <Link
                to={href}
                className="flex flex-col items-center justify-center gap-0.5"
                activeProps={{ className: "text-blue100" }}
            >
                <i className="size-6">{icon()}</i>
                <span className="text-[.5rem] capitalize">{title}</span>
            </Link>
        </li>
    );
}
