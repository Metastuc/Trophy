import { Address } from "viem";

export function truncateWalletAddress(address: Address) {
    if (!address || address.length <= 10) return address;
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
}
