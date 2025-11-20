import { Address, isAddress } from "viem";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

import { TOKEN_CONFIG } from "#~/store/supported-tokens.ts";
import { tipERC20, tipEther } from "@/lib/tip";
import { getBaseName } from "@/lib/viem";

export const useTransactionStore = create<TransactionState>()(
    immer((set, get) => ({
        amount: undefined,
        error: undefined,
        hash: undefined,
        isLoading: false,
        percentage: undefined,
        provider: undefined,
        recipientAddress: undefined,
        senderAddress: undefined,
        token: "ETH",
        tokenAddress: TOKEN_CONFIG["ETH"].address,

        reset() {
            set((state: TransactionStateInner) => {
                state.amount = undefined;
                state.error = undefined;
                state.hash = undefined;
                state.isLoading = false;
                state.percentage = undefined;
                state.recipientAddress = undefined;
                state.token = "ETH";
                state.tokenAddress = TOKEN_CONFIG["ETH"].address;
            });
        },

        setField({ key, value }) {
            set(function (state: TransactionStateInner) {
                state[key] = value;
            });
        },

        setMultipleStoreValues(values: Partial<TransactionStateInner>) {
            set((state: TransactionStateInner) => {
                Object.assign(state, values);
            });
        },

        async transfer({ address, provider }) {
            let basenameAddress: Address | undefined;
            const { amount, recipientAddress, token, tokenAddress } = get();

            if (!provider || !address || !recipientAddress || !amount || !token || !tokenAddress) {
                set({ error: "Missing required fields" });
                throw new Error(get().error);
            }

            set({ error: undefined, isLoading: true });

            if (typeof recipientAddress === "string" && !isAddress(recipientAddress)) {
                const address = await getBaseName({ name: recipientAddress });
                if (!address) {
                    set({ error: "Invalid recipient address", isLoading: false });
                    throw new Error(get().error);
                }

                basenameAddress = address;
            } else basenameAddress = recipientAddress;

            try {
                if (token === "ETH") {
                    set({
                        hash: await tipEther({
                            amount,
                            provider,
                            recipientAddress: basenameAddress,
                            senderAddress: address,
                        }),
                    });
                    return get().hash;
                } else {
                    set({
                        hash: await tipERC20({
                            amount,
                            provider,
                            recipientAddress: basenameAddress,
                            senderAddress: address,
                            token,
                            tokenAddress,
                        }),
                    });
                    return get().hash;
                }
            } catch (error) {
                console.error(error);
                set({ error: "Failed to transfer", isLoading: false });
                throw new Error(get().error);
            }
        },
    })),
);
