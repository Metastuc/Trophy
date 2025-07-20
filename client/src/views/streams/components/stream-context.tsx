import { useRouteContext } from "@tanstack/react-router";

export function StreamContext() {
    const { streamCreator, streamResponse } = useRouteContext({
        from: "/streams/$id",
    });

    return (
        <section>
            <aside>
                <div>pfp</div>
                <span>{streamCreator.user.username}</span>
            </aside>

            <aside>
                <span>{streamResponse.title}</span>
            </aside>
        </section>
    );
}
