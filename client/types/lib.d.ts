import { EIP1193Provider } from "@privy-io/react-auth";
import { Address } from "viem";

import { CONTRACT_ADDRESSES } from "#~/store/supported-tokens.ts";

declare global {
    type TokenAddresses = keyof typeof CONTRACT_ADDRESSES;

    interface GetWalletClient {
        address: Address;
        provider: EIP1193Provider;
    }

    interface CreateCreatorToken {
        provider: EIP1193Provider;
        tokenName: string;
    }

    interface CreatorTokenCreated {
        creatorToken: Address;
        smartAccount: Address;
    }

    interface BuyCreatorToken {
        amount: string;
        buyerAddress: Address;
        provider: EIP1193Provider;
        tokenAddress: Address;
    }
}

export {};
