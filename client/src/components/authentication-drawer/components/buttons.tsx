import { Button } from "@/components/ui/button";

import React from "react";

import { AUTHENTICATION_BUTTONS } from "../constants";

interface iProps {
    dispatch: React.ActionDispatch<[action: tAuthAction]>;
}

export default function Component({ dispatch }: iProps) {
    return (
        <React.Fragment>
            {AUTHENTICATION_BUTTONS.map((props: iAuthenticationButton, index) => (
                <Button
                    className="border-blue-100 border h-15 flex justify-start items-center"
                    key={index}
                    onClick={() => dispatch(props.action)}
                    variant="outline"
                >
                    <i className="size-7">{props.icon()}</i>
                    <span className="text-sm tracking-wide text-black100">{props.label}</span>
                </Button>
            ))}
        </React.Fragment>
    );
}
