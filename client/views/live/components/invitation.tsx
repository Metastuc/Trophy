import { PhoneCall } from "lucide-react";
import { useState } from "react";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";

import { useLiveStreamGuests, useLiveStreamParticipants, useLiveStreamRoles } from "../hooks";

export function LiveStreamGuestInvitation() {
    const { host } = useLiveStreamRoles();
    const { incomingInvites } = useLiveStreamGuests();

    if (incomingInvites.length === 0 || host) {
        return null;
    }

    return incomingInvites.map((peerId) => peerId && <RenderPopup key={peerId} peerId={peerId} />);
}

function UserProfile({ id, profileImage }: { id: string; profileImage: string }) {
    return (
        <span className="inline-flex items-center justify-center gap-0.5">
            <span className="flex size-6 items-center justify-center overflow-hidden rounded-full bg-linear-to-b from-[#FFFFFF] via-[#FFFFFFFD] to-[#3A3399FC]">
                <i className="flex size-5 items-center justify-center">
                    <img src={profileImage} alt={`${id}-pfp`} className="rounded-full object-cover" />
                </i>
            </span>

            <span>@{id}</span>
        </span>
    );
}

function RenderPopup({ peerId }: { peerId: string }) {
    const [isPopupOpen, setIsPopupOpen] = useState<boolean>(true);

    const { authenticatedStreamers } = useLiveStreamParticipants();
    const { acceptInvite, denyInvite } = useLiveStreamGuests();

    const metadata = authenticatedStreamers.find((streamer) => streamer.id === peerId);
    if (!metadata) return null;

    function handleAccept() {
        acceptInvite(peerId);
        setIsPopupOpen(false);
    }

    function handleDecline() {
        denyInvite(peerId);
        setIsPopupOpen(false);
    }

    return (
        <AlertDialog open={isPopupOpen} onOpenChange={setIsPopupOpen}>
            <AlertDialogContent className="bg-blue100 top-[25%] border-none text-white">
                <AlertDialogHeader>
                    <AlertDialogTitle>Co-Stream Invitation!</AlertDialogTitle>

                    <AlertDialogDescription className="flex items-center justify-center gap-1 text-white">
                        <UserProfile id={metadata.id} profileImage={metadata.profileImage as string} /> is inviting you
                        to co-stream
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter className={cn("flex-row items-center justify-between", "sm:justify-center")}>
                    <AlertDialogAction className="text-blue100 h-10 w-28 bg-white" onClick={handleAccept}>
                        Accept
                    </AlertDialogAction>

                    <i className="size-5">
                        <PhoneCall />
                    </i>

                    <AlertDialogCancel className="text-blue100 h-10 w-28 bg-white" onClick={handleDecline}>
                        Decline
                    </AlertDialogCancel>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
