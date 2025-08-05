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

interface iStreamingUIPermissions {
    canEndStream: boolean;
    canInvite: boolean;
    canShareScreen: boolean;
    canToggleAudio: boolean;
    canToggleChat: boolean;
    canToggleVideo: boolean;
}

interface iRoomRoles {
    host: boolean;
    coHost: boolean;
    speaker: boolean;
    listener: boolean;
    guest: boolean;
    bot: boolean;
}

interface iStreamingUIContext {
    viewerCount: number;
    permissions: iStreamingUIPermissions;
    roomRoles: iRoomRoles;
    setUserHasToggled: React.Dispatch<React.SetStateAction<{ audio: boolean; video: boolean }>>;
    // setScreenSharing: React.Dispatch<
    //     React.SetStateAction<{ someoneIsSharingTheirScreen: boolean; whoIsSharingTheirScreen: string | null }>
    // >;
}
