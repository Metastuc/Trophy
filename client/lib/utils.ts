import { useLocation } from "@tanstack/react-router";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function useShouldShowExitButton(routes: string[]) {
    const location = useLocation();
    return routes.includes(location.pathname);
}

export function resetScroll() {
    window.scrollTo({ top: 0, behavior: "smooth" });
}
