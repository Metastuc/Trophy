import { DefaultEventsMap } from "socket.io";
import { Socket } from "socket.io-client";

declare global {
    interface LiveStreamContextValues extends Omit<JoinStreamData, "role"> {
        guestInvitations: GuestsInvitations;
        huddleRole: JoinStreamData["role"];
        isHuddleConnected: boolean;
        isInvitationDrawerOpen: boolean;
        permissions: RoomPermissions;
        roomId: string;
        roomParticipants: RoomParticipants;
        roomRole: RoomRoles;
        screenSharing: RoomScreenShareSync;
        serverRole: JoinStreamData["role"];
    }

    interface LiveStreamContextActions {
        closeInvitationDrawer: () => void;
        openInvitationDrawer: () => void;
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
        authenticatedStreamers: RedisParticipant[];
        localStreamer: RedisParticipant | undefined;
        streamerByRole: {
            hosts: RedisParticipant[];
            guests: RedisParticipant[];
            listeners: RedisParticipant[];
        };
    };

    type GuestsInvitations = LiveStreamGuestsActionsState & {
        acceptInvite: (userId: string) => Socket<DefaultEventsMap, DefaultEventsMap>;
        denyInvite: (userId: RedisParticipant["id"]) => Socket<DefaultEventsMap, DefaultEventsMap>;
        handleSearchQuery: (query: string) => void;
        toggleSelectedGuest: (userId: RedisParticipant["id"]) => void;
    };

    type RoomScreenShareSync = {
        someoneIsSharingTheirScreen: boolean;
        startScreenShare: () => void;
        stopScreenShare: () => void;
        whoIsSharingTheirScreen: string | null;
    };

    type LiveStreamLayoutKey =
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

    interface LiveStreamGuestInvitationDrawerState {
        searchQuery: string;
        selectedGuests: Array<RedisParticipant["id"]>;
    }

    interface LiveStreamChatMessagesState {
        message: string;
        type: "chat" | "tip";
        user: { profileImage: string; username: string };
    }

    interface LiveStreamGuestsActionsState {
        activeGuests: Array<RedisParticipant["id"]>;
        incomingInvites: Array<RedisParticipant["id"]>;
        pendingGuests: Array<RedisParticipant["id"]>;
        searchQuery: string;
    }

    interface UpdateLiveStreamGuestsInvitationsState {
        action: "invite" | "cancel" | "accept" | "deny" | "revoke";
        from: RedisParticipant["id"];
        state: LiveStreamGuestsActionsState;
        to?: RedisParticipant["id"];
        username: string;
    }

    interface LiveStreamScreenSharingState {
        someoneIsSharingTheirScreen: boolean;
        whoIsSharingTheirScreen: RedisParticipant["id"] | null;
    }

    interface LiveStreamControlsState {
        isControlsVisible: boolean;
        isTabVisible: boolean;
        viewersCount: number;
    }
}

export {};
