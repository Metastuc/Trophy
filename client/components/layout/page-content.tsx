import { PropsWithChildren } from "react";

import { cn } from "@/lib/utils";

interface PageContentLayoutProps extends PropsWithChildren {
    className?: string;
}

export function PageContentLayout({ children, className }: PageContentLayoutProps) {
    return <section className={cn(className, "my-2 px-4")}>{children}</section>;
}
