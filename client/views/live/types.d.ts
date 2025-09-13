interface LiveStreamContextValues extends Omit<JoinStreamData, "role"> {
    huddleRole: JoinStreamData["role"];
    permissions: RoomPermissions;
    roomId: string;
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

interface LiveStreamChatMessagesState {
    message: string;
    type: "chat" | "tip";
    user: {
        profileImage: string;
        username: string;
    };
}
