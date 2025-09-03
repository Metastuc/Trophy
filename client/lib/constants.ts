import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();

export const ENV_SCHEMA = {
    PRIVY_APP_ID: import.meta.env.VITE_PRIVY_APP_ID as string,
    PRIVY_CLIENT_ID: import.meta.env.VITE_PRIVY_CLIENT_ID as string,
};

export const API_ENDPOINTS = {
    AUTHENTICATION: {
        ONBOARD: "/authentication/onboard",
        USER: "/authentication/user",
    },

    FEED: {
        GET_FEED: "/streams/feed",
    },

    USER: {
        GET_USER: (userId: string) => `/user/profile/${userId}`,
        UPDATE_USER: (userId: string) => `/user/${userId}`,
        ME: "/user/me",
    },

    STREAMS: {
        CREATE_STREAM: "/streams/create",
        JOIN_STREAM: (streamId: string) => `/streams/${streamId}/join`,
        LEAVE_STREAM: "/streams/leave",
    },
};
