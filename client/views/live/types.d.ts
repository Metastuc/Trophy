interface LiveStreamContextValues extends Omit<JoinStreamData, "role"> {
    huddleRole: JoinStreamData["role"];
    isHuddleConnected: boolean;
    permissions: RoomPermissions;
    roomId: string;
    roomRole: RoomRoles;
    serverRole: JoinStreamData["role"];
}

interface LiveStreamContextActions {}

type LiveStreamContextValue = LiveStreamContextActions & LiveStreamContextValues;

type RoomPermissions = {
    canEndStream: boolean;
    canInvite: boolean;
    canShareScreen: boolean;
    canToggleAudio: boolean;
    canToggleChat: boolean;
    canToggleVideo: boolean;
};

type RoomRoles = {
    host: boolean;
    guest: boolean;
    listener: boolean;
};

interface LiveStreamChatMessagesState {
    message: string;
    type: "chat" | "tip";
    user: {
        profileImage: string;
        username: string;
    };
}
