import { DefaultEventsMap } from "socket.io";
import { Socket } from "socket.io-client";

declare global {
    interface LiveStreamContextValues extends Omit<JoinStreamData, "role"> {
        huddleRole: JoinStreamData["role"];
        isHuddleConnected: boolean;
        isInvitationDrawerOpen: boolean;
        permissions: RoomPermissions;
        roomId: string;
        roomParticipants: RoomParticipants;
        roomRole: RoomRoles;
        serverRole: JoinStreamData["role"];
        guestInvitations: GuestsInvitations;
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
}

export {};
