type tGetFeedResponse = {
    streams: {
        live: Array<iStream>;
        recorded: Array<iRecorded>;
    };
};

interface iStream {
    title: string;
    date: string;
    roomId: string;
    status: "Live" | "Scheduled" | "Ended";
    streamer: string;
    thumbnail?: string | null | undefined;
}

interface iRecorded {
    id: string;
    recordingUrl: string;
    recordingSize: number;
}
