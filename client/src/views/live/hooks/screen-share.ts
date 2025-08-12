import { useCallback, useRef, useState } from "react";

export function useScreenShareSync(): iScreenShareHandler {
    const [screenSharing, setScreenSharing] = useState<tScreenSharing>(() => ({
        someoneIsSharingTheirScreen: false,
        whoIsSharingTheirScreen: null,
    }));

    const stateRef = useRef(screenSharing);

    const setScreenSharingState = useCallback(function (nextState: tScreenSharing) {
        stateRef.current = nextState;
        setScreenSharing(nextState);
    }, []);

    const screenShareGuard = useCallback(
        function ({ peerIsSharing, whoIsSharing }: { peerIsSharing: boolean; whoIsSharing: string }) {
            if (!whoIsSharing) return;

            const currentState = stateRef.current;

            if (peerIsSharing) {
                if (
                    !currentState.someoneIsSharingTheirScreen ||
                    currentState.whoIsSharingTheirScreen === whoIsSharing
                ) {
                    setScreenSharingState({
                        someoneIsSharingTheirScreen: true,
                        whoIsSharingTheirScreen: whoIsSharing,
                    });
                }

                return;
            }

            if (currentState.whoIsSharingTheirScreen === whoIsSharing) {
                setScreenSharingState({
                    someoneIsSharingTheirScreen: false,
                    whoIsSharingTheirScreen: null,
                });
            }
        },
        [setScreenSharingState],
    );

    return { screenSharing, setScreenSharing, screenShareGuard };
}
