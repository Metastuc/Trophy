import { usePrivy } from "@privy-io/react-auth";
import { Link, useMatchRoute, useNavigate } from "@tanstack/react-router";

import { SEARCH } from "@/assets/icons";
import { useShouldShowExitButton } from "@/hooks/exit-button";
import { resetScroll, sleep } from "@/lib/utils";
import { useDiscoverSearchStore } from "@/store/discover-search";
import { AuthenticationDrawer } from "@/views/authentication-drawer";

export default function Component() {
    const checkRoute = useMatchRoute();
    const { toggleIsVisible } = useDiscoverSearchStore();
    const showExitButton = useShouldShowExitButton(["/profile", "/stream"]);

    // todo: top navbar scroll away

    async function handleButtonClick() {
        toggleIsVisible();

        await sleep(250);
        resetScroll();
    }

    return (
        <section className="sticky top-0 z-50 flex w-full items-center justify-between border-b border-b-black/5 bg-white/85 p-5 backdrop-blur-sm">
            <aside>
                <Link to={"/"}>
                    <img src="/trophy.svg" alt="trophy-logo" />
                </Link>
            </aside>

            <aside className="flex items-center gap-3.5">
                {checkRoute({ to: "/discover" }) ? (
                    <button onClick={handleButtonClick}>
                        <i className="size-6">{SEARCH()}</i>
                    </button>
                ) : null}

                {!showExitButton ? <AuthenticationDrawer /> : <ExitButton />}
            </aside>
        </section>
    );
}

function ExitButton() {
    const { logout } = usePrivy();
    const navigate = useNavigate();

    function handleLogout() {
        logout();
        navigate({ to: "/" });
    }

    return (
        <button onClick={handleLogout}>
            <span>exit</span>
        </button>
    );
}
