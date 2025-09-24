import { useWallets } from "@privy-io/react-auth";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Address } from "viem";
import { useShallow } from "zustand/shallow";

import { useAuthenticationStore } from "@/hooks/authentication";
import { CLIENT_CONSTANTS } from "@/lib/constants";
import { createCreatorToken } from "@/lib/flaunch";

export function useStreamForm(): UseStreamForm {
    const { wallets } = useWallets();
    const { isAuthenticated, user } = useAuthenticationStore(
        useShallow((state) => ({
            isAuthenticated: state.isAuthenticated,
            user: state.user,
        })),
    );

    const [isCreatingToken, setIsCreatingToken] = useState<boolean>(false);
    const [formState, setFormState] = useState<CreateStreamFormState>(() => ({
        creatorToken: undefined,
        creatorTokenEnabled: false,
        date: "",
        username: "",
        walletAddress: undefined,
    }));

    useEffect(() => {
        if (!user) return;
        setFormState({
            creatorToken: user.backendUserData.user.creatorToken as Address,
            creatorTokenEnabled: !!user.backendUserData.user.creatorToken,
            date: new Date().toISOString(),
            username: user.backendUserData.user.username,
            walletAddress: user.wallet?.address as Address,
        });
    }, [user]);

    async function handleCreatorTokenCreation() {
        if (!formState.creatorToken && formState.creatorTokenEnabled) {
            await wallets[0].switchChain(CLIENT_CONSTANTS.CURRENT_NETWORK.id);
            const provider = await wallets[0].getEthereumProvider();
            if (!provider) throw new Error("No provider found");

            const toastId = toast.loading("Creating creator token...");
            setIsCreatingToken(true);

            try {
                const { creatorToken } = await createCreatorToken({ provider, tokenName: formState.username });
                toast.success("Creator token created!", { id: toastId });
                setFormState((state) => ({ ...state, creatorToken }));

                return creatorToken;
            } catch (error) {
                toast.error("Failed to create token: " + (error as Error).message, {
                    id: toastId,
                });
                throw error;
            } finally {
                setIsCreatingToken(false);
            }
        }
        return formState.creatorToken;
    }

    return { formState, handleCreatorTokenCreation, isAuthenticated, isCreatingToken, setFormState };
}
