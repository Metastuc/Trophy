// import { type QueryStatus } from "@tanstack/react-query";

// export type tQueryResponse = {
//     data: tUserProfileResponse;
//     status: QueryStatus;
// };

// export type tUserProfileResponse = {
//     bio: string;
//     tokenBalances: Array<tUserTokenBalance>;
//     totalUsdValue: number;
//     uploadedPfp: string;
//     username: string;
// };

type tUserTokenBalance = {
    symbol: tToken;
    balance: string;
    usdValue: number;
    priceChange24h: string;
};

type tGetUserRequest = {
    username: string;
};

type tGetUserResponse = {
    message: string;

    user: {
        privyId: string;
        username: string;
        email: string;
        userPfp: string;
        walletAddress: string;
        totalStreams: number;
        bio: string;
        totalFees: number;
        xUrl?: string;
        YTUrl?: string;
        followers: string[];
        following: string[];
        creatorToken?: string;
        videoTokenAddresses: string[];
    };

    streams: {
        roomId: string;
        title: string;
        date?: string;
        status: "Live" | "Scheduled";
        streamer: string;
    }[];
};
