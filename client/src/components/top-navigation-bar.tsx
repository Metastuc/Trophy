import { Link, useMatchRoute } from "@tanstack/react-router";

import { LOGO, SEARCH } from "@/assets/icons";
import { resetScroll, sleep } from "@/lib/utils";
import { useDiscoverSearchStore } from "@/store/discover-search";

import AuthenticationDrawer from "./authentication-drawer";
import { AuthenticationDrawerContextProvider } from "./authentication-drawer/context";

export default function Component() {
    const checkRoute = useMatchRoute();
    const { toggleIsVisible } = useDiscoverSearchStore();

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
                    <LOGO />
                </Link>
            </aside>

            <aside className="flex items-center gap-3.5">
                {checkRoute({ to: "/discover" }) ? (
                    <button onClick={handleButtonClick}>
                        <i className="size-6">{SEARCH()}</i>
                    </button>
                ) : null}

                <AuthenticationDrawerContextProvider>
                    <AuthenticationDrawer />
                </AuthenticationDrawerContextProvider>
            </aside>
        </section>
    );
}
