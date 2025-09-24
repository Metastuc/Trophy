import { usePrivy } from "@privy-io/react-auth";
import { useLocation, useNavigate } from "@tanstack/react-router";
import { LogOut } from "lucide-react";
import { toast } from "sonner";
import { useShallow } from "zustand/shallow";

import { useAuthenticationStore } from "@/hooks/authentication";

export function ExitButton() {
    const { logout: privyLogout } = usePrivy();
    const navigate = useNavigate();
    const location = useLocation();
    const isLiveRoom = location.pathname.startsWith("/live/");

    const { isAuthenticated, logout: appLogout } = useAuthenticationStore(
        useShallow((state) => ({
            isAuthenticated: state.isAuthenticated,
            logout: state.logout,
        })),
    );

    async function handleLogout() {
        if (isAuthenticated) {
            if (isLiveRoom) {
                navigate({ to: "/" });
            } else {
                try {
                    privyLogout().then(() => appLogout());
                } catch (error) {
                    toast.error((error as Error).message);
                }
            }
        } else {
            navigate({ to: "/" });
        }
    }

    return (
        <button
            onClick={handleLogout}
            className="border-blue100/10 flex size-9 items-center justify-center rounded-full border shadow"
        >
            <i className="text-blue100 size-4.5">
                <LogOut />
            </i>
        </button>
    );
}
