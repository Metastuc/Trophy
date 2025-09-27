import { useWallets } from "@privy-io/react-auth";
import { Dispatch, SetStateAction, useState } from "react";
import { toast } from "sonner";

import { CLIENT_CONSTANTS } from "@/lib/constants";

export function useCreatorTokenCreation({
    formState,
}: {
    formState: CreateStreamFormState;
    setFormState: Dispatch<SetStateAction<CreateStreamFormState>>;
}) {
    const { wallets } = useWallets();
    const [isCreating, setIsCreating] = useState<boolean>(false);

    async function createCreatorToken({
        ethereumAmountRequired,
        tokensCreatorWillReceieve,
    }: {
        ethereumAmountRequired: bigint;
        tokensCreatorWillReceieve: bigint;
    }) {
        if (!formState.creatorToken && formState.creatorTokenEnabled) {
            await wallets[0].switchChain(CLIENT_CONSTANTS.CURRENT_NETWORK.id);
            const provider = await wallets[0].getEthereumProvider();
            if (!provider) throw new Error("No provider found");

            const toastId = toast.loading("Creating creator token...");
            setIsCreating(true);

            try {
                console.log({ ethereumAmountRequired, tokensCreatorWillReceieve });
            } catch (error) {
                toast.error("Failed to create token: " + (error as Error).message, {
                    id: toastId,
                });
                throw error;
            } finally {
                setIsCreating(false);
            }
        }
    }

    return { createCreatorToken, isCreating };
}
