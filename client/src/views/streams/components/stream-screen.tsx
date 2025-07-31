import { StreamControls } from "./stream-controls";
import { StreamLayout } from "./stream-layout";

export function StreamScreen() {
    return (
        <section style={{ backgroundImage: "url(/tv-bg.svg)", backgroundSize: "cover" }}>
            <div className="relative h-[13.25rem] w-full">
                <StreamLayout />
                <StreamControls />
            </div>
        </section>
    );
}
