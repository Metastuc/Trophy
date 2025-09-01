import { TOKEN_ADDRESSES } from "@/lib/contracts";

declare global {
    type TokenAddresses = keyof typeof TOKEN_ADDRESSES;
}

export {};
