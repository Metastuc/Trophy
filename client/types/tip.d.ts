import { EIP1193Provider } from "@privy-io/react-auth";
import { Address } from "viem";

declare global {
    interface TipETH {
        amount: string;
        provider: EIP1193Provider;
        recipientAddress: Address;
        senderAddress: Address;
    }

    interface TipERC extends TipETH {
        token: TokenSymbols | string;
        senderAddress: Address;
        tokenAddress: Address;
        // wallet: string;
    }

    type TipToken = Omit<TipERC, "token"> & {
        contractAddress: Address;
        isUSDC?: boolean;
    };
}

export {};
