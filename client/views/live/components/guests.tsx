import { Projector, Search, X } from "lucide-react";
import { ChangeEvent, Fragment, useState } from "react";

import { Button } from "@/components/ui/button";
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer";

import { useLiveStreamContext, useLiveStreamParticipants } from "../hooks";
import { AuthenticatedPeer, SelectedGuests } from "./peers-list";

export function LiveStreamInvitationDrawer() {
    const { closeInvitationDrawer, openInvitationDrawer, isInvitationDrawerOpen } = useLiveStreamContext();
    const { authenticatedStreamers } = useLiveStreamParticipants();

    const [drawerInternalState, setDrawerInternalState] = useState<LiveStreamGuestInvitationDrawerState>(() => ({
        searchQuery: "",
        selectedGuests: [],
    }));

    function handleSearchChange(event: ChangeEvent<HTMLInputElement>) {
        setDrawerInternalState((state) => ({ ...state, searchQuery: event.target.value }));
    }

    function handleInvitationToggle(userId: string) {
        setDrawerInternalState(function (state) {
            const isSelected = state.selectedGuests.includes(userId);
            return {
                ...state,
                selectedGuests: isSelected
                    ? state.selectedGuests.filter((id) => id !== userId)
                    : [...state.selectedGuests, userId],
            };
        });
    }

    console.log("Authenticated Streamers:", authenticatedStreamers);

    return (
        <Drawer
            open={isInvitationDrawerOpen}
            onOpenChange={(isOpen) => (isOpen ? openInvitationDrawer() : closeInvitationDrawer())}
            dismissible={false}
            repositionInputs={false}
        >
            <DrawerContent>
                <DrawerHeader className="relative flex flex-row items-center justify-center">
                    <DrawerTitle className="absolute left-4 flex p-0">
                        <Button variant="ghost" onClick={closeInvitationDrawer} className="size-5 !p-0">
                            <X className="size-5" />
                        </Button>
                    </DrawerTitle>
                    <DrawerDescription className="text-blue100 pt-0.5 text-lg font-medium">
                        Add co-streamers
                    </DrawerDescription>
                </DrawerHeader>

                <DrawerFooter>
                    <header className="border-blue100 space-y-2 rounded-xs border px-3 py-2">
                        {drawerInternalState.selectedGuests.length ? (
                            <div className="flex flex-wrap gap-2">
                                {drawerInternalState.selectedGuests.map((userId) => {
                                    const participant = authenticatedStreamers.find(
                                        (participant) => participant.id === userId,
                                    );
                                    return (
                                        participant && <SelectedGuests key={participant.id} participant={participant} />
                                    );
                                })}
                            </div>
                        ) : null}
                        <div className="flex items-center justify-start gap-1 text-[#060606B2]">
                            <i className="size-4">
                                <Search />
                            </i>
                            <input
                                type="text"
                                placeholder="Search by username"
                                value={drawerInternalState.searchQuery.trim()}
                                onChange={handleSearchChange}
                                className="outline-none"
                            />
                        </div>
                    </header>

                    <footer>
                        <div className="mt-6 mb-3 flex items-center justify-start gap-1">
                            <span className="text-blue100 font-medium">People on your livestream</span>
                            <i className="size-4 text-[#E120E1]">
                                <Projector />
                            </i>
                        </div>

                        <ul className="flex max-h-90 flex-col gap-2 overflow-auto">
                            {authenticatedStreamers
                                .filter((participant) => participant.role !== "host")
                                .map((participant) => (
                                    <Fragment key={participant.id}>
                                        <AuthenticatedPeer
                                            participant={participant}
                                            search={drawerInternalState.searchQuery}
                                            onToggle={() => handleInvitationToggle(participant.id)}
                                            isPending={false} // hook this up later if needed
                                            isCoHost={drawerInternalState.selectedGuests.includes(participant.id)}
                                        />
                                    </Fragment>
                                ))}
                        </ul>
                    </footer>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}
