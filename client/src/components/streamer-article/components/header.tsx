import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useStreamArticleContext } from "../hook";

export default function Component() {
    const {} = useStreamArticleContext();

    return (
        <header className="flex h-8 items-center justify-between">
            <aside className="flex items-center gap-0.5">
                <i className="size-8 rounded-full bg-gradient-to-b from-[#6055FF] to-[#3A3399]">
                    {/* <img
                        src="https://www.dummyimage.com/200x200/000/fff"
                        alt="user-pfp"
                        className={cn("user-pfp", "rounded-full")}
                    /> */}

                    <Skeleton className={cn("user-pfp", "rounded-full")} />
                </i>

                <span className="text-xs">@username</span>
            </aside>

            <aside>
                <Button variant="default" className="bg-green100 h-6 w-15">
                    <span className="text-green200 capitalize">trade</span>
                </Button>
            </aside>
        </header>
    );
}
