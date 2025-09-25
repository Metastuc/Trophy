import { EIP1193Provider } from "@privy-io/react-auth";
import { Address } from "viem";

type MessageProp = {
    name: string;
    type: string;
};

type MessageTypes = {
    [additionalProperties: string]: MessageProp[];
};

type TypedDataParams<T extends MessageTypes> = {
    types: T;
    primaryType: keyof T;
    domain: {
        name?: string;
        version?: string;
        chainId?: number;
        verifyingContract?: string;
        salt?: ArrayBuffer;
    };
    message: Record<string, unknown>;
};

type SignTypedDataParams = TypedDataParams<MessageTypes>;

export type SignTypedData = (
    input: SignTypedDataParams,
    options: { address: string },
) => Promise<{
    signature: string;
}>;

export interface createTokenParams {
    address: Address;
    ethAmount: bigint;
    name: string;
    provider: EIP1193Provider;
    tokens: bigint;
};

export interface claimTokenParams {
    provider: EIP1193Provider;
    coinAddress: Address;
    address: Address;
};