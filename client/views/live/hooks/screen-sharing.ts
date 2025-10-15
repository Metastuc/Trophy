import { useLocalScreenShare } from "@huddle01/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { useSocket } from "@/hooks/socket";

export function useRoomScreenShareSync({ roomId, username }: { roomId: string; username: string }) {
    const socket = useSocket();
    const { shareStream, startScreenShare: huddleStart, stopScreenShare: huddleStop } = useLocalScreenShare();

    const [screenSharing, setScreenSharing] = useState<LiveStreamScreenSharingState>(() => ({
        someoneIsSharingTheirScreen: false,
        whoIsSharingTheirScreen: null,
    }));

    useEffect(() => {
        socket.on("room.screen.share.started", async function ({ userId }: { userId: string }) {
            if (userId === username) {
                try {
                    await huddleStart();
                    setScreenSharing({ someoneIsSharingTheirScreen: true, whoIsSharingTheirScreen: userId });
                } catch (error) {
                    toast.error(error instanceof Error ? error.message : "Failed to start screen share.");
                    socket.emit("room.screen.share.stop", { roomId, userId: username });
                }
            }
        });

        socket.on("room.screen.share.stopped", async function ({ userId }: { userId: string }) {
            if (userId === username && shareStream) {
                try {
                    await huddleStop();
                    setScreenSharing({ someoneIsSharingTheirScreen: false, whoIsSharingTheirScreen: null });
                } catch (error) {
                    toast.error(error instanceof Error ? error.message : "Failed to stop screen share.");
                }
            }
        });

        socket.on("room.screen.share.denied", ({ message }: { message: string }) => toast.error(message));

        return () => {
            socket.off("room.screen.share.started");
            socket.off("room.screen.share.stopped");
            socket.off("room.screen.share.denied");
        };
    }, [socket, huddleStart, huddleStop, shareStream, roomId, username]);

    function startScreenShare() {
        if (!screenSharing.whoIsSharingTheirScreen) {
            socket.emit("room.screen.share.start", { roomId, userId: username });
        }
    }

    function stopScreenShare() {
        if (screenSharing.whoIsSharingTheirScreen === username) {
            socket.emit("room.screen.share.stop", { roomId, userId: username });
        }
    }

    return {
        ...screenSharing,
        startScreenShare,
        stopScreenShare,
    };
}
