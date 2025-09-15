// import { useLocalPeer, usePeerIds } from "@huddle01/react";
import { LiveStreamLocalPeer } from "./local-peer";

export function LiveStreamLayout() {
    // const { peerId: localPeerId } = useLocalPeer();
    // const { peerIds: hostPeerIds } = usePeerIds({ roles: ["host"] });
    // const { peerIds: guestPeerIds } = usePeerIds({ roles: ["guest"] });

    return (
        <div>
            <LiveStreamLocalPeer />
        </div>
    );
}
