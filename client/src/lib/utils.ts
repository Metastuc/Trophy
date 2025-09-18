import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { formatEther } from "viem";

import { APPLICATION_CONSTANTS } from "./constants";
import MoralisClient from "./moralis";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export function resetScroll() {
    window.scrollTo({ top: 0, behavior: "smooth" });
}

export function truncateWalletAddress(address: string) {
    if (!address || address.length <= 10) return address;
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export const toLocaleString = (number: bigint, e2c: boolean = true) => {
    const format = formatEther(number);

    if (!e2c) {
        return format;
    }

    return Number(format).toLocaleString();
};

export const moralisTokenFetch = async (address: string) => {
    const moralis = await MoralisClient();

    const { result } = await moralis.EvmApi.wallets.getWalletTokenBalancesPrice({
        chain: APPLICATION_CONSTANTS.CURRENT_MORALIS_CHAIN,
        address,
    });

    return result;
};
