type tStreamAction = "now" | "schedule";

interface iFormState {
    date: string;
    username: string;
    walletAddress: string;
    creatorToken?: string;
    creatorTokenEnabled?: boolean;
}

type tCreateStreamFormRequest = {
    date: string;
    title: string;
    username: string;
};

type tCreateStreamFormResponse = {
    message: string;
    roomId: string;
    token: string;
};

interface iDateTimePickerState {
    isOpen: boolean;
    date?: Date;
    time: string;
}
