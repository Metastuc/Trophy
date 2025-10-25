import { AnimatePresence, motion } from "motion/react";

import { cn } from "@/lib/utils";

export function TabHeader<T extends string>({ activeTab, onTabClick, tabs, styles }: TabHeader<T>) {
    return (
        <aside className={cn("absolute -top-6.25 w-4/5 overflow-hidden", styles?.wrapper)}>
            <ul className={cn("flex items-center justify-between", styles?.list_wrapper)}>
                {tabs.map((tab) => (
                    <li
                        key={tab.id}
                        className={cn(
                            "relative",
                            typeof styles?.list_item === "function" ? styles.list_item(tab.id) : styles?.list_item,
                        )}
                    >
                        <button
                            className={cn(
                                "text-blue100 flex items-center justify-center gap-1",
                                tab.disabled && "opacity-50",
                                typeof styles?.list_button === "function"
                                    ? styles.list_button(tab.id)
                                    : styles?.list_button,
                            )}
                            onClick={() => onTabClick(tab.id)}
                            disabled={tab.disabled}
                        >
                            {tab.id !== "streams" && tab.icon && <i className="size-4">{tab.icon}</i>}
                            <span>{tab.label}</span>
                            {tab.id === "streams" && tab.icon && <i className="size-4">{tab.icon}</i>}
                        </button>

                        <AnimatePresence mode="wait">
                            {activeTab === tab.id && (
                                <motion.span
                                    key={`${tab.id}-underline`}
                                    initial={{ opacity: 0, y: 4 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 4 }}
                                    transition={{ duration: 0.2 }}
                                    className={cn(
                                        "bg-blue100 absolute right-0 -bottom-px left-0 h-1 rounded",
                                        styles?.indicator,
                                    )}
                                />
                            )}
                        </AnimatePresence>
                    </li>
                ))}
            </ul>
        </aside>
    );
}
