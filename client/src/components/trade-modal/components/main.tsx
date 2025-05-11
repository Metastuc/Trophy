import { truncateWalletAddress } from "@/lib/truncate";
import CountUp from "react-countup";
import { useTradeCreatorTokenContext } from "../hooks";

export default function Component() {
    const { token } = useTradeCreatorTokenContext();

    return (
        <main className="space-y-12 px-4">
            <header className="grid grid-cols-3 place-items-center gap-5.5 max-[25rem]:grid-cols-1">
                <RenderMetric title="Total streams" value="21" />
                <RenderMetric title="Epic stream views" value="542" suffix="k" />
                <RenderMetric title="Troph M.Cap" value="21" suffix="M" />
            </header>

            <footer>
                <h3 className="text-blue100 text-center text-base">Top Holders of {token}</h3>

                <ul className="mt-5 space-y-8">
                    {[...Array(3)].map((_, index) => (
                        <RenderHolders
                            key={index}
                            address={truncateWalletAddress(
                                "0xC4623a82f331eD46c769Be89EBb0d920E6A5cc57",
                            )}
                            amount={233}
                            shares={10.2}
                        />
                    ))}
                </ul>
            </footer>
        </main>
    );
}

interface iMetric {
    suffix?: string;
    title: string;
    value: string;
}

function RenderMetric({ suffix, title, value }: iMetric) {
    return (
        <article className="bg-blue100 flex h-13.5 w-26 flex-col items-center justify-center gap-1 rounded-[.125rem] text-center">
            <span className="text-yellow100 text-lg leading-4.5 font-normal">
                <CountUp end={Number(value)} duration={1} />
                {suffix}
            </span>

            <h2 className="text-[.625rem] text-white">{title}</h2>
        </article>
    );
}

interface iHolder {
    address: string;
    amount: number;
    shares: number;
}

function RenderHolders({ address, amount, shares }: iHolder) {
    const { token } = useTradeCreatorTokenContext();

    return (
        <div className="flex items-center justify-center gap-1.5 text-xs font-light">
            <aside>
                <i className="size-7">
                    <img
                        src="https://www.dummyimage.com/200x200/000/fff"
                        className="rounded-full"
                    />
                </i>
            </aside>

            <aside className="flex gap-1 pt-1">
                <span className="font-normal">{address}</span> holds{" "}
                <span className="font-normal">
                    {amount}
                    <b className="text-[.625rem] font-normal">K</b>{" "}
                </span>{" "}
                {token}{" "}
                <span className="max-[25rem]:hidden">
                    <b className="text-green200 font-normal">{shares}%</b> of total supply
                </span>
            </aside>
        </div>
    );
}
