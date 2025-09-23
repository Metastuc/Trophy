import { Address } from "viem";

declare global {
    type AddDrawerTab = "receive" | "send";

    type ProfileScreens = "wallet" | "streams" | "holdings";

    type StreamSelection = "scheduled" | "recorded";

    type Tab<T extends string> = { id: T; label: string; icon?: React.ReactNode };

    type UserProfileDrawerStore = UserProfileDrawerValues & UserProfileDrawerActions;

    type UserProfileDrawerView = "add" | "earned" | "edit" | "withdraw" | null;

    type UserProfileScheduledStream = UserProfileResponse["data"]["scheduledStreams"][number];

    type WalletScreens = "crypto" | "trophs";

    interface UserProfileContextValue {
        isCurrentUser: boolean;
        isPending: boolean;
        profileData: UserProfileResponse["data"];
    }

    interface TabHeader<T extends string> {
        activeTab: T;
        onTabClick: (id: T) => void;
        tabs: Array<Tab<T>>;
        styles?: Record<string, string | ((id: T) => string)>;
    }

    interface UserProfileDrawerActions {
        closeDrawer: () => void;
        openDrawer: ({ view, tab }: { view: Exclude<UserProfileDrawerView, null>; tab?: AddDrawerTab }) => void;
        setAddViewCurentTab: (tab: AddDrawerTab) => void;
    }

    interface UserProfileDrawerValues {
        drawerView: UserProfileDrawerView;
        addViewCurentTab?: AddDrawerTab;
        payload?: UserProfileDrawerPayload;
    }

    interface UserProfileDrawerPayload {
        token: string;
        tokenAddress: Address;
    }
}

export {};
