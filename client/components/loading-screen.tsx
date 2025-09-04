import { Loader } from "lucide-react";

import { cn } from "@/lib/utils";

export function LoadingScreen({ isPending }: { isPending?: boolean }) {
    return (
        <section
            className={cn(
                "flex w-screen items-center justify-center",
                isPending ? "h-[calc(100dvh-4.25rem)] my-auto" : "h-dvh",
            )}
        >
            <Loader className="animate-spin" />
        </section>
    );
}
