import { Link } from "@tanstack/react-router";

import AuthenticationDrawer from "./authentication-drawer";
import { LOGO } from "./icons";

export default function Component() {
    return (
        <section className="sticky top-0 z-50 flex w-full items-center justify-between border-b border-b-black/5 bg-white px-5 py-7">
            <aside>
                <Link to={"/"}>
                    <LOGO />
                </Link>
            </aside>

            <aside className="flex items-center gap-3.5">
                <div>search</div>
                <AuthenticationDrawer />
            </aside>
        </section>
    );
}
