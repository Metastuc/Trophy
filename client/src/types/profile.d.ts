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

type tProfileFormFields = "bio" | "email" | "profilePicture" | "username" | "walletAddress" | "xUrl" | "YTUrl";

type tProfileFormValues = Partial<Record<tProfileFormFields, unknown>>;

interface iProfileForm {
    disabledFields?: Partial<Record<tProfileFormFields, boolean>>;
    fields: Array<tProfileFormFields>;
    initialValues: tProfileFormValues;
    isSubmitting?: boolean;
    onSubmit: (values: tProfileFormValues) => void;
}
