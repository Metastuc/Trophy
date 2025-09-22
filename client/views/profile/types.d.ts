type ProfileScreens = "wallet" | "streams" | "holdings";

type StreamSelection = "scheduled" | "recorded";

type UserProfileScheduledStream = UserProfileResponse["data"]["scheduledStreams"][number];

type UserProfileDrawerView = "add" | "earned" | "edit" | "withdraw" | null;

interface UserProfileContextValue {
    isCurrentUser: boolean;
    isPending: boolean;
    profileData: UserProfileResponse["data"];
}

interface TabHeader {
    activeTab: string;
    onTabClick: (id: ProfileScreens) => void;
    tabs: Array<{ id: ProfileScreens; label: string; icon?: React.ReactNode }>;
}

interface UserProfileDrawerStore {
    drawerView: UserProfileDrawerView;
    closeDrawer: () => void;
    openDrawer: ({ view }: { view: Exclude<UserProfileDrawerView, null> }) => void;
}
