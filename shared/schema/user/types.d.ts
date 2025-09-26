import { z } from "zod";

import {
    AUTHENTICATE_USER_RESPONSE_SCHEMA,
    ONBOARD_USER_RESPONSE_SCHEMA,
    USER_NOTIFICATIONS_RESPONSE_SCHEMA,
    UserProfile,
    WALLET_TOKEN_BALANCES_RESPONSE_SCHEMA,
} from ".";

declare global {
    type AuthenticateUserData = z.infer<typeof AUTHENTICATE_USER_RESPONSE_SCHEMA>;
    type AuthenticateUserResponse = ApiResponse<AuthenticateUserData>;

    type OnboardUserData = z.infer<typeof ONBOARD_USER_RESPONSE_SCHEMA>;
    type OnboardUserResponse = ApiResponse<OnboardUserData>;

    type UserProfileData = {
        username: string;
        bio: string | null;
        profilePicture: string;
        walletAddress: string;
        followerCount: number;
        followingCount: number;
        creatorToken?: string | null;
        holdings: UserProfile["holdings"];
        scheduledStreams: UserProfile["streams"];
        email?: string | null;
        xUrl?: string | null;
        ytUrl?: string | null;
    };
    type UserProfileResponse = ApiResponse<UserProfileData>;

    type UserWalletTokenBalancesData = z.infer<typeof WALLET_TOKEN_BALANCES_RESPONSE_SCHEMA>;
    type UserWalletTokenBalancesResponse = ApiResponse<UserWalletTokenBalancesData>;

    type UserNotificationsData = z.infer<typeof USER_NOTIFICATIONS_RESPONSE_SCHEMA>;
    type UserNotificationsResponse = ApiResponse<UserNotificationsData>;
}

export {};
