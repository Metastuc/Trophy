import { Loader } from "lucide-react";

export function Loading() {
    return (
        <i className="h-6">
            <Loader className="animate-spin" />
        </i>
    );
}
