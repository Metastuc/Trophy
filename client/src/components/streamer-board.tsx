import TradeDrawer from "@/components/trade-drawer";

interface iStreamerBoard {
    counter: number;
}

export default function Component({ counter }: iStreamerBoard) {
    return (
        <section className="bg-white100 flex h-17 items-center justify-between rounded-[.125rem]">
            <aside></aside>

            <TradeDrawer />
        </section>
    );
}
