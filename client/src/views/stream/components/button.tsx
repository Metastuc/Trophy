import { cn } from "@/lib/utils";

interface iTabButton {
    handleClick: () => void;
    icon: React.ReactNode;
    isActive: boolean;
    ref: React.RefCallback<HTMLLIElement>;
    text: string;
}

export function TabButton({ handleClick, icon, isActive, ref, text }: iTabButton) {
    return (
        <li
            onClick={handleClick}
            className={cn(
                "z-10 flex items-center justify-between gap-1 py-1.5 px-4 text-sm transition-colors duration-150 ease-in-out",
                isActive ? "text-black100" : "text-white",
            )}
            ref={ref}
        >
            <i className="size-4">{icon}</i>
            <span className="pt-1 leading-none">{text}</span>
        </li>
    );
}
