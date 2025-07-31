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
