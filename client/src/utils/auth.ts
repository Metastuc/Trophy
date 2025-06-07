import { RouterContext } from "@/routes/__root";
import { redirect } from "@tanstack/react-router";
import { toast } from "sonner";

export async function authGuard(context: RouterContext) {
    if (!context.authentication.isReady) return;
    if (!context.authentication.isAuthenticated) {
        toast.error("You must be logged in to view your profile");
        throw redirect({ to: "/" });
    }
}
