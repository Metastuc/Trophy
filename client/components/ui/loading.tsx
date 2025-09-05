import { Loader } from "lucide-react";

export function Loading() {
    return (
        <span className="flex items-center justify-center">
            <i className="size-6">
                <Loader className="animate-spin" />
            </i>
        </span>
    );
}
