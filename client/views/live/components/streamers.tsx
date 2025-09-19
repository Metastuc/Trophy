import { useLiveStreamParticipants } from "../hooks";
import { LiveStreamLocalPeer } from "./local-peer";
import { LiveStreamRemotePeer } from "./remote-peer";

export function LiveStreamStreamers({ role }: { role: JoinStreamData["role"] }) {
    const { localStreamer, streamerByRole } = useLiveStreamParticipants();

    const allPeers =
        role === "host"
            ? [...(localStreamer?.role === "host" ? [localStreamer] : []), ...streamerByRole.hosts]
            : [...(localStreamer?.role === "guest" ? [localStreamer] : []), ...streamerByRole.guests];

    const tileClass = role === "host" ? "host-tile" : "guest-tile";
    const sorted = [...allPeers].sort((a, b) => (a.peerId as string).localeCompare(b.peerId as string));

    return sorted.map((peer, index) =>
        peer.peerId && peer.peerId === localStreamer?.peerId ? (
            <LiveStreamLocalPeer key={peer.peerId} isLocal tileClass={`${tileClass}-${index + 1}`} />
        ) : (
            peer.peerId && (
                <LiveStreamRemotePeer key={peer.peerId} peerId={peer.peerId} tileClass={`${tileClass}-${index + 1}`} />
            )
        ),
    );
}
