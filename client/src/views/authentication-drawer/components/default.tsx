import { Button } from "@/components/ui/button";

import { AUTHENTICATION_BUTTONS } from "../constants";

export function AuthenticationDefaultScreen() {
    return AUTHENTICATION_BUTTONS().map((props: iAuthenticateWithButton, index: number) => (
        <Button
            className="flex h-15 items-center justify-start border border-blue-100"
            key={index}
            onClick={props.handler}
            variant="outline"
        >
            <i className="size-7">{props.icon()}</i>
            <span className="text-black100 text-sm tracking-wide">{props.label}</span>
        </Button>
    ));
}
