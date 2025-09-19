interface LiveStreamContextValues extends Omit<JoinStreamData, "role"> {
    huddleRole: JoinStreamData["role"];
    isHuddleConnected: boolean;
    permissions: RoomPermissions;
    roomId: string;
    roomRole: RoomRoles;
    serverRole: JoinStreamData["role"];
    isInvitationDrawerOpen: boolean;
    roomParticipants: RoomParticipants;
}

interface LiveStreamContextActions {
    openInvitationDrawer: () => void;
    closeInvitationDrawer: () => void;
}

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

type RoomParticipants = {
    localStreamer: RedisParticipant | undefined;
    remoteStreamers: RedisParticipant[];
    hosts: RedisParticipant[];
    guests: RedisParticipant[];
    listeners: RedisParticipant[];
    remoteHosts: RedisParticipant[];
    remoteGuests: RedisParticipant[];
    remoteListeners: RedisParticipant[];
};

interface LiveStreamChatMessagesState {
    message: string;
    type: "chat" | "tip";
    user: {
        profileImage: string;
        username: string;
    };
}
