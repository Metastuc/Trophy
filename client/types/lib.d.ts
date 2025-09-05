import { EIP1193Provider } from "@privy-io/react-auth";
import { Address } from "viem";

declare global {
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
