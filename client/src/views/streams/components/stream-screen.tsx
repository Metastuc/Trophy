import { useLocalPeer } from "@huddle01/react";
import { StreamLayout } from "./stream-layout";

export function StreamScreen() {
    const { role } = useLocalPeer();

    return (
        <section className="border border-green-600">
            <div className="relative h-[13.25rem] w-full">
                <StreamLayout />

                {/* <StreamControls /> */}
                <section>stream: {role}</section>
            </div>
        </section>
    );
}
