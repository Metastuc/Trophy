import { Address } from "viem";

declare global {
    interface TradeDrawerContextValues extends Partial<TradeDrawer> {
        drawerData: TradeDrawerDataState;
        isDrawerOpen: boolean;
        isSwapped: boolean;
    }

    interface TradeDrawerContextActions {
        closeDrawer: () => void;
        handleSwap: () => void;
        openDrawer: () => void;
        setDrawerData: React.Dispatch<React.SetStateAction<TradeDrawerDataState>>;
        setIsSwapped: React.Dispatch<React.SetStateAction<boolean>>;
    }

    type TradeDrawerContext = TradeDrawerContextValues & TradeDrawerContextActions;

    interface TradeDrawer {
        streamer?: TradeDrawerStreamer;
    }

    interface TradeDrawerStreamer {
        tokenAddress: Address;
        username: string;
        profilePicture: string;
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
