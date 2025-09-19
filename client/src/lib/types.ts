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
