type tJoinStreamRequest = {
    roomId: string;
    username?: string;
};

type tJoinStreamResponse = {
    message: string;
    token: string;
};

type tGetStreamRequest = {
    roomId: string;
};

type tGetStreamResponse = {
    creatorAddress: string;
    creatorToken?: string;
    streamer: string;
    title: string;
};

type tRole = "host" | "coHost" | "speaker" | "listener" | "guest" | "bot";

type tRoomStates = "idle" | "connecting" | "connected" | "failed" | "left" | "closed";

type tUserHasToggled = {
    audio: boolean;
    video: boolean;
};

type tScreenSharing = {
    someoneIsSharingTheirScreen: boolean;
    whoIsSharingTheirScreen: string | null;
};

interface iStreamingUIPermissions {
    canEndStream: boolean;
    canInvite: boolean;
    canShareScreen: boolean;
    canToggleAudio: boolean;
    canToggleChat: boolean;
    canToggleVideo: boolean;
}

interface iRoomRoles {
    bot: boolean;
    coHost: boolean;
    guest: boolean;
    host: boolean;
    listener: boolean;
    speaker: boolean;
}

interface iStreamingUIContext {
    permissions: iStreamingUIPermissions;
    roomRoles: iRoomRoles;
    screenSharing: tScreenSharing;
    setScreenSharing: React.Dispatch<React.SetStateAction<tScreenSharing>>;
    setUserHasToggled: React.Dispatch<React.SetStateAction<tUserHasToggled>>;
    viewerCount: number;
}
