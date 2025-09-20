type RedisParticipant = {
    id: string;
    role: Role;
    peerId?: string;
    profileImage?: string | null;
    isGuest?: boolean;
};

type RedisRoom = {
    createdAt: string;
    host: string;
    participants: Array<RedisParticipant>;
    status: string;
    invitedGuests: Array<string>;
};
