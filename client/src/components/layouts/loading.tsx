import { Loader } from "lucide-react";

export function LoadingScreen() {
    return (
        <section className="flex h-dvh w-screen items-center justify-center">
            <Loader className="animate-spin" />
        </section>
    );
}
