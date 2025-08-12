import { useRemotePeer } from "@huddle01/react";
import { useEffect } from "react";

import { useStreamingUICoHostInvitation, useStreamingUIScreenShare } from ".";

export function CheckAndUpdateCoHostList({ peerId }: { peerId: string }) {
    const { role } = useRemotePeer({ peerId });
    const { setCoHostInvitationState } = useStreamingUICoHostInvitation();
    const { screenShareGuard } = useStreamingUIScreenShare();

    useEffect(
        function () {
            if (role === "coHost") {
                setCoHostInvitationState((state) => ({
                    ...state,
                    activeCoHosts: [...new Set([...state.activeCoHosts, peerId])],
                }));
            } else {
                screenShareGuard({
                    peerIsSharing: false,
                    whoIsSharing: peerId,
                });
            }
        },
        [role, peerId, setCoHostInvitationState, screenShareGuard],
    );

    return null;
}
