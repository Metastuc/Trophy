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
        <section className="absolute bottom-0 border border-green-500 w-full">
            <ul className="flex justify-between items-center">
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
            <Link to={href}>
                <i>{icon()}</i>
                <span className="capitalize">{title}</span>
            </Link>
        </li>
    );
}
