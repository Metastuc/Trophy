import { ARROW_DOWN_FILLED } from "@/assets/icons";
import { useTabSwitcher } from "@/hooks/tab-switch";
import { cn } from "@/lib/utils";

import { useUserProfileDrawerStore } from "../store";
import { TabHeader } from "./tab";

export function Add() {
    const addViewCurentTab = useUserProfileDrawerStore((state) => state.addViewCurentTab);
    const { activeTab, handleTabClick, tabIsActive } = useTabSwitcher<AddDrawerTab>(addViewCurentTab as AddDrawerTab);

    return (
        <section className="">
            <div className="flex flex-col p-4">
                <span className="text-blue100 text-xs">Total Money</span>
                <b className="text-2xl font-medium">${"0.00"}</b>
                <div className=" flex items-center justify-start gap-1">
                    <i className="size-2 rotate-180 text-[#2DC24E]">
                        <ARROW_DOWN_FILLED />
                    </i>
                    <span className="pt-0.5 text-[.5rem] text-black/50">0.00%</span>
                </div>
            </div>

            <TabHeader
                tabs={[
                    { id: "receive", label: "Receive" },
                    { id: "send", label: "Send" },
                ]}
                activeTab={activeTab}
                onTabClick={handleTabClick}
                styles={{
                    wrapper: "static border-b w-full",
                    list_wrapper: "mx-auto",
                    list_item: (id) =>
                        cn(
                            "w-full flex items-center justify-center border-b",
                            tabIsActive(id) ? "border-b-blue100" : "border-b-gray-300",
                        ),
                    list_button: "w-full",
                    indicator: "bottom-[0.25px] h-[.0625rem] hidden",
                }}
            />
        </section>
    );
}
