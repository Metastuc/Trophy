import { create, StoreApi, UseBoundStore } from "zustand";

export const useUserProfileDrawerStore: UseBoundStore<StoreApi<UserProfileDrawerStore>> =
    create<UserProfileDrawerStore>()((set) => ({
        closeDrawer() {
            set({ drawerView: null });
        },

        openDrawer({ view }) {
            set({ drawerView: view });
        },

        drawerView: null,
    }));
