import { useState } from "react";

export function useTabSwitcher(initialTab: tStreamAction) {
    const [activeTab, setActiveTab] = useState<tStreamAction>(initialTab);

    return {
        activeTab,

        handleTabClick(tab: tStreamAction) {
            setActiveTab(tab);
        },

        tabIsActive(tab: tStreamAction) {
            return activeTab === tab ? true : false;
        },
    };
}
