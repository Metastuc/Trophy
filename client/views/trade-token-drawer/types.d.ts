import { Address } from "viem";

declare global {
    type TokenIdentifier = "ETH" | Address;

    interface TradeSide {
        token: TokenIdentifier;
        type: "native" | "streamer"; // "native" = ETH, "streamer" = streamer token
        amount: string;
        balance: string;
        usdPrice: string;
    }

    interface TradeDrawerDataState {
        from: TradeSide;
        to: TradeSide;
    }

    interface TradeDrawerContextValues extends Partial<TradeDrawer> {
        drawerData: TradeDrawerDataState;
        isDrawerOpen: boolean;
    }

    interface TradeDrawerContextActions {
        closeDrawer: () => void;
        handleSwap: () => void;
        openDrawer: () => void;
        setDrawerData: React.Dispatch<React.SetStateAction<TradeDrawerDataState>>;
        swapSides: () => void;
    }

    type TradeDrawerContextValue = TradeDrawerContextValues & TradeDrawerContextActions;

    interface TradeDrawer {
        streamer?: TradeDrawerStreamer;
    }

    interface TradeDrawerStreamer {
        tokenAddress: Address;
        username: string;
        profilePicture: string;
    }
}

export {};
