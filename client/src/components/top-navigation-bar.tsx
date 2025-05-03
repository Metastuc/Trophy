import { Link } from "@tanstack/react-router";

import { LOGO } from "./icons";
import { Button } from "./ui/button";

export default function Component() {
    return (
        <section className="py-7 px-5 flex justify-between items-center absolute top-0 w-full">
            <aside>
                <Link to={"/"}>
                    <LOGO />
                </Link>
            </aside>

            <aside className="flex items-center gap-3.5">
                <div>search</div>

                <Button className="rounded-sm h-6 w-15 bg-blue100">
                    <span className="text-xs">login</span>
                </Button>
            </aside>
        </section>
    );
}
