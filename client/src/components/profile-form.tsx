import { Loader, PencilLine } from "lucide-react";
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

    const isNewUser = !initialValues.profilePicture && !initialValues.username && !initialValues.email;

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
                    <FormLabel htmlFor="bio">Edit your Bio</FormLabel>

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
            return (
                <div>
                    <FormLabel htmlFor="email">Change your Email</FormLabel>

                    <TextInput
                        className={cn(
                            "border-blue100/40 h-11 w-full rounded-xs border p-2.5 text-sm font-normal text-[#000000B2] lowercase",
                            disabledFields?.email && "opacity-50",
                        )}
                        name="email"
                        placeholder="enter email"
                        type="email"
                        value={(formValues.email as string) || ""}
                        onChange={(event: ChangeEvent<HTMLInputElement>) =>
                            handleChange({ field: "email", value: event.target.value })
                        }
                        disabled={disabledFields?.email}
                    />
                </div>
            );
        },

        profilePicture() {
            return (
                <div className="flex items-center justify-start gap-2">
                    <aside
                        onClick={() => fileInputRef.current?.click()}
                        className="bg-blue100 relative flex size-11 cursor-pointer items-center justify-center rounded-full p-0.25"
                    >
                        <img
                            src={
                                profileImagePreview ||
                                (typeof formValues.profilePicture === "string"
                                    ? formValues.profilePicture
                                    : "default-pfp.svg")
                            }
                            alt="profile-image"
                            className="size-full rounded-full object-cover"
                        />

                        <div className="absolute right-0 bottom-0 flex size-4.5 items-center justify-center rounded-full bg-white shadow">
                            <i className="size-2.5">
                                <PencilLine className="flex" />
                            </i>
                        </div>
                    </aside>

                    <span className="text-black200 text-xs font-light">
                        (c’mon {isNewUser ? "add a" : "update your"} <b className="font-normal">profile picture</b> fam)
                    </span>

                    <input
                        accept="image/*"
                        hidden
                        name="profileImage"
                        onChange={handleFileChange}
                        ref={fileInputRef}
                        type="file"
                    />
                </div>
            );
        },

        username() {
            return (
                <div>
                    <FormLabel>Change your Email</FormLabel>

                    <TextInput
                        className={cn(
                            "border-blue100/40 h-11 w-full rounded-xs border p-2.5 text-sm font-normal text-[#000000B2] lowercase",
                            disabledFields?.username && "opacity-50",
                        )}
                        name="username"
                        placeholder="enter username"
                        type="text"
                        value={(formValues.username as string) || ""}
                        onChange={(event: ChangeEvent<HTMLInputElement>) =>
                            handleChange({ field: "username", value: event.target.value })
                        }
                        disabled={disabledFields?.username}
                    />
                </div>
            );
        },

        xUrl() {
            return (
                <div>
                    <FormLabel>X RMTP URL (optional)</FormLabel>

                    <TextInput
                        className={cn(
                            "border-blue100/40 h-11 w-full rounded-xs border p-2.5 text-sm font-normal text-[#000000B2] lowercase",
                            disabledFields?.xUrl && "opacity-50",
                        )}
                        name="xUrl"
                        placeholder="enter X RMTP URL"
                        type="text"
                        value={(formValues.xUrl as string) || ""}
                        onChange={(event: ChangeEvent<HTMLInputElement>) =>
                            handleChange({ field: "xUrl", value: event.target.value })
                        }
                        disabled={disabledFields?.xUrl}
                    />
                </div>
            );
        },

        YTUrl() {
            return (
                <div>
                    <FormLabel>YouTube RMTP Url (optional)</FormLabel>

                    <TextInput
                        className={cn(
                            "border-blue100/40 h-11 w-full rounded-xs border p-2.5 text-sm font-normal text-[#000000B2] lowercase",
                            disabledFields?.YTUrl && "opacity-50",
                        )}
                        name="YTUrl"
                        placeholder="enter YT RMTP URL"
                        type="text"
                        value={(formValues.YTUrl as string) || ""}
                        onChange={(event: ChangeEvent<HTMLInputElement>) =>
                            handleChange({ field: "YTUrl", value: event.target.value })
                        }
                        disabled={disabledFields?.YTUrl}
                    />
                </div>
            );
        },
    };

    return (
        <form onSubmit={handleSubmit}>
            <fieldset className="space-y-5" disabled={isSubmitting}>
                <section className="space-y-3">
                    {fields.map((field) => field && <Fragment key={field}>{renderField[field]()}</Fragment>)}
                </section>

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
