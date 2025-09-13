import { Address } from "viem";

declare global {
    interface TradeDrawerContextValues extends TradeDrawerProps {
        drawerData: TradeDrawerDataState;
        isDrawerOpen: boolean;
    }

    interface TradeDrawerContextActions {
        closeDrawer: () => void;
        handleSwap: () => void;
        openDrawer: () => void;
        setDrawerData: React.Dispatch<React.SetStateAction<TradeDrawerDataState>>;
    }

    type TradeDrawerContextValue = TradeDrawerContextValues & TradeDrawerContextActions;

    interface TradeDrawerProps {
        streamer?: { tokenAddress: Address; username: string; profilePicture: string };
        trigger?: React.ReactNode;
    }

    interface TradeDrawerDataState {
        buyAmount: string;
        buyBalance: string;
        buyToken: Address;
        sellAmount: string;
        sellBalance: string;
        sellToken: string;
    }
}

export {};
