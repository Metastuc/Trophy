type tTradeDrawerState = {
    isOpen: boolean;
};

type tTradeDrawerActions = {
    openDrawer: () => void;
    closeDrawer: () => void;
};

type tTradeDrawerStateStore = tTradeDrawerState & tTradeDrawerActions;
