import { CircleDollarSign, Dot } from "lucide-react";

import { TOKEN_CONFIG } from "#~/store/supported-tokens.ts";

export function TipNotification({ read, tip }: TipNotificationProps) {
    if (!tip) return;
    const { tipper, amount, token } = tip;
    const tokenMeta = TOKEN_CONFIG[token as keyof typeof TOKEN_CONFIG];

    return (
        <li className="flex items-center justify-start gap-5">
            <i className="text-blue100 size-5">
                <CircleDollarSign />
            </i>

            <aside className="flex items-center justify-center gap-2.5">
                <div className="relative">
                    <img src={tokenMeta.icon} className="size-10" alt={`${tokenMeta.symbol}-logo`} />
                    <img src="/base.svg" className="absolute -right-0.5 -bottom-0.5 size-4" alt="base-logo" />
                </div>

                <div>
                    <aside>
                        <span className="text-blue100 text-xs font-light">Tip received</span>
                    </aside>

                    <aside className="flex">
                        <span className="font-light">from</span>

                        <div className="flex items-center">
                            <b className="ml-1 font-normal">@{tipper.username as string}</b>
                            {!read ? (
                                <i className="text-blue100 ml-2 size-1">
                                    <Dot className="scale-[10]" />
                                </i>
                            ) : null}
                        </div>
                    </aside>
                </div>
            </aside>

            <span className="ml-auto text-[#2DC24E]">
                +{amount} {token}
            </span>
        </li>
    );
}
