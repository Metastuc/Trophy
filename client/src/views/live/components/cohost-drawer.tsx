import { useRemotePeer } from "@huddle01/react";
import { X } from "lucide-react";
import { ChangeEvent, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer";
import { logger } from "@/utils/logger";

import { useStreamingUIContext } from "../hooks";

export function CoHostDrawer() {
    const { isCoHostDrawerOpen, setIsCoHostDrawerOpen, allPeers } = useStreamingUIContext();
    const [searchQuery, setSearchQuery] = useState<string>("");

    logger({ allPeers });

    return (
        <Drawer
            open={isCoHostDrawerOpen}
            onOpenChange={setIsCoHostDrawerOpen}
            dismissible={false}
            repositionInputs={false}
        >
            <DrawerContent>
                <DrawerHeader className="flex flex-row items-center justify-start">
                    <DrawerTitle className="flex">
                        <Button variant="ghost" onClick={() => setIsCoHostDrawerOpen(false)}>
                            <X />
                        </Button>
                    </DrawerTitle>
                    <DrawerDescription className="text-blue100 text-base font-medium">
                        Add co-streamers
                    </DrawerDescription>
                </DrawerHeader>

                <DrawerFooter>
                    <header>
                        <div>display</div>
                        <div>
                            <i></i>
                            <input
                                type="text"
                                placeholder="Search by username"
                                value={searchQuery.trim()}
                                onChange={(event: ChangeEvent<HTMLInputElement>) => setSearchQuery(event.target.value)}
                            />
                        </div>
                    </header>

                    <footer>
                        <div>
                            <span>People on your livestream</span>
                            <i>icon</i>
                        </div>

                        <section className="flex max-h-90 flex-col gap-2 overflow-auto">
                            {allPeers.map((value, index) => (
                                <PeerMetadataFetcher key={index} peerId={value} search={searchQuery} />
                            ))}
                        </section>
                    </footer>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}

function PeerMetadataFetcher({ peerId, search }: { peerId: string; search: string }) {
    const { metadata } = useRemotePeer({ peerId }) as { metadata: tStreamUIMetadata };
    const isAuthenticated = Boolean(metadata?.username && metadata.username !== "anon");

    const queryMatches = useMemo(
        function () {
            return isAuthenticated && metadata.username.toLowerCase().includes(search.toLowerCase());
        },
        [isAuthenticated, metadata, search],
    );

    if (!queryMatches || !isAuthenticated) return null;

    return <AuthenticatedPeer {...metadata} />;
}

function AuthenticatedPeer({ userPFP, username }: tStreamUIMetadata) {
    return (
        <article className="flex items-center gap-1">
            <span className="flex size-8 items-center justify-center overflow-hidden rounded-full bg-gradient-to-b from-[#6055FF] to-[#3A3399FC]">
                <i className="flex size-7 items-center justify-center">
                    <img src={userPFP} alt={`${username}-pfp`} className="rounded-full object-cover" />
                </i>
            </span>
            <span>@{username}</span>
        </article>
    );
}
