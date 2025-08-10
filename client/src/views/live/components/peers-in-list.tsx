import { useRemotePeer } from "@huddle01/react";
import { UserCheck } from "lucide-react";
import { useMemo } from "react";

export function AuthenticatedPeersList({ onToggle, peerId, search, selected }: iAuthenticatedPeersList) {
    const { metadata } = useRemotePeer<tStreamUIMetadata>({ peerId });
    const isAuthenticated = Boolean(metadata?.username !== "anon");

    const queryMatches = useMemo(
        function () {
            const username = (metadata?.username || "").toLowerCase();
            const query = (search || "").toLowerCase();
            return isAuthenticated && username.includes(query);
        },
        [isAuthenticated, metadata?.username, search],
    );

    if (!queryMatches || !isAuthenticated) return null;

    return (
        <li className="flex items-center gap-1" onClick={onToggle}>
            <span className="flex size-8 items-center justify-center overflow-hidden rounded-full bg-gradient-to-b from-[#6055FF] to-[#3A3399FC]">
                <i className="flex size-7 items-center justify-center">
                    <img
                        src={metadata?.userPFP}
                        alt={`${metadata?.username}-pfp`}
                        className="rounded-full object-cover"
                    />
                </i>
            </span>
            <span>@{metadata?.username}</span>

            {selected ? (
                <i className="text-blue100 ml-auto size-3.5">
                    <UserCheck />
                </i>
            ) : null}
        </li>
    );
}

export function SelectedPeersList({ peerId }: { peerId: string }) {
    const { metadata } = useRemotePeer<tStreamUIMetadata>({ peerId });

    return (
        <li className="flex w-max items-center gap-1 rounded-3xl bg-gray-200 p-1 pr-2">
            <span className="flex size-6 items-center justify-center overflow-hidden rounded-full bg-gradient-to-b from-[#6055FF] to-[#3A3399FC]">
                <i className="flex size-5 items-center justify-center">
                    <img
                        src={metadata?.userPFP}
                        alt={`${metadata?.username}-pfp`}
                        className="rounded-full object-cover"
                    />
                </i>
            </span>
            <span className="text-sm">@{metadata?.username}</span>
        </li>
    );
}
