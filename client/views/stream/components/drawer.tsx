import { Loader, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getTokens } from "@/components/ui/tokens";
import { formatUSD, tokenInputField } from "@/lib/utils";
import { TOKEN_CONFIG } from "#~/store/supported-tokens.ts";

export function CreateStreamDrawer({
    isOpen,
    isSubmitting,
    onClose,
    onSubmit,
    formState,
    setFormState,
}: CreateStreamDrawerProps) {
    const TOKENS = getTokens(["ETH"]);

    function handleAllocationPercentage(value: string) {
        setFormState({
            allocationInPercentage: value.replace("%", ""),
        });
    }

    return (
        <Drawer open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DrawerContent className="">
                <DrawerHeader className="flex">
                    <DrawerTitle className="flex justify-end">
                        <DrawerClose asChild>
                            <Button variant="outline" className="bg-white200 ml-auto size-5 rounded-full p-0">
                                <i className="size-3">
                                    <X />
                                </i>
                            </Button>
                        </DrawerClose>
                    </DrawerTitle>

                    <DrawerDescription className="text-black100 text-xs font-medium">
                        You can choose to acquire up to 5% of your coin supply, before it goes live.
                    </DrawerDescription>
                </DrawerHeader>

                <main className="p-4">
                    <section className="flex flex-col items-center justify-center">
                        <aside className="mt-8.5 mb-2.5 w-full">
                            <span className="text-blue100 pl-5 text-xs">Enter amount</span>

                            <div className="border-blue100 flex h-25 items-center justify-between rounded-xl border-2 p-4">
                                <aside className="flex flex-col items-start justify-center">
                                    <div className="flex items-center justify-center gap-1 text-2xl">
                                        <input
                                            value={formState.allocationInPercentage}
                                            onChange={(event) =>
                                                setFormState({
                                                    allocationInPercentage: tokenInputField(event.target.value),
                                                })
                                            }
                                            style={{
                                                width: `${formState.allocationInPercentage.length || 1}ch`,
                                                color: formState?.allocationInPercentage ? "black" : "gray",
                                            }}
                                            className="max-w-[7.5rem] outline-none"
                                            placeholder="1"
                                        />
                                        <span>%</span>
                                    </div>

                                    <span className="text-base text-[#060606]/50">
                                        ~{formatUSD(formState.approximateAmountInUSD || "0")}
                                    </span>
                                </aside>

                                <aside className="flex flex-col items-center justify-center">
                                    <Select
                                        value={formState?.token}
                                        onValueChange={(value) =>
                                            setFormState({
                                                token: value,
                                                tokenAddress: TOKEN_CONFIG[value as keyof typeof TOKEN_CONFIG].address,
                                            })
                                        }
                                    >
                                        <SelectTrigger className="border-blue100 w-25 rounded-lg p-2">
                                            <SelectValue>
                                                {TOKENS.find((token) => token.value === formState.token)?.title}
                                            </SelectValue>
                                        </SelectTrigger>

                                        <SelectContent>
                                            {TOKENS.map((token, index) => (
                                                <SelectItem key={index} value={token.value}>
                                                    {token.render}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </aside>
                            </div>
                        </aside>

                        <aside className="flex w-full items-center justify-between">
                            <div>stuff</div>

                            <section>
                                <span>% of supply you wish to acquire</span>

                                <div className="flex items-center justify-center gap-4">
                                    {["2%", "3%", "4%", "5%"].map((value, index) => (
                                        <button
                                            key={index}
                                            onClick={() => handleAllocationPercentage(value)}
                                            className="border-blue100 rounded-xs border px-4 py-1 text-sm font-light"
                                        >
                                            {value}
                                        </button>
                                    ))}
                                </div>
                            </section>
                        </aside>
                    </section>
                </main>

                <DrawerFooter>
                    <Button disabled={isSubmitting} onClick={onSubmit} className="bg-blue100">
                        {isSubmitting ? <Loader className="size-5 animate-spin" /> : "Continue"}
                    </Button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}
