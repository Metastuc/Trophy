type FeedContent = "trending" | "following" | "all";

interface FeedDropdown {
    content: FeedContent;
    setContent: React.Dispatch<React.SetStateAction<FeedContent>>;
}

interface FeedDropdownButton {
    title: string;
    value: string;
}
