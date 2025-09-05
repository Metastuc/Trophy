import { Link, useMatchRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";

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
        <section className="sticky top-0 z-50 w-full border-b border-b-black/5 bg-white/85 p-5 backdrop-blur-sm">
            <div className="flex h-9 items-center justify-between">
                <aside>
                    <Link to={"/"}>
                        <img src="/trophy.svg" alt="trophy-logo" />
                    </Link>
                </aside>

                <aside className="flex items-center gap-3.5">
                    <AnimatePresence mode="wait" initial={false}>
                        {checkRoute({ to: "/discover" }) ? (
                            <motion.button
                                key="search-button"
                                onClick={handleButtonClick}
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 15 }}
                                transition={{ duration: 0.05 }}
                            >
                                <motion.i
                                    className="size-6"
                                    whileHover={{ scale: 1.2, rotate: 5 }}
                                    whileTap={{ scale: 0.9, rotate: -5 }}
                                >
                                    <img src="/search.svg" alt="search_icon" />
                                </motion.i>
                            </motion.button>
                        ) : null}
                    </AnimatePresence>

                    <AnimatePresence mode="wait" initial={false}>
                        <motion.div
                            className="flex w-15 items-center justify-end"
                            key={showExitButton ? "exit" : "auth"}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.1 }}
                            layout
                        >
                            {showExitButton ? <ExitButton /> : <AuthenticationDrawer />}
                        </motion.div>
                    </AnimatePresence>
                </aside>
            </div>
        </section>
    );
}
