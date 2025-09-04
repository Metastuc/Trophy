import { useState } from "react";

export function useTabSwitcher<T extends string>(initialTab: T) {
    const [activeTab, setActiveTab] = useState<T>(initialTab);

    return {
        activeTab,

        handleTabClick(tab: T): void {
            setActiveTab(tab);
        },

        tabIsActive(tab: T): boolean {
            return activeTab === tab;
        },
    };
}
