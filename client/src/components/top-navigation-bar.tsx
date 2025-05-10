import { Link, useMatchRoute } from "@tanstack/react-router";

import { useDiscoverSearchStore } from "@/store/discover-search";
import AuthenticationDrawer from "./authentication-drawer";
import { LOGO, SEARCH } from "./icons";

export default function Component() {
    const routeMatch = useMatchRoute();
    const isDiscoverPage = routeMatch({ to: "/discover" });
    const { toggleIsVisible } = useDiscoverSearchStore();

    return (
        <section className="sticky top-0 z-50 flex w-full items-center justify-between border-b border-b-black/5 bg-white px-5 py-7">
            <aside>
                <Link to={"/"}>
                    <LOGO />
                </Link>
            </aside>

            <aside className="flex items-center gap-3.5">
                {isDiscoverPage ? (
                    <button onClick={() => toggleIsVisible()}>
                        <i className="size-6">{SEARCH()}</i>
                    </button>
                ) : null}

                <AuthenticationDrawer />
            </aside>
        </section>
    );
}
