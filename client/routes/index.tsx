import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { getPublicFeed } from "@/api/feed";
import { PageContentLayout } from "@/components/layout/page-content";
import { Dropdown } from "@/components/ui/dropdown";
import { FeedStreamWrapper } from "@/views/feed/components/wrapper";
import { dropdownButtons } from "@/views/feed/constants";
import { FeedContextProvider } from "@/views/feed/context";

export const Route = createFileRoute("/")({
    loader: async () => {
        // simulate network latency
        await new Promise((r) => setTimeout(r, 20000));
        return { data: "Feed data" };
    },

    component: RouteComponent,
});

function RouteComponent() {
    const [content, setContent] = useState<FeedContent>("all");
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

    return (
        <PageContentLayout>
            <Dropdown
                onChange={(value) => setContent(value as FeedContent)}
                options={dropdownButtons}
                icon="outlined"
                value={content}
            />

            <section className="space-y-6.5">
                {data?.data
                    ? data.data.map((value) => (
                          <FeedContextProvider key={value.id} isPending={isPending} {...value}>
                              <FeedStreamWrapper />
                          </FeedContextProvider>
                      ))
                    : null}
            </section>
        </PageContentLayout>
    );
}
