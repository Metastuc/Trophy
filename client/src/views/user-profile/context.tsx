import { Context, createContext, PropsWithChildren, useContext } from "react";

interface iUserProfileContext {
    isCurrentUser: boolean;
    streams: tGetUserResponse["streams"];
    user: tGetUserResponse["user"];
}

export const UserProfileContext: Context<iUserProfileContext> = createContext<iUserProfileContext>(
    {} as iUserProfileContext,
);

export function useUserProfileContext() {
    const context: iUserProfileContext = useContext(UserProfileContext);

    if (context === undefined || context === null || !context)
        throw new Error("useUserProfileContext must be used within a UserProfileContextProvider");

    return context;
}

interface iUserProfileContextProvider extends PropsWithChildren {
    isCurrentUser: boolean;
    streams: tGetUserResponse["streams"];
    user: tGetUserResponse["user"];
}

export function UserProfileContextProvider({ children, isCurrentUser, streams, user }: iUserProfileContextProvider) {
    return (
        <UserProfileContext.Provider value={{ isCurrentUser, streams, user }}>{children}</UserProfileContext.Provider>
    );
}
