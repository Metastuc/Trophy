import { Dot } from "lucide-react";

export function LiveSignal() {
    return (
        <aside className="absolute top-2 right-2 z-10 flex h-7 w-15 items-center justify-center gap-2 rounded-full bg-white/90">
            <i className="flex items-center justify-center animate-pulse text-red-600 overflow-hidden">
                <Dot className="scale-[3]" />
            </i>
            <span className="text-[.625rem] font-semibold uppercase">live</span>
        </aside>
    );
}
