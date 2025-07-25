interface iProps {
    imageSrc: string;
    imageAlt: string;
}

export function StreamerLive({ imageSrc, imageAlt }: iProps) {
    return (
        <section className="relative flex size-full items-center justify-center">
            <div className="size-full rounded-full bg-gradient-to-br from-[#7638FA] via-[#D300C5] to-[#2B55E2] p-0.25">
                <div className="size-full rounded-full bg-white p-0.25">
                    <div className="size-full rounded-full bg-gray-900 p-0.25">
                        <div className="size-full rounded-full bg-[radial-gradient(circle,_#000000_40%,_#FFFFFF50_100%)] p-0.5">
                            <div className="size-full rounded-full border border-[#DBDFE4]">
                                <img
                                    src={imageSrc}
                                    alt={imageAlt}
                                    className="size-full rounded-full object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="absolute -bottom-[.1875rem] flex items-center justify-center rounded-xs bg-white p-[1px]">
                <div className="bg-blue100 flex h-[.3125rem] w-[.5625rem] items-center justify-center rounded-[1px]">
                    <span className="ml-[.0625rem] h-[4px] text-[.1875rem] text-white">Live</span>
                </div>
            </div>
        </section>
    );
}
