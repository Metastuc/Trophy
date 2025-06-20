import { WATCHING } from "@/assets/icons";

export default function Component() {
    // const {} = useStreamArticleContext();

    return (
        <footer className="flex items-center justify-between">
            <aside>
                <span>title</span>
            </aside>

            <aside className="bg-black100 flex gap-2 rounded-xs p-2">
                <i className="size-2.5">{WATCHING()}</i>
                <span className="text-[.5rem] text-white">watching</span>
            </aside>
        </footer>
    );
}
