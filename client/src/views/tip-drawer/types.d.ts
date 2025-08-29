interface TipDrawerContextValues extends Partial<TipDrawer> {
    isDrawerOpen: boolean;
}

interface TipDrawerContextActions {
    closeDrawer: () => void;
    openDrawer: () => void;
}

type TipDrawerContext = TipDrawerContextValues & TipDrawerContextActions;

interface TipDrawer {
    streamerWalletAddress?: string;
}
