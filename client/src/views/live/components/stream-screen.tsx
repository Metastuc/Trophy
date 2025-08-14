import { StreamControls } from "./stream-controls";
import { StreamLayout } from "./stream-layout";

export function StreamScreen() {
    return (
        <section
            style={{ backgroundImage: "url(/tv-bg.svg)", backgroundSize: "cover" }}
            className="aspect-video"
        >
            <div className="relative aspect-video">
                <StreamControls />
                <StreamLayout />
            </div>
        </section>
    );
}
