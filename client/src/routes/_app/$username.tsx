import { createFileRoute, redirect, useLoaderData } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/$username")({
    component: RouteComponent,

    loader({ context, params }) {
        if (context.authenticationStore?.user?.backendUserData.user.username === params.username) {
            throw redirect({ to: "/profile" });
        }

        return { username: params.username };
    },

    params: {
        parse(data) {
            if (!data.username?.startsWith("@")) {
                throw new Error("An error occurred");
            }

            return {
                username: data.username.slice(1), // remove the '@'
            };
        },
    },
});

function RouteComponent() {
    const { username } = useLoaderData({ from: "/_app/$username" });

    return <div>Hello "/_app/$username"! {username}</div>;
}
