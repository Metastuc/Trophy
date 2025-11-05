import { Address } from "viem";

type OpenDrawerParams = {
    payload?: UserProfileDrawerPayload;
    tab?: AddDrawerTab;
    view?: UserProfileDrawerView;
};

declare global {
    type AddDrawerTab = "receive" | "send";

    type ProfileScreens = "wallet" | "streams" | "holdings";

    type RecieverTabState = {
        amountInToken: string;
        percentage: string | null;
        reciever: string;
    };

    type StreamSelection = "scheduled" | "recorded";

    type Tab<T extends string> = { id: T; label: string; icon?: React.ReactNode; disabled?: boolean };

    type UserProfileDrawerStore = UserProfileDrawerValues & UserProfileDrawerActions;

    type UserProfileDrawerView = "add" | "earned" | "edit" | "withdraw" | undefined;

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
        openDrawer: ({ payload, tab, view }: OpenDrawerParams) => void;
        setAddViewCurentTab: (tab: AddDrawerTab) => void;
        setTotalUsdBalance: (balance: string) => void;
    }

    interface UserProfileDrawerValues {
        addViewCurentTab?: AddDrawerTab;
        drawerView: UserProfileDrawerView;
        payload?: UserProfileDrawerPayload;
        totalUsdBalance: string;
    }

    interface UserProfileDrawerPayload {
        balanceInToken: string;
        balanceInUSD: string;
        token: string;
        tokenAddress: Address;
    }

    interface UserProfileWithdrawState extends RecieverTabState {
        token: string;
    }
}

export {};
