type tGetLeaderboardResponse = {
    leaderboard: Array<iLeaderboard>;
};

interface iHolders {
    holderAddress: string;
    percentage: string;
    symbol: string;
    tokenAmount: string;
}

interface iLeaderboard {
    arrow: string;
    epicStreams: string;
    mcap: string;
    pfp: string;
    price: string | number;
    topHolders: Array<iHolders>;
    totalStreams: number;
    username: string;
}
