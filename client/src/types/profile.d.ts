type tUserTokenBalance = {
    symbol: tToken;
    balance: string;
    usdValue: number;
    priceChange24h: string;
};

type tGetUserRequest = {
    username: string;
};

type tGetUserResponse = {
    message: string;

    user: {
        privyId: string;
        username: string;
        email: string;
        userPfp: string;
        walletAddress: string;
        totalStreams: number;
        bio: string;
        totalFees: number;
        xUrl?: string;
        YTUrl?: string;
        followers: string[];
        following: string[];
        creatorToken?: string;
        videoTokenAddresses: string[];
    };

    streams: {
        roomId: string;
        title: string;
        date?: string;
        status: "Live" | "Scheduled";
        streamer: string;
    }[];
};

type tProfileFormFields = "bio" | "email" | "profilePicture" | "username" | "xUrl" | "YTUrl";

type tProfileFormValues = Partial<Record<tProfileFormFields, unknown>>;

interface iProfileForm<T extends readonly Array<tProfileFormFields>> {
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
