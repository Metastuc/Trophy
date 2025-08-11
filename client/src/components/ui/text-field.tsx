import { ComponentProps, ComponentPropsWithRef, Ref } from "react";

import { cn } from "@/lib/utils";

type TextInputProps =
    | ComponentPropsWithRef<"input">
    | (Omit<ComponentPropsWithRef<"textarea">, "ref"> & {
          ref?: Ref<HTMLTextAreaElement>;
      });

export function TextInput(props: TextInputProps) {
    if ("type" in props && props.type === "textarea") {
        const { ref, ...rest } = props as ComponentPropsWithRef<"textarea">;
        return <textarea ref={ref} {...rest} />;
    } else {
        const { ref, ...rest } = props as ComponentPropsWithRef<"input">;
        return <input ref={ref} {...rest} />;
    }
}

export function FormLabel({ className, ...props }: ComponentProps<"label">) {
    return (
        <label
            className={cn(
                "text-blue100 text-sm leading-none font-normal peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
                className,
            )}
            {...props}
        />
    );
}
