import { PropsWithChildren, useMemo } from "react";

import { UserProfileContext } from "./hooks";

type UserProfileProviderProps = PropsWithChildren<UserProfileContextValue>;

export function UserProfileContextProvider({
    children,
    isCurrentUser,
    isPending,
    profileData,
}: UserProfileProviderProps) {
    const value = useMemo(() => ({ isCurrentUser, isPending, profileData }), [isCurrentUser, isPending, profileData]);
    return <UserProfileContext.Provider value={value}>{children}</UserProfileContext.Provider>;
}
