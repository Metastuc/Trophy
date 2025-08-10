import { useRemotePeer } from "@huddle01/react";
import { useMemo } from "react";

export function AuthenticatedPeer({ peerId, search }: { peerId: string; search: string }) {
    const { metadata } = useRemotePeer({ peerId }) as { metadata: tStreamUIMetadata };
    const isAuthenticated = Boolean(metadata?.username && metadata.username !== "anon");

    const queryMatches = useMemo(
        function () {
            return isAuthenticated && metadata.username.toLowerCase().includes(search.toLowerCase());
        },
        [isAuthenticated, metadata, search],
    );

    if (!queryMatches || !isAuthenticated) return null;

    return (
        <li className="flex items-center gap-1">
            <span className="flex size-8 items-center justify-center overflow-hidden rounded-full bg-gradient-to-b from-[#6055FF] to-[#3A3399FC]">
                <i className="flex size-7 items-center justify-center">
                    <img
                        src={metadata.userPFP}
                        alt={`${metadata.username}-pfp`}
                        className="rounded-full object-cover"
                    />
                </i>
            </span>
            <span>@{metadata.username}</span>
        </li>
    );
}
