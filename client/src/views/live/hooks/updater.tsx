import { useRemotePeer } from "@huddle01/react";
import { useEffect } from "react";

import { useStreamingUICoHostInvitation } from ".";

export function CheckAndUpdateCoHostList({ peerId }: { peerId: string }) {
    const { role } = useRemotePeer({ peerId });
    const { setCoHostInvitationState } = useStreamingUICoHostInvitation();

    useEffect(
        function () {
            if (role === "coHost")
                setCoHostInvitationState((state) => ({
                    ...state,
                    activeCoHosts: [...new Set([...state.activeCoHosts, peerId])],
                }));
        },
        [role, peerId, setCoHostInvitationState],
    );

    return null;
}
