import { useStreamArticleContext } from "../hook";

export default function Component() {
    const {} = useStreamArticleContext();

    return (
        <header className="flex h-8 items-center justify-between border border-purple-700">
            <aside className="flex items-center gap-0.5">
                <i className="size-8">
                    <img
                        src="https://www.dummyimage.com/200x200/000/fff"
                        alt="user-pfp"
                        className="rounded-full"
                    />
                </i>

                <span className="text-xs">@username</span>
            </aside>

            <aside>
                <button>
                    <span className="capitalize">trade</span>
                </button>
            </aside>
        </header>
    );
}
