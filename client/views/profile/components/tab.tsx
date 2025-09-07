import { AnimatePresence, motion } from "motion/react";

export function TabHeader({ tabs, activeTab, onTabClick }: TabHeader) {
    return (
        <aside className="absolute -top-6.25 w-4/5 overflow-hidden">
            <ul className="flex items-center justify-between">
                {tabs.map((tab) => (
                    <li key={tab.id} className="relative">
                        <button
                            className="text-blue100 flex items-center justify-center gap-1"
                            onClick={() => onTabClick(tab.id)}
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
                                    className="bg-blue100 absolute right-0 -bottom-0.25 left-0 h-1 rounded"
                                />
                            )}
                        </AnimatePresence>
                    </li>
                ))}
            </ul>
        </aside>
    );
}
