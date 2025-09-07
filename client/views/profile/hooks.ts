import { Context, createContext, useContext } from "react";

export const UserProfileContext: Context<UserProfileContextValue> = createContext<UserProfileContextValue>(
    {} as UserProfileContextValue,
);

export function useUserProfileContext() {
    const context: UserProfileContextValue = useContext(UserProfileContext);

    if (context === undefined || context === null || !context)
        throw new Error("useUserProfileContext must be used within a UserProfileContextProvider");

    return context;
}
