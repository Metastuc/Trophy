import { Address } from "viem";

declare global {
    interface TipDrawerContextValues extends Partial<TipDrawerProps> {
        isDrawerOpen: boolean;
        tipDrawerState: TipDrawerState;
    }

    interface TipDrawerContextActions {
        closeDrawer: () => void;
        openDrawer: () => void;
        setTipDrawerState: React.Dispatch<React.SetStateAction<TipDrawerState>>;
        handleSendTip: () => Promise<void>;
    }

    type TipDrawerContextValue = TipDrawerContextValues & TipDrawerContextActions;

    interface TipDrawerProps {
        streamer?: { walletAddress: Address; username: string; profilePicture: string };
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

    interface TipDrawerWalletState {
        provider?: EIP1193Provider;
        address?: Address;
        walletType?: string;
    }
}

export {};
