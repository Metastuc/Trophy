import StreamerDisplay from "@/components/streamer-profile";
import { TradeDrawer } from "@/views/trade-modal";

export default function Component() {
    // const {} = useStreamArticleContext();

    return (
        <header className="flex h-8 items-center justify-between">
            <StreamerDisplay isButton={false} />
            <TradeDrawer />
        </header>
    );
}
