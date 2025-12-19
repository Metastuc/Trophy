import { EIP1193Provider } from "@privy-io/react-auth";
import { Address } from "viem";

interface SetFieldParams<K extends keyof TransactionStateInner> {
    key: K;
    value: TransactionStateInner[K];
}

interface TransferParams {
    amount?: string;
    percentage?: string;
    provider?: EIP1193Provider;
    recipientAddress?: Address | string;
    senderAddress?: Address;
    token?: TokenSymbols | string;
    tokenAddress?: Address;
}

declare global {
    type TransactionStateInner = Omit<TransactionState, "resetFields" | "setField">;

    type TransactionState = TransferParams & {
        error?: string;
        hash?: Address;
        isLoading: boolean;

        reset: () => void;
        setField: <K extends keyof TransactionStateInner>({ key, value }: SetFieldParams<K>) => void;
        setMultipleStoreValues: (values: Partial<TransactionStateInner>) => void;
        transfer: ({
            address,
            provider,
        }: {
            address: Address;
            provider: EIP1193Provider;
        }) => Promise<Address | undefined>;
    };
}
export {};
