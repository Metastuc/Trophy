import { usePrivy } from "@privy-io/react-auth";
import { useNavigate } from "@tanstack/react-router";
import { LogOut } from "lucide-react";

import { useAuthenticationStore } from "#~/store/authentication.ts";

export function ExitButton() {
    const { logout } = usePrivy();
    const navigate = useNavigate();

    async function handleLogout() {
        logout()
            .then(function () {
                useAuthenticationStore.getState().logout();
            })
            .finally(function () {
                navigate({ to: "/" });
            });
    }

    return (
        <button onClick={handleLogout}>
            <i className="size-6">
                <LogOut />
            </i>
        </button>
    );
}
