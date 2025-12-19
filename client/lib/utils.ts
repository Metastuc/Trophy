import { useLocation } from "@tanstack/react-router";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { formatEther } from "viem";

import { CLIENT_CONSTANTS } from "./constants";

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

export function delay<T>({ promise, ms }: { promise: Promise<T>; ms: number }): Promise<T> {
    return new Promise((resolve) => setTimeout(() => resolve(promise), ms));
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
    return (Math.floor(parseFloat(amount) * 100) / 100).toFixed(2);
}

export function formatEtherToToken({
    number,
    toCreatorToken = true,
}: {
    number: bigint;
    toCreatorToken?: boolean;
}): string {
    const format = formatEther(number);
    console.log("formatEtherToToken", { number, format });
    if (!toCreatorToken) return format;
    return Number(format).toLocaleString();
}

export function getPriceInQuantity({ price = "0", quantity = "0" }: { price: string; quantity: string }): number {
    return parseFloat(price) * parseFloat(quantity);
}

export function validateBaseName(name: string) {
    if (!CLIENT_CONSTANTS.BASE_NAME_REGEX.test(name)) return { valid: false, reason: "Invalid format" };

    const label = name.split(".base.eth")[0];
    if (label.length < 3) return { valid: false, reason: "Name too short" };

    return { valid: true, reason: "Valid Base Name" };
}
