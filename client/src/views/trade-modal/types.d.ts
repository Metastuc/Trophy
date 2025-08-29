type tTradeDrawerState = {
    isOpen: boolean;
};

type tTradeDrawerActions = {
    openDrawer: () => void;
    closeDrawer: () => void;
};

type tTradeDrawerStateStore = tTradeDrawerState & tTradeDrawerActions;

interface iTradeDrawerContext {
    isDrawerOpen: boolean;
    openDrawer: () => void;
    closeDrawer: () => void;
}

interface iTradeDrawer {
    tokenAddress?: string;
    image?: string;
    name?: string;
}
