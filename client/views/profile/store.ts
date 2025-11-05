import { create, StoreApi, UseBoundStore } from "zustand";

import { useTransactionStore } from "@/hooks/transaction";
import { formatUSD } from "@/lib/utils";

export const useUserProfileDrawerStore: UseBoundStore<StoreApi<UserProfileDrawerStore>> =
    create<UserProfileDrawerStore>()((set) => ({
        closeDrawer() {
            useTransactionStore.getState().reset();
            set({ drawerView: undefined, addViewCurentTab: undefined, payload: undefined });
        },

        openDrawer({ payload, tab, view }) {
            set((state) => ({
                drawerView: view,
                addViewCurentTab: view === "add" ? tab || "receive" : state.addViewCurentTab,
                payload: view === "add" ? payload : undefined,
            }));
        },

        setAddViewCurentTab(tab) {
            set({ addViewCurentTab: tab });
        },

        setTotalUsdBalance(balance) {
            set({ totalUsdBalance: formatUSD(balance) });
        },

        drawerView: undefined,

        addViewCurentTab: "receive",

        totalUsdBalance: formatUSD("0"),
    }));
