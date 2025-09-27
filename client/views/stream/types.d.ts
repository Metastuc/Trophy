import { Address } from "viem";

declare global {
    type StreamAction = "now" | "schedule";

    interface TabButtonProps {
        handleClick: () => void;
        icon: React.ReactNode;
        isActive: boolean;
        ref: React.RefCallback<HTMLLIElement>;
        text: string;
    }

    interface CreateStreamFormRequest {
        date: string;
        title: string;
        username: string;

        [key: string]: unknown;
    }

    interface CreateStreamFormState {
        creatorToken?: Address;
        creatorTokenEnabled?: boolean;
        date: string;
        username: string;
        walletAddress?: Address;
    }

    interface DateTimePickerState {
        isOpen: boolean;
        date?: Date;
        time: string;
    }

    interface UseStreamForm {
        formState: CreateStreamFormState;
        handleCreatorTokenCreation: ({
            ethereumAmountRequired,
            tokensCreatorWillReceieve,
        }: {
            ethereumAmountRequired: bigint;
            tokensCreatorWillReceieve: bigint;
        }) => Promise<Address | undefined>;
        isAuthenticated: boolean;
        isCreatingToken: boolean;
        setFormState: React.Dispatch<React.SetStateAction<CreateStreamFormState>>;
    }

    interface CreateStreamDrawerState {
        isDrawerOpen: boolean;
        pendingData: CreateStreamFormRequest | null;
        form: {
            allocationInPercentage: string;
            approximateAmountInUSD: string;
            approxmateAmountInToken: string;
            token: string;
            tokenAddress: Address;
            ethereumAmountRequired: bigint;
            tokensCreatorWillReceieve: bigint;
        };
    }

    interface CreateStreamDrawerProps {
        isOpen: boolean;
        isSubmitting: boolean;
        onClose: () => void;
        onSubmit: () => void;
        formState: CreateStreamDrawerState["form"];
        setFormState: (form: Partial<CreateStreamDrawerState["form"]>) => void;
    }
}

export {};
