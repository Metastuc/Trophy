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
