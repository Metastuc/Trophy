import { useState } from "react";
import { toast } from "sonner";
import { useShallow } from "zustand/shallow";

import { TOKENS } from "@/components/ui/tokens";
import { useAuthenticationStore } from "@/hooks/authentication";
import { CLIENT_ENV } from "@/lib/constants";

import { useCreatorTokenCreation } from "./creator-token-creation";
import { useStreamFormState } from "./form-state";
import { useUserDefault } from "./user-defaults";

export function useCreatorTokenSetup({
    formState,
    setFormState,
    mutate,
}: ReturnType<typeof useStreamFormState> & {
    mutate: (data: CreateStreamFormRequest) => void;
}) {
    useUserDefault(setFormState);
    const { createCreatorToken, isCreating } = useCreatorTokenCreation({ formState, setFormState });
    const { tokenImage } = useAuthenticationStore(
        useShallow((state) => ({
            tokenImage: state.user?.backendUserData.user.profilePicture,
        })),
    );

    const [drawerState, setDrawerState] = useState<CreateStreamDrawerState>(() => ({
        form: {
            allocationInPercentage: "",
            approximateAmountInUSD: "",
            approxmateAmountInToken: "",
            ethereumAmountRequired: BigInt(0),
            token: TOKENS[0].value,
            tokenAddress: TOKENS[0].address,
            tokensCreatorWillReceieve: BigInt(0),
        },
        isDrawerOpen: false,
        pendingData: null,
    }));

    async function handleDrawerSubmit() {
        if (tokenImage?.trim().toLowerCase() === CLIENT_ENV.VITE_DEFAULT_IMAGE.trim().toLowerCase()) {
            toast.error("Please set a profile picture before creating a creator token");
            return;
        }

        if (
            drawerState.form.allocationInPercentage.trim() === "" ||
            isNaN(Number(drawerState.form.allocationInPercentage))
        ) {
            toast.error("Allocation percentage is required");
            return;
        }

        if (!drawerState.pendingData) {
            toast.error("No pending stream data");
            return;
        }

        await createCreatorToken({
            ethereumAmountRequired: drawerState.form.ethereumAmountRequired,
            tokensCreatorWillReceieve: drawerState.form.tokensCreatorWillReceieve,
        });

        mutate({
            ...drawerState.pendingData,
            creatorToken: formState.creatorToken,
        });
    }

    return {
        drawerState,
        formState,
        handleDrawerSubmit,
        isCreating,
        setDrawerState,
        setFormState,
    };
}
