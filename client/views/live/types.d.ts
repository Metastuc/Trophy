interface LiveStreamContextValues {
    roomId: string;
    permissions: RoomPermissions;
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
