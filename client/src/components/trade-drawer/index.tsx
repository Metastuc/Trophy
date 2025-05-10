import { Button } from "../ui/button";

export default function Component() {
    return (
        <div>
            <Button variant="default" className="bg-green100 h-6 w-15 rounded-[.125rem]">
                <span className="text-green200 capitalize">trade</span>
            </Button>
        </div>
    );
}
