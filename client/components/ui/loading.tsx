import { Loader } from "lucide-react";
import { HtmlHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

export function Loading({ styles }: { styles?: Record<string, HtmlHTMLAttributes<string>["className"]> }) {
    return (
        <span className={cn("flex items-center justify-center", styles?.wrapper)}>
            <i className={cn("size-6", styles?.icon)}>
                <Loader className="animate-spin" />
            </i>
        </span>
    );
}
