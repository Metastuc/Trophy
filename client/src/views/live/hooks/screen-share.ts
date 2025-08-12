import { useDataMessage } from "@huddle01/react";
import { useCallback, useState } from "react";

import { logger } from "@/utils/logger";

export function useScreenShareSync({ peerIds }: { peerIds: string[] }): iScreenShareHandler {
    const [screenSharing, setScreenSharing] = useState<tScreenSharing>(() => ({
        someoneIsSharingTheirScreen: false,
        whoIsSharingTheirScreen: null,
    }));

    logger("this is running on init");

    const { sendData } = useDataMessage({
        onMessage(payload, from, label) {
            if (label !== "SCREEN_SHARE") return;

            logger("[Screen Share]", { from, payload, label });

            if (payload === "start") {
                // setScreenSharing({
                //     someoneIsSharingTheirScreen: true,
                //     whoIsSharingTheirScreen: from,
                // });
            } else if (payload === "stop") {
                // setScreenSharing({
                //     someoneIsSharingTheirScreen: false,
                //     whoIsSharingTheirScreen: null,
                // });
            }
        },
    });

    const sendScreenShareMessage = useCallback(
        function (action: "start" | "stop") {
            sendData({
                to: peerIds,
                payload: action,
                label: "SCREEN_SHARE",
            });
        },
        [peerIds, sendData],
    );

    return { screenSharing, setScreenSharing, sendScreenShareMessage };
}
