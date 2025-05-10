import Footer from "./components/footer";
import Header from "./components/header";
import Main from "./components/main";
import { StreamArticleContext } from "./hook";

export default function Component({}: iStreamArticle) {
    const contextValue: iStreamArticle = {
        username: "@defaultUser",
        title: "Default Stream",
        watching: 0,
    };

    return (
        <StreamArticleContext.Provider value={contextValue}>
            <article className={`h-72 border border-green-700`}>
                <Header />
                <Main />
                <Footer />
            </article>
        </StreamArticleContext.Provider>
    );
}
