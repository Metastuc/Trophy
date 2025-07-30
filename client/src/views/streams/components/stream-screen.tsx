import { StreamLayout } from "./stream-layout";

export function StreamScreen() {
    return (
        <section style={{ backgroundImage: "url(/tv-bg.svg)", backgroundSize: "cover" }}>
            <div className="relative h-[13.25rem] w-full">
                {/* <section className="size-full border-2 border-red-700"> */}
                <StreamLayout />
                {/* </section> */}

                {/* <StreamControls /> */}
                {/* <section>stream: {role}</section> */}
            </div>
        </section>
    );
}
