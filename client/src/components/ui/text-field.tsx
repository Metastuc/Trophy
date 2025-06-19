type TextInputProps =
    | React.ComponentPropsWithRef<"input">
    | (Omit<React.ComponentPropsWithRef<"textarea">, "ref"> & {
          ref?: React.Ref<HTMLTextAreaElement>;
      });

export function TextInput(props: TextInputProps) {
    if ("type" in props && props.type === "textarea") {
        const { ref, ...rest } = props as React.ComponentPropsWithRef<"textarea">;
        return <textarea ref={ref} {...rest} />;
    } else {
        const { ref, ...rest } = props as React.ComponentPropsWithRef<"input">;
        return <input ref={ref} {...rest} />;
    }
}
