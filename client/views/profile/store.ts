import { create, StoreApi, UseBoundStore } from "zustand";

export const useUserProfileDrawerStore: UseBoundStore<StoreApi<UserProfileDrawerStore>> =
    create<UserProfileDrawerStore>()((set) => ({
        closeDrawer() {
            set({ drawerView: null, addViewCurentTab: undefined, payload: undefined });
        },

        openDrawer({ view, tab }) {
            set((state) => ({
                drawerView: view,
                addViewCurentTab: view === "add" ? tab || "receive" : state.addViewCurentTab,
            }));
        },

        setAddViewCurentTab(tab) {
            set({ addViewCurentTab: tab });
        },

        drawerView: null,

        addViewCurentTab: "receive",
    }));
