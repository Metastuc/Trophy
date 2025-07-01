type tStreamAction = "now" | "schedule";

interface iFormState {
    date: string;
    username: string;
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
