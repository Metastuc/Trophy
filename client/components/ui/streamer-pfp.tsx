interface StreamerPFPProps {
    imageAlt: string;
    imageSrc: string;
    isLive?: boolean;
}

export function StreamerPFP({ imageSrc, imageAlt, isLive }: StreamerPFPProps) {
    return (
        <section className="relative flex size-full items-center justify-center">
            <div className="size-full rounded-full bg-gradient-to-br from-[#7638FA] via-[#D300C5] to-[#2B55E2] p-0.25">
                <div className="size-full rounded-full bg-white p-0.25">
                    <div className="size-full rounded-full bg-gray-900 p-0.25">
                        <div className="size-full rounded-full bg-[radial-gradient(circle,_#000000_40%,_#FFFFFF50_100%)] p-0.5">
                            <div className="size-full rounded-full border border-[#DBDFE4]">
                                <img src={imageSrc} alt={imageAlt} className="size-full rounded-full object-cover" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {isLive ? (
                <div className="absolute -bottom-[.1875rem] flex items-center justify-center rounded-xs bg-white p-[1px]">
                    <div className="bg-blue100 flex items-center justify-center rounded-[1px] px-0.5">
                        <span className="ml-[.0625rem] text-[.375rem] text-white not-italic">Live</span>
                    </div>
                </div>
            ) : null}
        </section>
    );
}
