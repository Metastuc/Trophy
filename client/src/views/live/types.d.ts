type tRole = "bot" | "coHost" | "guest" | "host" | "listener" | "speaker";

type tRoomStates = "closed" | "connecting" | "connected" | "failed" | "idle" | "left";

type tInviteActions = "accept" | "cancel" | "deny" | "invite" | "revoke";

type tUpdateRole = Record<string, (role: tRole) => void>;

type tStreamLayoutKey =
    | "host-only"
    | "host-only-with-screen"
    | "host-with-one-co-host"
    | "host-with-one-co-host-with-screen"
    | "host-with-two-co-hosts"
    | "host-with-two-co-hosts-with-screen"
    | "host-with-three-co-hosts"
    | "host-with-three-co-hosts-with-screen"
    | "host-with-four-co-hosts"
    | "host-with-four-co-hosts-with-screen"
    | "unsupported";

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
    isPeerAuthenticated: boolean;
    isPeerSharingTheirScreen: boolean;
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
    screenShareHandler: iScreenShareHandler;
    setIsCoHostDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setUserHasToggled: React.Dispatch<React.SetStateAction<tUserHasToggled>>;
    viewerCount: number;
}

interface iAuthenticatedPeersList {
    onToggle: () => void;
    peerId: string;
    search: string;
    isPending: boolean;
    isCoHost: boolean;
}

interface iDrawerInternalState {
    searchQuery: string;
    selectedPeersAsCoHost: Array<string>;
}

interface iCoHostInvitationState {
    acceptedPeerId: string | null;
    activeCoHosts: Array<string>;
    pendingInvitations: Array<string>;
    pendingRoleUpdates: Array<{ peerId: string; role: tRole }>;
}

interface iCoHostInvitationHandler {
    coHostInvitationState: iCoHostInvitationState;
    sendCoHostInvite: ({ peerID }: { peerID: string }) => void;
    cancelCoHostInvite: ({ peerID }: { peerID: string }) => void;
    revokeCoHostInvite: ({ peerID }: { peerID: string }) => void;
    acceptCoHostInvite: ({ hostID }: { hostID: string }) => void;
    denyCoHostInvite: ({ hostID }: { hostID: string }) => void;
    setCoHostInvitationState: React.Dispatch<React.SetStateAction<iCoHostInvitationState>>;
}

interface iRoleUpdater {
    peerId: string;
    role: tRole;
    onRoleUpdate: (peerID: string) => void;
}

interface iScreenShareHandler {
    screenSharing: tScreenSharing;
    setScreenSharing: React.Dispatch<React.SetStateAction<tScreenSharing>>;
    screenShareGuard: ({ peerIsSharing, whoIsSharing }: { peerIsSharing: boolean; whoIsSharing: string }) => void;
}
