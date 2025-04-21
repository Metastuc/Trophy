"use client";

import { useAuthenticationContext } from "@/context/authentication";
import { PUBLIC_ROUTES } from "@/lib/constants";

import { usePathname, useRouter } from "next/navigation";
import React from "react";

export default function Component({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const { isAuthenticated } = useAuthenticationContext();
    const isProtected = !isAuthenticated && !PUBLIC_ROUTES.includes(pathname);

    React.useLayoutEffect(
        function () {
            if (isProtected) router.push("/auth");
        },
        [isProtected, pathname, router],
    );

    return isProtected ? null : children;
}
