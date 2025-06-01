interface iTruncateText {
    text: string;
    maxLength?: number;
}

export function truncateText({ text, maxLength = 280 }: iTruncateText): string {
    if (!text) return "";
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength).trimEnd() + "…";
}
