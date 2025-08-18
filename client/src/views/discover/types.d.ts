type tArrow = "up" | "down";

type tGetLeaderboardResponse = {
    leaderboard: Array<iLeaderboard>;
    dummyData: { leaderboard: Array<iLeaderboard> };
};

interface iHolders {
    holderAddress: string;
    percentage: string;
    symbol: string;
    tokenAmount: string;
}

interface iLeaderboard {
    arrow: tArrow;
    epicStreams: string;
    pfp: string;
    price: string;
    totalStreams: string;
    username: string;
    topHolders: Array<iHolders>;
    mcap: string;
}

interface iStreamLeader extends Partial<iLeaderboard> {
    counter: number;
}

interface iOutcome {
    outcome: tArrow;
    value: string;
}

interface iLeaderboardStreamerContext extends Partial<iLeaderboard> {
    isModalOpen: boolean;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
