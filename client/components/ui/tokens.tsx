import { TOKEN_CONFIG } from "#~/store/supported-tokens.ts";

export const TOKENS = Object.entries(TOKEN_CONFIG).map(([key, token]) => ({
    address: token.address,

    render: (
        <div className="flex items-center justify-center gap-1">
            <aside className="relative">
                <img src={token.icon} className="size-3.5" alt={`${token.symbol}-logo`} />
                <img src="/base.svg" className="absolute -right-0.5 -bottom-0.5 size-2" alt="base-logo" />
            </aside>
            <span>{token.symbol}</span>
        </div>
    ),

    title: (
        <div className="flex items-center justify-center gap-1">
            <img src={token.icon} className="size-5" alt={`${token.symbol}-logo`} />
            <span className="pt-0.5 text-xs font-normal text-white" style={{ mixBlendMode: "difference" }}>
                {token.symbol}
            </span>
        </div>
    ),

    value: key,
}));

// eslint-disable-next-line react-refresh/only-export-components
export function getTokens(keys: Array<keyof typeof TOKEN_CONFIG>) {
    return keys.map(function (key) {
        const token = TOKEN_CONFIG[key];

        return {
            address: token.address,

            render: (
                <div className="flex items-center justify-center gap-1">
                    <aside className="relative">
                        <img src={token.icon} className="size-3.5" alt={`${token.symbol}-logo`} />
                        <img src="/base.svg" className="absolute -right-0.5 -bottom-0.5 size-2" alt="base-logo" />
                    </aside>
                    <span>{token.symbol}</span>
                </div>
            ),

            title: (
                <div className="flex items-center justify-center gap-1">
                    <img src={token.icon} className="size-5" alt={`${token.symbol}-logo`} />
                    <span className="pt-0.5 text-base">{token.symbol}</span>
                </div>
            ),

            value: token.symbol,
        };
    });
}
