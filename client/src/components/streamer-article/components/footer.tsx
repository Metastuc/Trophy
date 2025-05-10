import { useStreamArticleContext } from "../hook";

export default function Component() {
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
