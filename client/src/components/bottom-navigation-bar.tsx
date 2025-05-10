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
    { title: "discover", href: "/", icon: NAV_DISCOVER },
    { title: "stream", href: "/", icon: NAV_STREAM },
    { title: "notifications", href: "/", icon: NAV_NOTIFICATIONS },
    { title: "profile", href: "/", icon: NAV_PROFILE },
];

export default function Component() {
    return (
        <section className="fixed bottom-0 w-full flex justify-center items-center py-3.5 shadow-accent-foreground">
            <ul className="flex justify-between items-center w-80">
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
            <Link to={href} className="flex flex-col items-center justify-center gap-1.5">
                <i className="size-6">{icon()}</i>
                <span className="capitalize text-[.5rem]">{title}</span>
            </Link>
        </li>
    );
}
