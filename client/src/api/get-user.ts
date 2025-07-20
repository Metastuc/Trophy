import { makeRequest } from "@/lib/axios";
import { queryOptions } from "@tanstack/react-query";

export function getUser(data: tGetUserRequest) {
    return queryOptions({
        queryKey: ["get-user", data.username],
        queryFn: async function () {
            return await makeRequest<tGetUserResponse>({
                method: "POST",
                url: `/get-user`,
                data,
            }).then((response) => response.data);
        },
    });
}

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

    stream: {
        roomId: string;
        title: string;
        date?: string;
        status: "Live" | "Scheduled";
        streamer: string;
    };
};
