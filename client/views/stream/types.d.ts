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
        date: string;
        username: string;
        walletAddress?: Address;
        creatorToken?: Address;
        creatorTokenEnabled?: boolean;
    }

    interface DateTimePickerState {
        isOpen: boolean;
        date?: Date;
        time: string;
    }

    interface UseStreamForm {
        formState: CreateStreamFormState;
        handleCreatorTokenCreation: () => Promise<Address | undefined>;
        isAuthenticated: boolean;
        isCreatingToken: boolean;
        setFormState: React.Dispatch<React.SetStateAction<CreateStreamFormState>>;
    }
}

export {};
