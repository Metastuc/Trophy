import { create, StoreApi, UseBoundStore } from "zustand";

export const useAuthenticationDrawerStateStore: UseBoundStore<
    StoreApi<tAuthenticationDrawerState>
> = create<tAuthenticationDrawerState>()((set) => ({
    closeDrawer() {
        set({ isOpen: false });
    },

    isOpen: false,

    openDrawer() {
        set({ isOpen: true });
    },

    toggle() {
        set((state) => ({ isOpen: !state.isOpen }));
    },
}));
