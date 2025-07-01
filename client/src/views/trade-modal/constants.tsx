import { BASE, DEGEN, ETHER, USDC, ZORA } from "@/assets/icons";

export const TOKENS = [
    {
        render: (
            <div className="flex items-center justify-center gap-1">
                <aside className="relative">
                    <i className="size-3.5">{ETHER()}</i>
                    <i className="size-2 absolute bottom-0 right-0">{BASE()}</i>
                </aside>
                <span>ETH</span>
            </div>
        ),
        title: (
            <div className="flex items-center justify-center gap-1">
                <i className="size-3.5">{ETHER()}</i>
                <span className="pt-0.5 text-xs">ETH</span>
            </div>
        ),
        value: "ETH",
    },

    {
        render: (
            <div className="flex items-center justify-center gap-1">
                <aside className="relative">
                    <i className="size-3.5">{USDC()}</i>
                    <i className="size-2 absolute bottom-0 right-0">{BASE()}</i>
                </aside>
                <span>USDC</span>
            </div>
        ),
        title: (
            <div className="flex items-center justify-center gap-1">
                <i className="size-3.5">{USDC()}</i>
                <span className="pt-0.5 text-xs">USDC</span>
            </div>
        ),
        value: "USDC",
    },

    {
        render: (
            <div className="flex items-center justify-center gap-1">
                <aside className="relative">
                    <i className="size-3.5">{ZORA()}</i>
                    <i className="size-2 absolute bottom-0 right-0">{BASE()}</i>
                </aside>
                <span>ZORA</span>
            </div>
        ),
        title: (
            <div className="flex items-center justify-center gap-1">
                <i className="size-3.5">{ZORA()}</i>
                <span className="pt-0.5 text-xs">ZORA</span>
            </div>
        ),
        value: "ZORA",
    },

    {
        render: (
            <div className="flex items-center justify-center gap-1">
                <aside className="relative">
                    <i className="size-3.5">{DEGEN()}</i>
                    <i className="size-2 absolute bottom-0 right-0">{BASE()}</i>
                </aside>
                <span>DEGEN</span>
            </div>
        ),
        title: (
            <div className="flex items-center justify-center gap-1">
                <i className="size-3.5">{DEGEN()}</i>
                <span className="pt-0.5 text-xs">DEGEN</span>
            </div>
        ),
        value: "DEGEN",
    },
];
