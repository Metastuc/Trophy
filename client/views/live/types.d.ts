interface LiveStreamContextValues {
    huddleRole: string;
    participants: { id: string; role: string };
    permissions: RoomPermissions;
    profileImage: string;
    roomId: string;
    serverRole: "host" | "guest" | "listener";
    title: string;
    token: string;
    username: string;
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
