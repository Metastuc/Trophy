import { useNavigate } from "@tanstack/react-router";

import { LiveSignal } from "@/components/ui/live-signal";

import { useFeedContext } from "../hooks";

export function FeedStreamMain() {
    const navigate = useNavigate();
    const { thumbnail, roomId } = useFeedContext();

    return (
        <main
            className="relative h-53 w-full"
            onClick={() => navigate({ to: `/live/${roomId}`, params: { room: roomId } })}
        >
            <LiveSignal />

            <div
                className="size-full rounded-none"
                style={{
                    backgroundImage: `url(${thumbnail ? thumbnail : "https://trophytv.co/splash.jpg"})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center center",
                }}
            />
        </main>
    );
}
