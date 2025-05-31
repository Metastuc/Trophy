import { type QueryStatus } from "@tanstack/react-query";

export type tQueryResponse = {
    status: QueryStatus;
    data: tUserProfileResponse;
};

export type tUserProfileResponse = {
    epicStream: string;
    pfp: string;
    topHolders: Array<unknown>;
    totalStreams: string;
    username: string;
};
