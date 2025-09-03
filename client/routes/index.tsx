import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

// import { useState } from "react";
import { getPublicFeed } from "@/api/feed";
import { PageContentLayout } from "@/components/layout/page-content";

export const Route = createFileRoute("/")({
    component: RouteComponent,
});

function RouteComponent() {
    // const [content, setContent] = useState<FeedContent>("all");
    const { data, error, isPending } = useQuery({
        queryKey: ["get-public-feed"],
        queryFn: async () => await getPublicFeed(),
    });

    if (error) {
        return <>error</>;
    }

    if (isPending) {
        return <>loading</>;
    }

    console.log(data);

    return <PageContentLayout>Hello "/"!</PageContentLayout>;
}
