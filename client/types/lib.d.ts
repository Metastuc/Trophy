import { EIP1193Provider } from "@privy-io/react-auth";
import { Address } from "viem";

declare global {
    interface GetWalletClient {
        address: Address;
        provider: EIP1193Provider;
    }
}

export {};
