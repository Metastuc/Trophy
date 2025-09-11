import { Loader } from "lucide-react";

import { cn } from "@/lib/utils";

export function LoadingScreen({ isPending }: { isPending?: boolean }) {
    return (
        <section className={cn("flex items-center justify-center", isPending ? "shell" : "h-dvh w-screen")}>
            <Loader className="animate-spin" />
        </section>
    );
}
