import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { formatToken, formatUSD, getPriceInQuantity, truncateText } from "@/lib/utils";

interface TradeInputProps {
    tokens: { value: string; title: string; render: React.ReactNode }[];
    data: TradeSide;
    isFrom: boolean;
    label: "Buy" | "Sell";
    onAmountChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onTokenChange: (value: TokenIdentifier) => void;
    streamer: TradeDrawerStreamer;
}

export function TradeInput({ tokens, data, isFrom, label, onAmountChange, onTokenChange, streamer }: TradeInputProps) {
    const showStreamerInfo =
        label === "Buy" && streamer?.tokenAddress && data.token?.toLowerCase() === streamer.tokenAddress.toLowerCase();

    console.log({ showStreamerInfo });

    return (
        <article className="border-blue100 flex items-end justify-between rounded-xl border-2 px-3 py-2">
            <aside className="flex flex-col gap-3">
                <input
                    type="text"
                    placeholder="0.00"
                    value={data.amount}
                    onChange={onAmountChange}
                    readOnly={!isFrom}
                    className="outline-none"
                />
                <span className="text-xs text-black/60">
                    {formatUSD(
                        getPriceInQuantity({ price: data.usdPrice ?? "0", quantity: data.amount ?? "0" }).toString(),
                    )}
                </span>
            </aside>

            <aside className="flex flex-col items-center gap-2">
                <span>{label}</span>

                {!showStreamerInfo ? (
                    <Select value={data.token} onValueChange={onTokenChange}>
                        <SelectTrigger className="border-blue100 w-27 rounded-xl p-2">
                            <SelectValue>{tokens.find((token) => token.value === data.token)?.title}</SelectValue>
                        </SelectTrigger>

                        <SelectContent>
                            {tokens.map((token, index) => (
                                <SelectItem key={index} value={token.value}>
                                    {token.render}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                ) : (
                    <div className="border-blue100 flex w-27 items-center justify-center gap-1 rounded-xl border px-2 py-1.75">
                        <i className="size-5 shrink-0 overflow-hidden rounded-full">
                            <img src={streamer?.profilePicture} className="object-cover" />
                        </i>

                        <span className="pt-0.5 text-xs">
                            {truncateText({ text: streamer?.username, maxLength: 12 })}
                        </span>
                    </div>
                )}

                <span className="text-xs text-black/60">Balance: {formatToken(data.balance || "0")}</span>
            </aside>
        </article>
    );
}
