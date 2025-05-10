import React from "react";

interface iStreamArticle {}

const StreamArticleContext = React.createContext<iStreamArticle | null>(null);

function useStreamArticleContext() {
    const context = React.useContext(StreamArticleContext);

    if (!context)
        throw new Error(
            "useStreamArticleContext must be used within a StreamArticleContextProvider",
        );
    return context;
}

function Header() {
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

function Main() {
    const {} = useStreamArticleContext();

    return <main></main>;
}

function Footer() {
    const {} = useStreamArticleContext();

    return (
        <footer>
            <aside>
                <span>title</span>
            </aside>

            <aside>
                <i>icon</i>
                <span>watching</span>
            </aside>
        </footer>
    );
}

export default function Component({}: iStreamArticle) {
    return (
        <StreamArticleContext.Provider value={null}>
            <article className={`h-72 border border-green-700`}>
                <Header />
                <Main />
                <Footer />
            </article>
        </StreamArticleContext.Provider>
    );
}
