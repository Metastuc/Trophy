import { getAccessToken } from "@privy-io/react-auth";
import { useEffect } from "react";

import { useAuthenticationStore } from "@/hooks/authentication";

export function useRunningInBrowser() {
    const setToken = useAuthenticationStore((state) => state.setToken);

    useEffect(
        function () {
            async function handleFocus() {
                try {
                    const token = await getAccessToken();
                    setToken(token as string);
                } catch (error) {
                    console.warn("Session expired:", error);
                }
            }

            window.addEventListener("focus", handleFocus);
            return () => window.removeEventListener("focus", handleFocus);
        },
        [setToken],
    );

    // this is a hack to make the app work on faracster android mini app
    useEffect(function () {
        try {
            // @ts-expect-error navigator.__defineGetter__ is not defined in the TypeScript type definitions
            const os = navigator?.userAgentData?.platform;

            if (os !== "android") {
                // @ts-expect-error navigator.__defineGetter__ is not defined in the TypeScript type definitions
                navigator.__defineGetter__(
                    "userAgent",
                    () =>
                        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Safari/605.1.15",
                );
            } else {
                // @ts-expect-error navigator.__defineGetter__ is not defined in the TypeScript type definitions
                navigator.__defineGetter__(
                    "userAgent",
                    () =>
                        "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Mobile Safari/537.36",
                );
            }
        } catch (error) {
            console.error("Error defining getter for navigator:", error);
        }
    }, []);
}
