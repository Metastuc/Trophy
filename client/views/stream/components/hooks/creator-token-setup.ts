import { useState } from "react";
import { toast } from "sonner";

import { TOKENS } from "@/components/ui/tokens";

import { useCreatorTokenCreation } from "./creator-token-creation";
import { useStreamFormState } from "./form-state";
import { useUserDefault } from "./user-defaults";

export function useCreatorTokenSetup({ formState, setFormState }: ReturnType<typeof useStreamFormState>) {
    useUserDefault(setFormState);
    const { createCreatorToken, isCreating } = useCreatorTokenCreation({ formState, setFormState });

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
        if (!drawerState.form.allocationInPercentage) {
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
