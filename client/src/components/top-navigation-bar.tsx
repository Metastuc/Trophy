import { Link } from "@tanstack/react-router";

import { Button } from "./ui/button";

export default function Component() {
    return (
        <section className="border border-red-500 py-7 px-5 flex justify-between items-center absolute top-0 w-full">
            <aside>
                <Link to={"/"}>
                    <img src="/logo.svg" alt="trophy_logo" />
                </Link>
            </aside>

            <aside className="flex items-center gap-3.5">
                <div>search</div>

                <Button className="rounded-sm h-6 w-15 bg-black100">
                    <span className="text-xs">login</span>
                </Button>
            </aside>
        </section>
    );
}
