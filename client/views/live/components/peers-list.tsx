import { UserCheck, UserX } from "lucide-react";

interface AuthenticatedPeersProps {
    isCoHost: boolean;
    isPending: boolean;
    onToggle: () => void;
    participant: RedisParticipant;
    search: string;
}

export function AuthenticatedPeer({ isCoHost, isPending, onToggle, participant, search }: AuthenticatedPeersProps) {
    const queryMatches = participant.id.toLowerCase().includes(search.toLowerCase());
    if (participant.isGuest || !queryMatches) return null;

    return (
        <li className="flex items-center gap-1" onClick={onToggle}>
            <span className="flex size-8 items-center justify-center overflow-hidden rounded-full bg-gradient-to-b from-[#6055FF] to-[#3A3399FC]">
                <i className="flex size-7 items-center justify-center">
                    <img
                        src={participant.profileImage as string}
                        alt={`${participant.id}-pfp`}
                        className="rounded-full object-cover"
                    />
                </i>
            </span>
            <span>@{participant.id}</span>

            {isCoHost && (
                <i className="text-blue100 ml-auto size-4">
                    <UserCheck />
                </i>
            )}

            {isPending && (
                <i className="text-blue100 ml-auto size-4">
                    <UserX />
                </i>
            )}
        </li>
    );
}

export function SelectedGuests({ participant }: { participant: RedisParticipant }) {
    return (
        <li className="flex w-max items-center gap-1 rounded-3xl bg-gray-200 p-1 pr-2">
            <span className="flex size-6 items-center justify-center overflow-hidden rounded-full bg-gradient-to-b from-[#6055FF] to-[#3A3399FC]">
                <i className="flex size-5 items-center justify-center">
                    <img
                        src={participant.profileImage as string}
                        alt={`${participant.id}-pfp`}
                        className="rounded-full object-cover"
                    />
                </i>
            </span>
            <span className="text-sm">@{participant.id}</span>
        </li>
    );
}
