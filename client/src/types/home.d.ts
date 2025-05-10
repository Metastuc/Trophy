type tContent = "trending" | "following" | "search";

interface iHomeDropdown {
    content: tContent;
    setContent: React.Dispatch<React.SetStateAction<tContent>>;
}
