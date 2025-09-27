import { Dispatch, SetStateAction, useEffect } from "react";
import { Address } from "viem";

import { useAuthenticationStore } from "@/hooks/authentication";

export function useUserDefault(setFormState: Dispatch<SetStateAction<CreateStreamFormState>>) {
    const user = useAuthenticationStore((state) => state.user);

    useEffect(
        function () {
            if (!user) return;

            setFormState((state) => ({
                ...state,
                creatorToken: user?.backendUserData.user.creatorToken as Address | undefined,
                creatorTokenEnabled: !!user?.backendUserData.user.creatorToken,
                date: new Date().toISOString(),
                username: user?.backendUserData.user.username as string,
                walletAddress: user?.wallet?.address as Address | undefined,
            }));
        },
        [user, setFormState],
    );
}
