import { type QueryStatus } from "@tanstack/react-query";

export type tQueryResponse = {
    data: tUserProfileResponse;
    status: QueryStatus;
};

export type tUserProfileResponse = {
    bio: string;
    tokenBalances: Array<tUserTokenBalance>;
    totalUsdValue: number;
    uploadedPfp: string;
    username: string;
};

type tUserTokenBalance = {
    symbol: tToken;
    balance: string;
    usdValue: number;
    priceChange24h: string;
};
