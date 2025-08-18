import { Context, createContext, useContext } from "react";

export const LeaderboardStreamerContext: Context<iLeaderboardStreamerContext> =
    createContext<iLeaderboardStreamerContext>({} as iLeaderboardStreamerContext);

export function useLeaderboardStreamerContext() {
    const context = useContext(LeaderboardStreamerContext);

    if (context === undefined || context === null || !context)
        throw new Error("LeaderboardStreamerContext must be used within a LeaderboardStreamerContextProvider");

    return context;
}
