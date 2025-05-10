import { CLOSE } from "@/assets/icons";
import { cn } from "@/lib/utils";
import { useTradeCreatorTokenContext } from "../hook";

export default function Component() {
    const { setIsOpen } = useTradeCreatorTokenContext();

    return (
        <header className="relative flex h-18 items-center justify-between">
            <figure className="absolute -z-10 -left-0.5 -top-0.5">{icon}</figure>

            <div className="flex w-full items-center justify-between pr-4 pl-6">
                <aside className="flex items-center gap-0.5">
                    <i className="size-8 rounded-full bg-gradient-to-b from-[#6055FF] to-[#3A3399]">
                        <img
                            src="https://www.dummyimage.com/200x200/000/fff"
                            alt="user-pfp"
                            className={cn("user-pfp", "rounded-full")}
                        />

                        {/* <Skeleton className={cn("user-pfp", "rounded-full")} /> */}
                    </i>

                    <span className="text-base text-white font-normal">@username</span>
                </aside>

                <aside className="flex items-center justify-center">
                    <button onClick={() => setIsOpen?.(false)}>
                        <i className="size-6">{CLOSE()}</i>
                    </button>
                </aside>
            </div>
        </header>
    );
}

const icon = (
    <svg
        width={360}
        height={72}
        viewBox="0 0 360 72"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <foreignObject x={-18.6518} y={-18.6518} width={397.304} height={109.304}>
            <svg
                xmlns="http://www.w3.org/1999/xhtml"
                style={{
                    backdropFilter: "blur(9.33px)",
                    height: "100%",
                    width: "100%",
                }}
                clipPath="url(#bgblur_0_341_1105_clip_path)"
            />
        </foreignObject>
        <path
            data-figma-bg-blur-radius={18.6518}
            d="M110.257 0H360l-16.5 17.5h-38l-42 54.5H23.025L0 47.294V0h110.257z"
            fill="#204CE1"
            fillOpacity={0.95}
        />
        <defs>
            <clipPath id="bgblur_0_341_1105_clip_path" transform="translate(18.652 18.652)">
                <path d="M110.257 0H360l-16.5 17.5h-38l-42 54.5H23.025L0 47.294V0h110.257z" />
            </clipPath>
        </defs>
    </svg>
);
