import { Loader, X } from "lucide-react";
import { ChangeEvent, useEffect, useRef } from "react";
import { formatEther } from "viem";

import { useTokenPrice } from "@/api/get-prices";
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
import { getEthereumRequiredForCreatorTokenAllocation } from "@/lib/flaunch";
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
    const { data: tokenPrices } = useTokenPrice(TOKEN_CONFIG["ETH"].address);

    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const abortRef = useRef<AbortController | null>(null);
    const lastValueRef = useRef<string>("");

    function handleAllocationPercentage(value: string) {
        setFormState({
            allocationInPercentage: value.replace("%", ""),
        });
    }

    function handleAllocationInputChange(event: ChangeEvent<HTMLInputElement>) {
        const numeric = tokenInputField(event.target.value);
        setFormState({
            allocationInPercentage: `${parseFloat(numeric) > 5 ? 5 : numeric}`,
        });
    }

    useEffect(
        function () {
            const percentage = formState.allocationInPercentage;

            if (!percentage || percentage === lastValueRef.current) return;
            lastValueRef.current = percentage;

            if (debounceRef.current) clearTimeout(debounceRef.current);

            debounceRef.current = setTimeout(async function () {
                try {
                    if (abortRef.current) abortRef.current.abort();
                    const controller = new AbortController();
                    abortRef.current = controller;

                    const { ethereumAmountRequired, tokensCreatorWillReceieve } =
                        await getEthereumRequiredForCreatorTokenAllocation(percentage);

                    if (!controller.signal.aborted) {
                        const ether = formatEther(ethereumAmountRequired);
                        const usdPrice = tokenPrices?.usdPrice || 0;
                        const approximateAmountInUSD = (parseFloat(ether) * usdPrice).toString();

                        setFormState({ approximateAmountInUSD, ethereumAmountRequired, tokensCreatorWillReceieve });
                    }
                } catch (error) {
                    if ((error as Error).name !== "AbortError") {
                        console.error("Preview fetch failed", error);
                    }
                }
            }, 750);

            return function () {
                if (debounceRef.current) clearTimeout(debounceRef.current);
                if (abortRef.current) abortRef.current.abort();
            };
        },
        [formState.allocationInPercentage, tokenPrices?.usdPrice, setFormState],
    );

    return (
        <Drawer open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DrawerContent>
                <DrawerHeader className="flex">
                    <DrawerTitle className="flex justify-end">
                        <DrawerClose asChild>
                            <Button variant="outline" className="bg-white200 my-2 ml-auto size-5 rounded-full p-0">
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
                        <aside className="mb-2.5 w-full">
                            <span className="text-blue100 pl-5 text-xs">Enter amount</span>

                            <div className="border-blue100 flex h-25 items-center justify-between rounded-xl border-2 p-4">
                                <aside className="flex flex-col items-start justify-center">
                                    <div className="flex items-center justify-center gap-1 text-2xl">
                                        <input
                                            value={formState.allocationInPercentage}
                                            onChange={handleAllocationInputChange}
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
