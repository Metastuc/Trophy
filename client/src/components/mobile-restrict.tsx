"use client";

import { useMediaQuery } from "@uidotdev/usehooks";
import React from "react";

export default function Component({ children }: { children: React.ReactNode }) {
    const isMobile = useMediaQuery("only screen and (max-width : 768px)");

    if (!isMobile) return <section>mobile view only</section>;

    return children;
}
