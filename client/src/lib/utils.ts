import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { moralisChain } from "./constants";
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

export const moralisTokenFetch = async (address: string) => {
    const moralis = await MoralisClient();

    const { result } = await moralis.EvmApi.wallets.getWalletTokenBalancesPrice({
        chain: moralisChain,
        address,
    });

    return result;
}