import { Address } from "viem";

import { API_ENDPOINTS } from "@/lib/constants";
import { makeRequest } from "#~/utils/axios.ts";

export async function getMyProfile(): Promise<UserProfileData> {
    return await makeRequest<UserProfileResponse>({ method: "GET", url: API_ENDPOINTS.USER.ME }).then(
        (response) => response.data.data,
    );
}

export async function getUserProfile(data: { username: string }) {
    return await makeRequest<UserProfileResponse>({
        method: "GET",
        url: API_ENDPOINTS.USER.GET_USER(data.username),
    }).then((response) => response.data.data);
}

export async function getUserWalletTokenBalances(data: {
    walletAddress: Address;
}): Promise<UserWalletTokenBalancesData> {
    return await makeRequest<UserWalletTokenBalancesResponse>({
        method: "GET",
        url: API_ENDPOINTS.USER.GET_WALLET_TOKEN_BALANCES(data.walletAddress),
    }).then((response) => response.data.data);
}

export async function getUserNotifications(data: { username: string }): Promise<UserNotificationsData> {
    return await makeRequest<UserNotificationsResponse>({
        method: "GET",
        url: API_ENDPOINTS.USER.NOTIFICATIONS(data.username),
    }).then((response) => response.data.data);
}
