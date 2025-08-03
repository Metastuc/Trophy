import { createFileRoute, redirect, useLoaderData } from "@tanstack/react-router";

import { getUser } from "@/api/get-user";
import { logger } from "@/utils/logger";

export const Route = createFileRoute("/_app/$username")({
    beforeLoad({ context, params }) {
        if (context.authenticationStore?.user?.backendUserData.user.username === params.username) {
            throw redirect({ to: "/profile" });
        }
    },

    component() {
        return Page();
    },

    async loader({ context, params }) {
        const response = await context.queryClient.ensureQueryData(getUser({ username: params.username }));

        if (!response) {
            throw new Error("Unable to get user profile");
        }

        logger({ response });

        return { user: response.user, streams: response.stream };
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

function Page() {
    const { user, streams } = useLoaderData({ from: "/_app/$username" });

    return <div>Hello "/_app/$username"! {user.username}</div>;
}
