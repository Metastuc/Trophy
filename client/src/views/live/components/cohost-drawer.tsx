import { Projector, Search, X } from "lucide-react";
import { ChangeEvent, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer";

import { useStreamingUICoHostInvitation, useStreamingUIContext } from "../hooks";
import { RoleUpdater } from "./invitation";
import { AuthenticatedPeersList, SelectedPeersList } from "./peers-in-list";

export function CoHostDrawer() {
    const { isCoHostDrawerOpen, setIsCoHostDrawerOpen, allPeers } = useStreamingUIContext();
    const { acceptCoHostInvite, coHostInvitationState, denyCoHostInvite, sendCoHostInvite } =
        useStreamingUICoHostInvitation();

    const [drawerInternalState, setDrawerInternalState] = useState<iDrawerInternalState>(() => ({
        searchQuery: "",
        selectedPeersAsCoHost: [],
    }));

    function handleSearchQueryInputChange(event: ChangeEvent<HTMLInputElement>) {
        setDrawerInternalState((state) => ({ ...state, searchQuery: event.target.value }));
    }

    function handleTogglePeerAsCoHost(peerId: string) {
        // const isPeerSelectedAsCoHost = drawerInternalState.selectedPeersAsCoHost.includes(peerId);

        // setDrawerInternalState((state) => ({
        //     ...state,
        //     selectedPeersAsCoHost: isPeerSelectedAsCoHost
        //         ? state.selectedPeersAsCoHost.filter((id) => id !== peerId)
        //         : [...state.selectedPeersAsCoHost, peerId],
        // }));

        if (!drawerInternalState.selectedPeersAsCoHost.includes(peerId)) {
            sendCoHostInvite({ peerID: peerId });
        }
    }

    useEffect(
        function () {
            setDrawerInternalState((state) => ({
                ...state,
                selectedPeersAsCoHost: [
                    ...coHostInvitationState.pendingInvitations,
                    ...coHostInvitationState.activeCoHosts,
                ],
            }));
        },
        [coHostInvitationState.pendingInvitations, coHostInvitationState.activeCoHosts],
    );

    return (
        <Drawer
            open={isCoHostDrawerOpen}
            onOpenChange={setIsCoHostDrawerOpen}
            dismissible={false}
            repositionInputs={false}
        >
            <DrawerContent>
                <DrawerHeader className="relative flex flex-row items-center justify-center">
                    <DrawerTitle className="absolute left-4 flex p-0">
                        <Button variant="ghost" onClick={() => setIsCoHostDrawerOpen(false)} className="size-5 !p-0">
                            <X className="size-5" />
                        </Button>
                    </DrawerTitle>
                    <DrawerDescription className="text-blue100 pt-0.5 text-lg font-medium">
                        Add co-streamers
                    </DrawerDescription>
                </DrawerHeader>

                {coHostInvitationState.activeCoHosts.length
                    ? coHostInvitationState.activeCoHosts.map(
                          (peerId) => peerId && <RoleUpdater key={peerId} peerId={peerId} role="coHost" />,
                      )
                    : null}

                <DrawerFooter>
                    <header className="border-blue100 space-y-2 rounded-xs border px-3 py-2">
                        {drawerInternalState.selectedPeersAsCoHost.length ? (
                            <div className="flex flex-wrap gap-2">
                                {drawerInternalState.selectedPeersAsCoHost.map(
                                    (value) => value && <SelectedPeersList key={value} peerId={value} />,
                                )}
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
                                onChange={handleSearchQueryInputChange}
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
                            {allPeers.map(
                                (value) =>
                                    value && (
                                        <AuthenticatedPeersList
                                            key={value}
                                            peerId={value}
                                            search={drawerInternalState.searchQuery}
                                            onToggle={() => handleTogglePeerAsCoHost(value)}
                                            selected={drawerInternalState.selectedPeersAsCoHost.includes(value)}
                                        />
                                    ),
                            )}
                        </ul>
                    </footer>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}
