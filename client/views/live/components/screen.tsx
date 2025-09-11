import { LiveStreamControls } from "./controls";
import { LiveStreamLayout } from "./layout";

export function LiveStreamScreen() {
    return (
        <section style={{ backgroundImage: "url(/tv-bg.svg)", backgroundSize: "cover" }} className="aspect-video">
            <div className="relative aspect-video">
                <LiveStreamControls />
                <LiveStreamLayout />
            </div>
        </section>
    );
}
