import { sdk } from "@farcaster/miniapp-sdk";
import { ReactNode, useEffect } from "react";

export function FarcasterMiniAppProvider({ children }: { children: ReactNode }) {
    useEffect(function () {
        (async function () {
            await sdk.actions.ready();
        })();
    }, []);

    return children;
}
