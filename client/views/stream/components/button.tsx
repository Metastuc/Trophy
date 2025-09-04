import { cn } from "@/lib/utils";

export function TabButton({ handleClick, icon, isActive, ref, text }: TabButtonProps) {
    return (
        <li
            onClick={handleClick}
            className={cn(
                "z-10 flex items-center justify-between gap-1 px-4 py-1.5 text-sm transition-colors duration-150 ease-in-out",
                isActive ? "text-black100" : "text-white",
            )}
            ref={ref}
        >
            <i className="size-4">{icon}</i>
            <span className="pt-1 leading-none">{text}</span>
        </li>
    );
}
