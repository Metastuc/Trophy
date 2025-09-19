import { useLocalPeer, usePeerIds } from "@huddle01/react";

import { useLiveStreamRoles } from "../hooks";
import { LiveStreamLocalPeer } from "./local-peer";
import { LiveStreamRemotePeer } from "./remote-peer";

export function LiveStreamStreamers({ role }: { role: JoinStreamData["role"] }) {
    const { host, guest } = useLiveStreamRoles();

    const { peerId: localPeerId } = useLocalPeer();
    const { peerIds } = usePeerIds({ roles: [role] });

    const isPeerLocal = (role === "host" && host) || (role === "guest" && guest);
    const peersWithRole = isPeerLocal ? [localPeerId, ...peerIds] : peerIds;

    const tileClass = role === "host" ? "host-tile" : "guest-tile";
    const sorted = [...peersWithRole].sort(function (a, b) {
        if (a === null || b === null) return 0;
        return a.localeCompare(b);
    });

    return sorted.map((peerId, index) =>
        peerId && peerId === localPeerId ? (
            <LiveStreamLocalPeer key={peerId} isLocal={isPeerLocal} tileClass={`${tileClass}-${index + 1}`} />
        ) : (
            peerId && <LiveStreamRemotePeer key={peerId} peerId={peerId} tileClass={`${tileClass}-${index + 1}`} />
        ),
    );
}
