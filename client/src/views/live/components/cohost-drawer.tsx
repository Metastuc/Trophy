import { useRemotePeer } from "@huddle01/react";
import { X } from "lucide-react";

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
                    <header>search</header>

                    <footer>
                        <div>
                            <span>People on your livestream</span>
                            <i>icon</i>
                        </div>

                        <section>
                            {allPeers.map((value, index) => (
                                <AuthenticatedPeer key={index} peerId={value} />
                            ))}
                        </section>
                    </footer>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}

function AuthenticatedPeer({ peerId }: { peerId: string }) {
    const { metadata } = useRemotePeer({ peerId }) as { metadata: tStreamUIMetadata };
    const isAuthenticated = Boolean(metadata?.username && metadata.username !== "anon");

    logger({ peerId, metadata });

    if (!isAuthenticated) return null;

    return (
        <article>
            <i className="flex size-7 items-center justify-center rounded-full">
                <img src="" alt="" />
            </i>
            <span>{metadata.username}</span>
        </article>
    );
}
