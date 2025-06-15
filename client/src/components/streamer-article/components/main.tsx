import { LIVE } from "@/assets/icons";
import { Skeleton } from "@/components/ui/skeleton";

export default function Component() {
    // const {} = useStreamArticleContext();

    return (
        <main className="relative h-53 w-full">
            <aside className="absolute top-2 right-2 z-10 flex h-7 w-15 items-center justify-center gap-2 rounded-full bg-white/90">
                <i>{LIVE()}</i>
                <span className="text-[.625rem] font-semibold uppercase">live</span>
            </aside>

            <Skeleton className="size-full rounded-none" />
        </main>
    );
}
