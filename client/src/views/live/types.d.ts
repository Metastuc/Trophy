type tRole = "host" | "coHost" | "speaker" | "listener" | "guest" | "bot";

type tRoomStates = "idle" | "connecting" | "connected" | "failed" | "left" | "closed";

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

type tUserHasToggled = {
    audio: boolean;
    video: boolean;
};

type tScreenSharing = {
    someoneIsSharingTheirScreen: boolean;
    whoIsSharingTheirScreen: string | null;
};

type tStreamUIMetadata = {
    username: string;
    userPFP: string;
    userPeerID: string;
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
    allPeers: string[];
    coHostInvitationHandler: iCoHostInvitationHandler;
    isCoHostDrawerOpen: boolean;
    permissions: iStreamingUIPermissions;
    roomRoles: iRoomRoles;
    screenSharing: tScreenSharing;
    setIsCoHostDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setScreenSharing: React.Dispatch<React.SetStateAction<tScreenSharing>>;
    setUserHasToggled: React.Dispatch<React.SetStateAction<tUserHasToggled>>;
    viewerCount: number;
}

interface iAuthenticatedPeersList {
    onToggle: () => void;
    peerId: string;
    search: string;
    selected: boolean;
}

interface iDrawerInternalState {
    searchQuery: string;
    selectedPeersAsCoHost: Array<string>;
}

interface iCoHostInvitationState {
    pendingInvitations: Array<string>;
    acceptedPeerId: string | null;
}

interface iCoHostInvitationHandler {
    acceptCoHostInvite: (hostID: string) => void;
    coHostInvitationState: iCoHostInvitationState;
    denyCoHostInvite: (hostID: string) => void;
    sendCoHostInvite: (peerID: string) => void;
}
