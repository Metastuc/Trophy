import { Link } from "@tanstack/react-router";

import AuthenticationDrawer from "./authentication-drawer";
import { LOGO } from "./icons";

export default function Component() {
    return (
        <section className="py-7 px-5 flex justify-between items-center sticky top-0 w-full">
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
