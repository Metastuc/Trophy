import CountUp from "react-countup";
import { useTradeCreatorTokenContext } from "../hook";

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
                <h3>Top Holders of {token}</h3>
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
                {/* {value} */}
                <CountUp end={Number(value)} duration={1} />
                {suffix}
            </span>

            <h2 className="text-[.625rem] text-white">{title}</h2>
        </article>
    );
}
