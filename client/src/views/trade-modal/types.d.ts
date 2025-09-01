interface TradeDrawerContextValues extends Partial<TradeDrawer> {
    isDrawerOpen: boolean;
}

interface TradeDrawerContextActions {
    closeDrawer: () => void;
    openDrawer: () => void;
}

type TradeDrawerContext = TradeDrawerContextValues & TradeDrawerContextActions;

interface TradeDrawer {
    streamer?: TradeDrawerStreamer;
}

interface TradeDrawerStreamer {
    tokenAddress: string;
    username: string;
    profilePicture: string;
}
