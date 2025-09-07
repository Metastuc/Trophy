type ProfileFormFields = "bio" | "email" | "profilePicture" | "username" | "xUrl" | "YTUrl";

type ProfileFormValues = Partial<Record<ProfileFormFields, unknown>>;

interface ProfileFormProps<T extends readonly Array<ProfileFormFields>> {
    disabledFields?: Partial<Record<tProfileFormFields, boolean>>;
    fields: NoDuplicates<T>;
    initialValues: tProfileFormValues;
    isSubmitting?: boolean;
    onSubmit: (values: tProfileFormValues) => void;
}

type NoDuplicates<T extends readonly unknown[], Seen extends readonly unknown[] = []> = T extends [
    infer Head,
    ...infer Tail,
]
    ? Head extends Seen[number]
        ? ["Duplicate field:", Head]
        : [Head, ...NoDuplicates<Tail, [...Seen, Head]>]
    : T;
