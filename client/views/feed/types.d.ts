type FeedContent = "trending" | "following" | "all";

type FeedStream = PublicFeedResponse["data"][number];

interface FeedDropdown {
    content: FeedContent;
    setContent: React.Dispatch<React.SetStateAction<FeedContent>>;
}

interface FeedDropdownButton {
    title: string;
    value: string;
}

interface FeedContextValue extends FeedStream {
    isPending: boolean;
}
