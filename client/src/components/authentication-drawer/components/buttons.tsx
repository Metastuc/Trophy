import React from "react";

import { Button } from "@/components/ui/button";

import { AUTHENTICATION_BUTTONS } from "../constants";

interface iProps {
    dispatch: React.ActionDispatch<[action: tAuthAction]>;
}

export default function Component({ dispatch }: iProps) {
    return (
        <React.Fragment>
            {AUTHENTICATION_BUTTONS.map((props: iAuthenticationButton, index) => (
                <Button
                    className="flex h-15 items-center justify-start border border-blue-100"
                    key={index}
                    onClick={() => dispatch(props.action)}
                    variant="outline"
                >
                    <i className="size-7">{props.icon()}</i>
                    <span className="text-black100 text-sm tracking-wide">{props.label}</span>
                </Button>
            ))}
        </React.Fragment>
    );
}
