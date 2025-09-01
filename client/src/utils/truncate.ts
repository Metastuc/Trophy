interface iTruncateText {
    text: string;
    maxLength?: number;
}

export function truncateText({ text, maxLength = 280 }: iTruncateText): string {
    if (!text) return "";
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength).trimEnd() + "…";
}

export function tokenInputField(value: string): string {
    let cleaned = value.replace(/[^0-9.]/g, "");
    const parts = cleaned.split(".");

    if (parts.length > 2) {
        cleaned = parts[0] + "." + parts.slice(1).join("");
    }

    return cleaned;
}
