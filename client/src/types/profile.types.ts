import { type QueryStatus } from "@tanstack/react-query";

export type tQueryResponse = {
    data: tUserProfileResponse;
    status: QueryStatus;
};

export type tUserProfileResponse = {
    bio: string;
    epicStream: string;
    pfp: string;
    topHolders: Array<unknown>;
    totalStreams: string;
    username: string;
};
