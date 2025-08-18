import { useLocation } from "@tanstack/react-router";

export function useShouldShowExitButton(routes: string[]) {
    const location = useLocation();
    return routes.includes(location.pathname);
}
