type tStreamAction = "now" | "schedule";

interface iFormState {
    creatorToken: string;
    creatorTokenEnabled: boolean;
    date: string;
    username: string;
    walletAddress: string;
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
