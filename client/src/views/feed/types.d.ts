type tGetFeedResponse = {
    dummyData: {
        live: Array<iStream>;
    };

    streams: {
        live: Array<iStream>;
        recorded: Array<iRecorded>;
    };
};

interface iStream {
    pfp: string;
    roomId: string;
    date: string;
    title: string;
    viewers: number;
    status: "Live" | "Scheduled" | "Ended";
    streamer: string;
    thumbnail?: string | null | undefined;
    creatorToken?: string | undefined;
}

interface iRecorded {
    id: string;
    recordingUrl: string;
    recordingSize: number;
}

interface iFeedContext {
    isPending: boolean;
}

interface iStreamArticle {
    date?: string;
    roomId: string;
    status: "Live" | "Scheduled";
    streamer: string;
    title: string;
}
