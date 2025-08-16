import { useLeaderboardStreamerContext } from "../hooks";

export function MarketCapFooter() {
    const { username, topHolders } = useLeaderboardStreamerContext();

    return (
        <footer>
            <h3 className="text-blue100 text-center text-base font-normal">
                Top holders of <span className="capitalize">{username}</span>
            </h3>

            <ul className="my-5 flex flex-col items-center gap-8">
                {topHolders?.map((value, index) => (
                    <li key={index} className="flex w-full items-center justify-start gap-1 px-7.5 text-xs font-light">
                        <img src={`holder-${index}.svg`} alt={`holder-${index}`}  className="size-7"/>
                        <span className="font-normal">{value.holderAddress}</span> holds{" "}
                        <span className="font-normal">{value.tokenAmount}</span>{" "}
                        <b className="font-normal">{value.symbol}</b>{" "}
                        <span className="text-[#2DC24E]">{value.percentage}</span> of total supply
                    </li>
                ))}
            </ul>
        </footer>
    );
}
