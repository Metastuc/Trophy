import Link from "next/link";
import React from "react";

import { LOGO } from "./icons";

export default function Component() {
    return (
        <section>
            <aside>
                <Link href={"/"}>
                    <LOGO />
                </Link>
            </aside>

            <aside>
                <div></div>
            </aside>
        </section>
    );
}
