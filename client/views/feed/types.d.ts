type FeedContent = "trending" | "following" | "all";

type FeedStream = PublicFeedData["items"][number];

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
