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

    type GuestsInvitations = {
        acceptInvite: (userId: string) => Socket<DefaultEventsMap, DefaultEventsMap>;
        addPendingGuestInvitation: (userId: RedisParticipant["id"]) => void;
        cancelInvite: (userId: RedisParticipant["id"]) => Socket<DefaultEventsMap, DefaultEventsMap>;
        denyInvite: (userId: RedisParticipant["id"]) => Socket<DefaultEventsMap, DefaultEventsMap>;
        incomingInvites: Array<RedisParticipant["id"]>;
        inviteGuest: (userId: RedisParticipant["id"]) => Socket<DefaultEventsMap, DefaultEventsMap>;
        pendingGuestsInvitations: Array<RedisParticipant["id"]>;
        removePendingGuestInvitation: (userId: RedisParticipant["id"]) => void;
        revokeInvite: (userId: RedisParticipant["id"]) => Socket<DefaultEventsMap, DefaultEventsMap>;
        selectedGuests: Array<RedisParticipant["id"]>;
        toggleSelectedGuest: (userId: RedisParticipant["id"]) => void;
    };

    interface LiveStreamGuestInvitationDrawerState {
        searchQuery: string;
        selectedGuests: Array<RedisParticipant["id"]>;
    }

    interface LiveStreamChatMessagesState {
        message: string;
        type: "chat" | "tip";
        user: {
            profileImage: string;
            username: string;
        };
    }

    interface LiveStreamGuestsActionsState {
        pendingGuestsInvitations: Array<RedisParticipant["id"]>;
        selectedGuests: Array<RedisParticipant["id"]>;
        incomingInvites: Array<RedisParticipant["id"]>;
    }
}

export {};
