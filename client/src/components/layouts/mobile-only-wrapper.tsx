import { useMediaQuery } from "@uidotdev/usehooks";
import { ReactNode } from "react";

export function MobileOnlyView({ children }: { children: ReactNode }) {
    const isMobile = useMediaQuery("only screen and (max-width : 768px)");

    if (!isMobile) return <>this is for mobile only</>;

    return children;
}
