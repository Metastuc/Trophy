import { cn } from "@/lib/utils";

interface iTabButton {
    handleClick: () => void;
    isActive: boolean;
    text: string;
}

export function TabButton({ handleClick, isActive, text }: iTabButton) {
    return (
        <li onClick={handleClick} className={cn("py-1.5", isActive && "px-6.5")}>
            <span>{text}</span>
        </li>
    );
}
