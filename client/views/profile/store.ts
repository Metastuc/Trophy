import { create, StoreApi, UseBoundStore } from "zustand";

export const useUserProfileDrawerStore: UseBoundStore<StoreApi<UserProfileDrawerStore>> =
    create<UserProfileDrawerStore>()((set) => ({
        closeDrawer() {
            set({ drawerView: null, addViewCurentTab: undefined, payload: undefined });
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

        drawerView: null,

        addViewCurentTab: "receive",
    }));
