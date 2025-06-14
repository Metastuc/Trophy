import { redirect, useLocation } from "@tanstack/react-router";
import { toast } from "sonner";

import { RouterContext } from "@/routes/__root";

export async function authGuard(context: RouterContext) {
    if (!context.authentication.isReady) return;
    if (!context.authentication.isAuthenticated) {
        toast.error("You must be logged in to view your profile");
        throw redirect({ to: "/" });
    }
}

export function shouldShowExitButton(routes: string[]) {
    const location = useLocation();
    return routes.includes(location.pathname);
}
