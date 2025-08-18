import React from "react";

import { cn } from "@/lib/utils";

interface iProps extends React.PropsWithChildren {
    className?: string;
}

export function PageContentLayout({ children, className }: iProps) {
    return <section className={cn(className, "my-2 px-4")}>{children}</section>;
}
