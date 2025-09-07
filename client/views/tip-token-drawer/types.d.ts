import { Address } from "viem";

declare global {
    interface TipDrawerContextValues extends Partial<TipDrawerProps> {
        isDrawerOpen: boolean;
    }

    interface TipDrawerContextActions {
        closeDrawer: () => void;
        openDrawer: () => void;
    }

    type TipDrawerContextValue = TipDrawerContextValues & TipDrawerContextActions;

    interface TipDrawerProps {
        streamer?: { walletAddress: string; username: string; profilePicture: string };
        trigger?: React.ReactNode;
    }

    interface TipDrawerState {
        amountInToken: string;
        amountInUsd: string;
        senderAvailableBalanceInToken: string;
        senderAvailableBalanceInUsd: string;
        token: string;
        tokenAddress: Address;
    }
}

export {};
