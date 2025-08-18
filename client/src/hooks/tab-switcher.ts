import React from "react";

export function useTabSwitcher<T extends string>(initialTab: T) {
    const [activeTab, setActiveTab] = React.useState<T>(initialTab);

    return {
        activeTab,

        handleTabClick(tab: T) {
            setActiveTab(tab);
        },

        tabIsActive(tab: T) {
            return activeTab === tab ? true : false;
        },
    };
}
