import { BadgeDollarSign, BanknoteArrowDown, Receipt } from "lucide-react";

export function UserWallet() {
    return (
        <section>
            <header>
                <span className="text-xs">Total Money</span>
                <b className="text-2xl">$0</b>
                <div>
                    <i></i>
                    <span>0.00%</span>
                </div>
            </header>

            <main className="mt-5 mb-7.5 flex items-center gap-5">
                <button className="bg-blue100 flex h-8 w-25 items-center justify-center gap-1 rounded-sm text-white">
                    <span className="pt-0.5 text-xs">Add money</span>
                    <i className="size-3">
                        <BadgeDollarSign />
                    </i>
                </button>

                <button className="bg-blue100 flex h-8 w-25 items-center justify-center gap-1 rounded-sm text-white">
                    <span className="pt-0.5 text-xs">Withdraw</span>
                    <i className="size-3 text-[#FE1313]">
                        <BanknoteArrowDown />
                    </i>
                </button>

                <div className="bg-blue100 flex h-8 w-25 items-center justify-center gap-1 rounded-sm text-white">
                    <i className="size-3">
                        <Receipt />
                    </i>
                    <b className="pt-0.75 text-xs font-normal text-[#2DC24E]">{"0.00"}</b>
                    <span className="pt-0.5 text-xs">earned</span>
                </div>
            </main>

            <footer></footer>
        </section>
    );
}
// w-22 h-7.5
