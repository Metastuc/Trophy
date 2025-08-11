import { Loader } from "lucide-react";
import { ChangeEvent, FormEvent, Fragment, JSX, useRef, useState } from "react";

import { cn } from "@/lib/utils";

import { Button } from "./ui/button";
import { FormLabel, TextInput } from "./ui/text-field";

export function ProfileForm<T extends Array<tProfileFormFields>>({
    fields,
    initialValues,
    onSubmit,
    disabledFields,
    isSubmitting,
}: iProfileForm<T>) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [formValues, setFormValues] = useState<tProfileFormValues>(initialValues);
    const [profileImagePreview, setProfileImagePreview] = useState<string | null>(
        typeof initialValues.profilePicture === "string" ? initialValues.profilePicture : null,
    );

    function handleChange({ field, value }: { field: tProfileFormFields; value: unknown }) {
        setFormValues((state) => ({
            ...state,
            [field]: value,
        }));
    }

    function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0];
        if (!file) return;

        setProfileImagePreview(URL.createObjectURL(file));
        handleChange({ field: "profilePicture", value: file });
    }

    function handleSubmit(event: FormEvent) {
        event.preventDefault();
        onSubmit(formValues);
    }

    const renderField: Record<tProfileFormFields, () => JSX.Element> = {
        bio() {
            return (
                <div>
                    <FormLabel>Edit your Bio</FormLabel>

                    <TextInput
                        className="border-blue100/40 h-15 w-full resize-none rounded-xs border p-2.5 text-sm font-normal text-[#000000B2] lowercase"
                        name="bio"
                        placeholder="enter bio (say something about yourself, this is optional)"
                        type="textarea"
                        value={(formValues.bio as string) || ""}
                        onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
                            handleChange({ field: "bio", value: event.target.value })
                        }
                        disabled={disabledFields?.bio}
                    />
                </div>
            );
        },

        email() {
            return <></>;
        },

        profilePicture() {
            return <></>;
        },

        username() {
            return <></>;
        },

        walletAddress() {
            return <></>;
        },

        xUrl() {
            return <></>;
        },

        YTUrl() {
            return <></>;
        },
    };

    return (
        <form onSubmit={handleSubmit}>
            <fieldset>
                {fields.map((field) => field && <Fragment key={field}>{renderField[field]()}</Fragment>)}

                <Button
                    type="submit"
                    disabled={isSubmitting}
                    className={cn("bg-blue100 h-12 w-full rounded transition-colors", isSubmitting && "opacity-50")}
                >
                    {isSubmitting ? (
                        <i>
                            <Loader className="size-5 animate-spin" />
                        </i>
                    ) : (
                        <span className="font-extralight tracking-[.0625rem]">Save</span>
                    )}
                </Button>
            </fieldset>
        </form>
    );
}
