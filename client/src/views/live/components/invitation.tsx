import { useRemotePeer } from "@huddle01/react";
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

import { useStreamingUICoHostInvitation, useStreamingUIRoles } from "../hooks";

export function CoHostInvitation() {
    const { coHostInvitationState } = useStreamingUICoHostInvitation();
    const { host } = useStreamingUIRoles();

    if (coHostInvitationState.pendingInvitations.length === 0 || host) {
        console.log("Viewer: Popup not rendered - Host:", host, "Pending:", coHostInvitationState.pendingInvitations);
        return null;
    }

    return coHostInvitationState.pendingInvitations.map(
        (peerId) => peerId && <RenderPopup key={peerId} peerId={peerId} />,
    );
}

function RenderPopup({ peerId }: { peerId: string }) {
    const { metadata } = useRemotePeer<tStreamUIMetadata>({ peerId });
    const [isPopupOpen, setIsPopupOpen] = useState<boolean>(true);
    const { denyCoHostInvite } = useStreamingUICoHostInvitation();

    function handleAccept() {
        console.log(`Viewer: Accepted invite from ${peerId} (${metadata?.username || "unknown"})`);
        setIsPopupOpen(false);
    }

    function handleDecline() {
        console.log(`Viewer: Declined invite from ${peerId} (${metadata?.username || "unknown"})`);
        denyCoHostInvite({ hostID: peerId });
        setIsPopupOpen(false);
    }

    function UserProfile() {
        return (
            <span className="inline-flex items-center justify-center gap-0.5">
                <span className="flex size-6 items-center justify-center overflow-hidden rounded-full bg-gradient-to-b from-[#FFFFFF] via-[#FFFFFFFD] to-[#3A3399FC]">
                    <i className="flex size-5 items-center justify-center">
                        <img
                            src={metadata?.userPFP}
                            alt={`${metadata?.username}-pfp`}
                            className="rounded-full object-cover"
                        />
                    </i>
                </span>
                <span>@{metadata?.username}</span>
            </span>
        );
    }

    return (
        <AlertDialog open={isPopupOpen} onOpenChange={setIsPopupOpen}>
            <AlertDialogContent className="bg-blue100 top-[25%] border-none text-white">
                <AlertDialogHeader>
                    <AlertDialogTitle>Co-Stream Invitation!</AlertDialogTitle>
                    <AlertDialogDescription className="flex items-center justify-center gap-1 text-white">
                        <UserProfile /> is inviting you to co-stream
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="flex-row items-center justify-between">
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
