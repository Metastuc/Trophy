import { Link, useMatchRoute } from "@tanstack/react-router";

import { resetScroll, useShouldShowExitButton } from "@/lib/utils";
import { AuthenticationDrawer } from "@/views/authentication-drawer";
import { sleep } from "#~/utils/sleep.ts";

import { ExitButton } from "./ui/exit-button";

export function TopNavigationBar() {
    const checkRoute = useMatchRoute();
    const showExitButton = useShouldShowExitButton(["/profile", "/stream"]);

    async function handleButtonClick() {
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
                        <i className="size-6">
                            <img src="/search.svg" alt="search_icon" />
                        </i>
                    </button>
                ) : null}

                {!showExitButton ? <AuthenticationDrawer /> : <ExitButton />}
            </aside>
        </section>
    );
}
