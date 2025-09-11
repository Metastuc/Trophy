type RedisParticipant = {
    id: string;
    role: Role;
};

type RedisRoom = {
    createdAt: string;
    host: string;
    participants: Array<RedisParticipant>;
    status: string;
    invitedGuests: Array<string>;
};
