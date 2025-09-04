import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { getPublicFeed } from "@/api/feed";
import { PageContentLayout } from "@/components/layout/page-content";
import { LoadingScreen } from "@/components/loading-screen";
import { Dropdown } from "@/components/ui/dropdown";
import { cn } from "@/lib/utils";
import { FeedStreamWrapper } from "@/views/feed/components/wrapper";
import { dropdownButtons } from "@/views/feed/constants";
import { FeedContextProvider } from "@/views/feed/context";

export const Route = createFileRoute("/")({
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
        return <LoadingScreen isPending />;
    }

    return (
        <PageContentLayout className="space-y-10.5">
            <Dropdown
                onChange={(value) => setContent(value as FeedContent)}
                options={dropdownButtons}
                icon="outlined"
                value={content}
            />

            <section className={cn("space-y-6.5", "md:grid md:grid-cols-3 md:gap-6", "lg:grid-cols-3", "xl:grid-cols-5")}>
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
