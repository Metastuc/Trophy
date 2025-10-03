import { useInfiniteQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

import { getPublicFeed } from "@/api/feed";
import { PageContentLayout } from "@/components/layout/page-content";
import { LoadingScreen } from "@/components/loading-screen";
import { Dropdown } from "@/components/ui/dropdown";
import { Loading } from "@/components/ui/loading";
import { cn } from "@/lib/utils";
import { FeedStreamWrapper } from "@/views/feed/components/wrapper";
import { dropdownButtons } from "@/views/feed/constants";
import { FeedContextProvider } from "@/views/feed/context";

export const Route = createFileRoute("/")({
    component: RouteComponent,
});

function RouteComponent() {
    const [content, setContent] = useState<FeedContent>("all");
    const loadMoreRef = useRef<HTMLDivElement>(null);

    const { data, error, isPending, isFetchingNextPage, hasNextPage, fetchNextPage } = useInfiniteQuery({
        queryKey: ["get-public-feed"],
        queryFn: async ({ pageParam }) => await getPublicFeed({ page: pageParam, limit: 10 }),
        initialPageParam: 1,
        getNextPageParam: function (lastPage) {
            if (lastPage.pagination.hasNext) return lastPage.pagination.page + 1;
            return undefined;
        },
    });

    useEffect(
        function () {
            const target = loadMoreRef.current;
            if (!hasNextPage || !target) return;

            const observer = new IntersectionObserver(
                function (entries) {
                    if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) fetchNextPage();
                },
                { threshold: 1.0 },
            );

            observer.observe(target);

            return function () {
                if (target) observer.unobserve(target);
            };
        },
        [fetchNextPage, hasNextPage, isFetchingNextPage],
    );

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

            <section
                className={cn("space-y-6.5", "md:grid md:grid-cols-3 md:gap-6", "lg:grid-cols-3", "xl:grid-cols-5")}
            >
                {data.pages.map((page) =>
                    page.items.map((value) => (
                        <FeedContextProvider key={value.id} isPending={isPending} {...value}>
                            <FeedStreamWrapper />
                        </FeedContextProvider>
                    )),
                )}

                {hasNextPage ? (
                    <div ref={loadMoreRef}>
                        <Loading />
                    </div>
                ) : null}
            </section>
        </PageContentLayout>
    );
}
