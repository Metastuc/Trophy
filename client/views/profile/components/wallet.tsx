import { BadgeDollarSign, BanknoteArrowDown, Receipt } from "lucide-react";

import { ARROW_DOWN_FILLED } from "@/assets/icons";

import { useUserProfileDrawerStore } from "../store";

export function UserWallet() {
    const openDrawer = useUserProfileDrawerStore((state) => state.openDrawer);

    return (
        <section className="my-4">
            <header className="flex flex-col">
                <span className="text-blue100 text-xs">Total Money</span>
                <b className="text-2xl font-medium">${"0.00"}</b>
                <div className=" flex items-center justify-start gap-1">
                    <i className="size-2 rotate-180 text-[#2DC24E]">
                        <ARROW_DOWN_FILLED />
                    </i>
                    <span className="pt-0.5 text-[.5rem] text-black/50">0.00%</span>
                </div>
            </header>
            <main className="mt-5 mb-7.5 flex items-center gap-5">
                <button
                    className="bg-blue100 flex h-8 w-25 items-center justify-center gap-1 rounded-sm text-white"
                    onClick={() => openDrawer({ view: "add" })}
                >
                    <span className="pt-0.5 text-xs">Add money</span>
                    <i className="size-3">
                        <BadgeDollarSign />
                    </i>
                </button>

                <button
                    className="bg-blue100 flex h-8 w-25 items-center justify-center gap-1 rounded-sm text-white"
                    onClick={() => openDrawer({ view: "withdraw" })}
                >
                    <span className="pt-0.5 text-xs">Withdraw</span>
                    <i className="size-3 text-[#FE1313]">
                        <BanknoteArrowDown />
                    </i>
                </button>

                <div
                    className="bg-blue100 flex h-8 w-25 items-center justify-center gap-1 rounded-sm text-white"
                    onClick={() => openDrawer({ view: "earned" })}
                >
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
