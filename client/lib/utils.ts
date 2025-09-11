import { useLocation } from "@tanstack/react-router";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
    return twMerge(clsx(inputs));
}

export function useShouldShowExitButton(routes: string[]): boolean {
    const location = useLocation();
    return routes.some((route) => {
        const regexPattern = route.replace(/\$[a-zA-Z0-9_]+/g, "[^/]+").replace(/\//g, "\\/");
        const regex = new RegExp(`^${regexPattern}$`);
        return regex.test(location.pathname);
    });
}

export function resetScroll(): void {
    window.scrollTo({ top: 0, behavior: "smooth" });
}

export function truncateText({ text, maxLength = 280 }: { text: string; maxLength?: number }): string {
    if (!text) return "";
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength).trimEnd() + "…";
}

export function tokenInputField(value: string): string {
    let parsed = value.replace(/[^0-9.]/g, "");
    const parts = parsed.split(".");

    if (parts.length > 2) {
        parsed = parts[0] + "." + parts.slice(1).join("");
    }

    return parsed;
}

export function formatUSD(amount: string): string {
    return `$${(parseFloat(amount.toString()) * 1).toFixed(2)}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function formatToken(amount: string): string {
    return `${(parseFloat(amount.toString()) * 1).toFixed(2)}`;
}

export function delay<T>({ promise, ms }: { promise: Promise<T>; ms: number }): Promise<T> {
    return new Promise((resolve) => setTimeout(() => resolve(promise), ms));
}
