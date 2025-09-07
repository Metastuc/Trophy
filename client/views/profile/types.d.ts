type ProfileScreens = "wallet" | "streams" | "holdings";

type StreamSelection = "scheduled" | "recorded";

type UserProfileScheduledStream = UserProfileResponse["data"]["scheduledStreams"][number];

interface UserProfileContextValue {
    isCurrentUser: true;
    isPending: boolean;
    profileData: UserProfileResponse["data"];
}

interface TabHeader {
    activeTab: string;
    onTabClick: (id: ProfileScreens) => void;
    tabs: Array<{ id: ProfileScreens; label: string; icon?: React.ReactNode }>;
}
