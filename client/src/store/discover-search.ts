import { create, type StoreApi, type UseBoundStore } from "zustand";

interface iUseDiscoverSearchStore {
    isVisible: boolean;
    toggleIsVisible: () => void;
}

export const useDiscoverSearchStore: UseBoundStore<StoreApi<iUseDiscoverSearchStore>> = create<iUseDiscoverSearchStore>(
    (set) => ({
        isVisible: false,
        toggleIsVisible: () => set((state) => ({ isVisible: !state.isVisible })),
    }),
);
