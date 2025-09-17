// import { Address } from "viem";

// declare global {
//     interface TradeDrawerContextValues extends Partial<TradeDrawer> {
//         drawerData: TradeDrawerDataState;
//         isDrawerOpen: boolean;
//         isSwapped: boolean;
//     }

//     interface TradeDrawerContextActions {
//         closeDrawer: () => void;
//         handleSwap: () => void;
//         openDrawer: () => void;
//         setDrawerData: React.Dispatch<React.SetStateAction<TradeDrawerDataState>>;
//         setIsSwapped: React.Dispatch<React.SetStateAction<boolean>>;
//     }

//     type TradeDrawerContext = TradeDrawerContextValues & TradeDrawerContextActions;

//     interface TradeDrawer {
//         streamer?: TradeDrawerStreamer;
//     }

//     interface TradeDrawerStreamer {
//         tokenAddress: Address;
//         username: string;
//         profilePicture: string;
//     }

//     interface TradeDrawerDataState {
//         buyAmount: string;
//         buyBalance: string;
//         buyToken: Address;
//         sellAmount: string;
//         sellBalance: string;
//         sellToken: Address;
//     }
// }

// export {};

import { Address } from "viem";

declare global {
    // one side of the trade (either a token or streamer)

    type TokenIdentifier = "ETH" | `0x${string}`;

    interface TradeSide {
        token: TokenIdentifier;
        type: "native" | "streamer"; // "native" = ETH, "streamer" = streamer token
        amount: string;
        balance: string;
        usdPrice: string;
    }

    // overall state
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

    type TradeDrawerContext = TradeDrawerContextValues & TradeDrawerContextActions;

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
