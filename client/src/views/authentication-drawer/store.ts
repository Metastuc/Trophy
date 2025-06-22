import { create, StoreApi, UseBoundStore } from "zustand";

export const useAuthenticationDrawerStateStore: UseBoundStore<
    StoreApi<tAuthenticationDrawerState>
> = create<tAuthenticationDrawerState>()((set) => ({
    isOpen: false,

    closeDrawer() {
        set({ isOpen: false });
    },

    openDrawer() {
        set({ isOpen: true });
    },
}));

export const useAuthenticationDrawerNavigationStore: UseBoundStore<
    StoreApi<tAuthenticationNavigationState>
> = create<tAuthenticationNavigationState>()((set, get) => ({
    screen: "default",

    screenStack: ["default"],

    back() {
        const newStack = [...get().screenStack];
        newStack.pop();

        const previousScreen = newStack[newStack.length - 1] || "default";

        set({
            screen: previousScreen,
            screenStack: newStack,
            email: previousScreen === "otp" ? get().email : undefined,
        });
    },

    goToDefault() {
        set({
            screen: "default",
            screenStack: [...get().screenStack, "default"],
        });
    },

    goToEmail() {
        set({
            screen: "email",
            screenStack: [...get().screenStack, "email"],
        });
    },

    goToFarcaster() {
        set({
            screen: "farcaster",
            screenStack: [...get().screenStack, "farcaster"],
        });
    },

    goToFinish() {
        set({
            screen: "finish",
            screenStack: [...get().screenStack, "finish"],
        });
    },

    goToOtp(email) {
        set({
            screen: "otp",
            screenStack: [...get().screenStack, "otp"],
            email,
        });
    },

    goToWallet() {
        set({
            screen: "wallet",
            screenStack: [...get().screenStack, "wallet"],
        });
    },
}));

export const useAuthenticationDrawerFormStore: UseBoundStore<StoreApi<iAuthenticationFormState>> =
    create<iAuthenticationFormState>((set) => ({
        bio: null,

        email: null,

        isNewUser: false,

        profilePicture: null,

        username: null,

        setField(field, value) {
            set((state) => ({ ...state, [field]: value }));
        },

        setIsNewUser(isNewUser) {
            set({ isNewUser });
        },

        resetForm() {
            set({ bio: null, email: null, privyId: null, profilePicture: null, username: null });
        },
    }));
